import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const VITE_PORT = env.VITE_PORT
  const VITE_APP_HOST = env.VITE_APP_HOST

  return {
    server: {
      port: parseInt(VITE_PORT, 10) || 3000,
      host: VITE_APP_HOST || '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        src: '/src',
      },
    },
  }
})
