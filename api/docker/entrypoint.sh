#!/bin/sh

# Build shared
su-exec "$USER_NAME" echo "Running command: \`pnpm build:shared\` as $USER_NAME"
su-exec "$USER_NAME" pnpm build:shared

# Install node modules as non-root user
su-exec "$USER_NAME" echo "Running command: \`pnpm i\` as $USER_NAME"
su-exec "$USER_NAME" pnpm i --config.confirmModulesPurge=false

# Run docker compose command as non-root user
su-exec "$USER_NAME" echo "Running command: $* as $USER_NAME"
exec su-exec "$USER_NAME" "$@"
