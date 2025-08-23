# Paragoniks 🛒

> **Web app for easy shopping list sharing and splitting between your friends!**

A modern, collaborative shopping list application that makes it simple to create, share, and manage shopping lists with friends and family. Split expenses, track purchases, and never forget what you need to buy again!

## ✨ Features

- 💰 **Split Expenses**: Automatically calculate and split costs between participants
- 🔄 **Real-time Sync**: Updates in real-time across all devices
- 📱 **Cross-platform**: Web app, Android, and iOS support
- 👥 **Collaborative**: Multiple users can edit lists simultaneously

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v20.19.0)
- [Docker](https://www.docker.com/) (v20 or higher)
- [Docker Compose](https://docs.docker.com/compose/) (v2 or higher)
- [OpenAI API key](https://platform.openai.com) (for AI features)
- [pnpm](https://pnpm.io/) (recommended package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zlskey/paragoniks.git
   cd paragoniks
   ```

2. **Set up environment variables**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp ./app/.env.example ./app/.env
   cp ./api/.env.example ./api/.env
   
   # Edit the files with your configuration
   # Don't forget to add your OpenAI API key!
   ```

3. **Start backend services**
   ```bash
   # Start database, backend, and other services
   docker compose up -d
   
   # Verify services are running
   docker compose ps
   ```

4. **Run the frontend application**

   **Web App (Recommended for development):**
   ```bash
   cd app
   pnpm install
   pnpm web
   ```
   The web app will be available at [http://localhost:8081](http://localhost:8081)

   **Mobile Development:**
   ```bash
   # For Android emulator
   pnpm android
   
   # For iOS emulator (macOS only)
   pnpm ios
   ```

## 🛠️ Tech Stack

- **Frontend**: React Native (with web support)
- **Backend**: Node.js/Express
- **Database**: MongoDB
- **AI Integration**: OpenAI API
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm

## 🔧 Development

### Available Scripts

```bash
# Install dependencies
pnpm install

# Start development server
pnpm web          # Web development
pnpm android      # Android development
pnpm ios          # iOS development

# Lint & Typecheck
pnpm lint
pnpm typecheck
```

### Environment Variables

Key environment variables you'll need to configure:

- `OPENAI_API_KEY`: Your OpenAI API key for AI features
- `JWT_SECRET`: Secret for JWT token generation
- `PORT`: Server port (default: 3000)

## 🐛 Troubleshooting

### Common Issues

**Docker services won't start:**
```bash
# Check if ports are already in use
docker compose down
docker compose up -d
```

**Frontend won't connect to backend:**
- Verify Docker services are running: `docker compose ps`
- Check environment variables in `.env` files
- Ensure backend is accessible at the configured URL

**Mobile build issues:**
- Make sure you have the latest React Native CLI
- Clear Metro cache: `pnpm start --reset-cache`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
