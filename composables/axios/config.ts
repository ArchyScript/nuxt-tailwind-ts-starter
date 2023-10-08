import axios, { AxiosRequestHeaders } from 'axios';
// const API_BASE_URL = 'https://api.vesseltrustks.com/api/v1';
//cd0b-154-120-110-64.ngrok-free.app
// const API_BASE_URL = 'https://42c9-154-118-64-101.ngrok-free.app/api/v1';
const API_BASE_URL = 'http://localhost:4000/api/v1';
// causing error, find a way to get api url from .env file
// const API_BASE_URL = useRuntimeConfig().public?.API_BASE_URL;
import AppConfig from '~/AppConfig';

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let authToken = null;

  if (process.client && typeof window !== 'undefined') {
    authToken = window.localStorage.getItem('authToken');
  }

  authToken = !authToken || authToken === undefined ? authToken : authToken;

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  console.log('composable');
  return headers;
};

// Axios instances
const defaultAxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/financier`,
  headers: { ...getAuthHeaders() },
});

const commonAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { ...getAuthHeaders() },
});

const uploadAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    ...getAuthHeaders(),
    'Content-Type': 'multipart/form-data',
  },
});

export { defaultAxiosInstance, commonAxiosInstance, uploadAxiosInstance };
