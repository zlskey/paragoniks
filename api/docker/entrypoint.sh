#!/bin/sh

# Install node modules as non-root user
su-exec "$USER_NAME" echo "Running command: \`pnpm i\` as $USER_NAME"
su-exec "$USER_NAME" pnpm i --config.confirmModulesPurge=false

# Run docker compose command as non-root user
su-exec "$USER_NAME" echo "Running command: $* as $USER_NAME"
exec su-exec "$USER_NAME" "$@"
