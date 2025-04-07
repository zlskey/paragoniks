FROM node:20.10.0-bullseye-slim AS prepare

# Install gosu and node-sass dependencies
# OpenSSH server has to be started by root user
# gosu is used for switching to non-root user inside entrypoint
RUN apt-get update \
    && apt-get install -y --no-install-recommends gosu \
    && rm -rf /var/lib/apt/lists/*

# Set non-root user name and group name
ARG USER_NAME=node
ARG USER_ID=1000
ARG GROUP_NAME=node
ARG GROUP_ID=1000

# Use ENV for user name as it's value needs to be available in entrypoint
ENV USER_NAME=${USER_NAME}

# Using groupadd and useradd is recommended in Docker best practices:
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
# Install command creates home directory as useradd doesn't do that automatically
RUN if [ "${GROUP_ID}" != "1000" ] ; then groupadd --system --gid "${GROUP_ID}" "${GROUP_NAME}" ; fi \
    && if [ "${USER_ID}" != "1000" ] ; then useradd --system --no-log-init --gid "${GROUP_ID}" --uid "${USER_ID}" "${USER_NAME}" ; fi \
    && if [ "${USER_NAME}" != "node" ] ; then install -d -m 0755 -g "${GROUP_ID}" -o "${USER_ID}" /home/"${USER_NAME}" ; fi

# App directory
ARG APP_DIR=/usr/src/app

# Create and set working directory
WORKDIR "${APP_DIR}"

# Set ownership and permissions on app directory
RUN chown -R "${USER_NAME}":"${USER_NAME}" "${APP_DIR}" && chmod 755 "${APP_DIR}"

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


# ------------   Builder   ------------


FROM prepare AS builder

# Copy source code
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build application
RUN npx expo export --platform web


# ------------   Production   ------------

# Prepare the web server to use Nginx
FROM nginx:alpine AS production

# Copy built files from `dist` to the Nginx HTML location
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]