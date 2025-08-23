#!/bin/sh

# Install node modules as non-root user
su-exec "$USER_NAME" echo "Running command: \`pnpm i\` as $USER_NAME"
su-exec "$USER_NAME" pnpm i --config.confirmModulesPurge=false

# Ensure shared package is properly linked
if [ -d "./shared" ]; then
  su-exec "$USER_NAME" echo "Shared package found, ensuring proper linking..."
  su-exec "$USER_NAME" cd shared && pnpm install --config.confirmModulesPurge=false
  su-exec "$USER_NAME" cd ..
fi

# Run docker compose command as non-root user
su-exec "$USER_NAME" echo "Running command: $* as $USER_NAME"
exec su-exec "$USER_NAME" "$@"
