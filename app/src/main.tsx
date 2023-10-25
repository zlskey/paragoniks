import { createRoot } from 'react-dom/client'

import App from 'src/app'

const rootElement = document.getElementById('root')

if (rootElement instanceof HTMLElement) {
  createRoot(rootElement).render(<App />)
}
