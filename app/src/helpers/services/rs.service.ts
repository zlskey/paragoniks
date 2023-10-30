import axios from 'axios'

const rsApiUrl = import.meta.env.VITE_RS_API_URL

const rsApi = axios.create({
  baseURL: rsApiUrl,
  timeout: 3000,
  withCredentials: true,
})

export { rsApi }
