import axios from 'axios'

const rsApiUrl = import.meta.env.VITE_RS_API_URL

const rsApi = axios.create({
  baseURL: rsApiUrl,
  timeout: 1000,
  withCredentials: true,
})

export { rsApi }
