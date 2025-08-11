#!/bin/sh

# Install node modules as non-root user
gosu "$USER_NAME" echo "Running command: \`pnpm i\` as $USER_NAME"
gosu "$USER_NAME" pnpm i --config.confirmModulesPurge=false

# Run docker compose command as non-root user
gosu "$USER_NAME" echo "Running command: $* as $USER_NAME"
exec gosu "$USER_NAME" "$@"
