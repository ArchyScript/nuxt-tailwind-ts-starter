import axios, { AxiosRequestHeaders } from 'axios'; 
import AppConfig from '~/AppConfig'; 
const {BASE_URL} = AppConfig
 

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let authToken = null;

  if (process.client && typeof window !== 'undefined') {
    authToken = window.localStorage.getItem('authToken');
  }

  authToken = !authToken || authToken === undefined ? authToken : authToken;

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  
  return headers;
};

// Axios instances
const defaultAxiosInstance = axios.create({
  baseURL: `${BASE_URL}/inspections`,
  headers: { ...getAuthHeaders() },
});

const commonAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { ...getAuthHeaders() },
});

const uploadAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    ...getAuthHeaders(),
    'Content-Type': 'multipart/form-data',
  },
});

export { defaultAxiosInstance, commonAxiosInstance, uploadAxiosInstance };
