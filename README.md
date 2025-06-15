# Paragoniks

Web app for easy shopping list sharing and splitting between your friends!

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [OpenAI API key](https://platform.openai.com)

### Installing and Running

1. Clone the repo

   ```sh
   git clone https://github.com/zlskey/paragoniks.git
   ```

1. Move into the project directory

   ```sh
   cd paragoniks
   ```

1. Copy the `.env.example` file to `.env` and change the values to your own

   ```sh
   cp .env.example .env
   cp ./app/.env.example ./app/.env
   cp ./api/.env.example ./api/.env
   ```

1. Run backend

   ```sh
   docker compose up -d
   ```

1. Run frontend

   ```sh
   # go to app directory
   cd app

   # install deps
   pnpm i

   # for browser (app will be available at http://localhost:8081)
   pnpm web
   
   # for android emulator
   pnpm android
   
   # for ios emulator
   pnpm ios
   ```

