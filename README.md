# playlistify

Web app for creating the best playlists

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Spotify Developer Account](https://developer.spotify.com/dashboard/login)

### Installing and Running

1. Clone the repo

   ```sh
   git clone https://github.com/zlskey/playlistify.git
   ```

1. Move into the project directory

   ```sh
   cd playlistify
   ```

1. Copy the `.env.example` file to `.env` and change the values to your own

   ```sh
   cp .env.example .env
   cp ./app/.env.example ./app/.env
   ```

1. Run docker-compose

   ```sh
   docker-compose up --build -d
   ```

App is initialy configured for traefik reverse proxy. If you don't want to use traefik, you can remove the `traefik` labels from the `app` service.

Your app should now be running on [playlistify.local](https://playlistify.local)
