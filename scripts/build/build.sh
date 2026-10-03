#!/usr/bin/env bash
set -e
if command -v python3 >/dev/null 2>&1; then
    PYTHON=python3
elif command -v python >/dev/null 2>&1; then
    PYTHON=python
else
    echo "Python was not found. Install Python 3 and try again." >&2
    exit 1
fi
exec "$PYTHON" "$(dirname "$0")/build.py" "$@"
