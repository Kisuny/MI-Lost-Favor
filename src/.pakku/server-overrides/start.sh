#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

NEOFORGE_VERSION="21.1.249"

MAX_CRASHES="${MAX_CRASHES:-5}"
CRASH_WINDOW="${CRASH_WINDOW:-600}"
RESTART_DELAY="${RESTART_DELAY:-10}"
MIN_UPTIME="${MIN_UPTIME:-60}"

if ! command -v java >/dev/null 2>&1; then
    echo "Java was not found. Install Java 21 or newer." >&2
    exit 1
fi

JAVA_MAJOR=$(java -version 2>&1 | head -n 1 | sed -E 's/.*version "([0-9]+).*/\1/')
if [ "$JAVA_MAJOR" -lt 21 ]; then
    echo "Java $JAVA_MAJOR found, but Java 21 or newer is required." >&2
    exit 1
fi

ARGS_FILE="libraries/net/neoforged/neoforge/${NEOFORGE_VERSION}/unix_args.txt"

if [ ! -f "$ARGS_FILE" ]; then
    echo "Installing NeoForge ${NEOFORGE_VERSION}..."
    INSTALLER="neoforge-${NEOFORGE_VERSION}-installer.jar"
    curl -fL -o "$INSTALLER" "https://maven.neoforged.net/releases/net/neoforged/neoforge/${NEOFORGE_VERSION}/${INSTALLER}"
    java -jar "$INSTALLER" --installServer
    rm -f "$INSTALLER" "${INSTALLER}.log"
fi

STOP=0
CHILD=""
trap 'STOP=1; [ -n "$CHILD" ] && kill -TERM "$CHILD" 2>/dev/null' INT TERM

CRASHES=0
while true; do
    STARTED=$(date +%s)

    java @user_jvm_args.txt @"$ARGS_FILE" nogui "$@" <&0 &
    CHILD=$!
    CODE=0
    wait "$CHILD" || CODE=$?
    if [ "$STOP" -eq 1 ]; then
        wait "$CHILD" 2>/dev/null || true
        echo "Server stopped."
        exit 0
    fi
    CHILD=""

    UPTIME=$(( $(date +%s) - STARTED ))

    if [ "$CODE" -eq 0 ] && [ "$UPTIME" -ge "$MIN_UPTIME" ]; then
        CRASHES=0
        echo "Server stopped after ${UPTIME}s."
    else
        if [ "$UPTIME" -gt "$CRASH_WINDOW" ]; then
            CRASHES=0
        fi
        CRASHES=$(( CRASHES + 1 ))
        echo "Server exited with code ${CODE} after ${UPTIME}s (failure ${CRASHES} of ${MAX_CRASHES})." >&2

        if [ "$CRASHES" -ge "$MAX_CRASHES" ]; then
            echo "Too many failures in a row, not restarting. Check the logs and crash-reports folders." >&2
            exit 1
        fi
    fi

    echo "Restarting in ${RESTART_DELAY} seconds. Press Ctrl+C to cancel."
    sleep "$RESTART_DELAY" &
    CHILD=$!
    wait "$CHILD" || true
    if [ "$STOP" -eq 1 ]; then
        echo "Restart cancelled."
        exit 0
    fi
    CHILD=""
done
