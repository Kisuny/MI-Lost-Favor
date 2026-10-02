#!/usr/bin/env bash
# Installs NeoForge on first run, then starts the server. Requires Java 21+.
set -e
cd "$(dirname "$0")"

NEOFORGE_VERSION="21.1.249"

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

exec java @user_jvm_args.txt @"$ARGS_FILE" nogui "$@"
