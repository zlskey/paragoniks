import { defineConfig, loadEnv } from 'vite'

import { lingui } from '@lingui/vite-plugin'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const VITE_PORT = env.VITE_PORT

  return {
    server: {
      port: parseInt(VITE_PORT, 10) || 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react({
        plugins: [['@lingui/swc-plugin', {}]],
      }),
      lingui(),
    ],
    resolve: {
      alias: {
        src: '/src',
      },
    },
  }
})
