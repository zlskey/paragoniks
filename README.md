# Roommate-shopper

Web app for easy shopping list sharing and splitting between roommates.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [OpenAI API key](https://platform.openai.com)

### Installing and Running

1. Clone the repo

   ```sh
   git clone https://github.com/zlskey/roommate-shopper.git
   ```

1. Move into the project directory

   ```sh
   cd roommate-shopper
   ```

1. Copy the `.env.example` file to `.env` and change the values to your own

   ```sh
   cp .env.example .env
   cp ./app/.env.example ./app/.env
   cp ./api/.env.example ./api/.env
   ```

1. Run app

   For production development, you will require [Traefik](https://traefik.io/)

   ```sh
   # Add BUILD=true to build the app
   # Add FOLLOW=true to follow the logs
   make start-production
   ```

   App will be available at [your-domain.com](#)

   For local development, you can run the app with

   ```sh
   # Add BUILD=true to build the app
   # Add FOLLOW=true to follow the logs
   make start-development
   ```

   App will be available at [localhost:5000](http://localhost:5000)
