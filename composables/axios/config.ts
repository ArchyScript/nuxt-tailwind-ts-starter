import axios, { AxiosRequestHeaders } from "axios"
import AppConfig from "~/AppConfig"
const { BASE_URL } = AppConfig

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let authToken = null

  if (process.client && typeof window !== "undefined") {
    authToken = window.localStorage.getItem("authToken")
  }

  authToken = !authToken || authToken === undefined ? authToken : authToken

  const headers = {
    Authorization: `Bearer ${authToken}`,
  }
  return headers
}

/* Multiple axios instance can be created using this format  */
// Axios instances
const defaultAxiosInstance = axios.create({
  baseURL: `${BASE_URL}/[END]`,
  headers: { ...getAuthHeaders() },
})

//
defaultAxiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      ...getAuthHeaders(),
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { defaultAxiosInstance }
