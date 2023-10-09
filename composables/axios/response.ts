import { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from '~/store/authentication';

export const setResponseReturn = (data: any, status: any, error: any) => {
  return { data, status, error };
};

export const HandleAxiosError = (error: AxiosError | any) => { 
  const { logout } = useAuthStore();

  const error_response = error.response;
  const status = error_response?.status || null;

  if (error_response) {
    const errorIsArray = Array.isArray(error_response);
    const error_message = errorIsArray ? error_response[0] : error_response;
 
    if ((status && status == 401) || status == 403) {
      setTimeout(() => {
        logout();
      }, 6000);
    }

    return setResponseReturn(null, status, error_message?.data);
  }

  return setResponseReturn(null, status, error);
};

export const HandleAxiosResponse = async (response: AxiosResponse) => {
  const { data, status } = response;

  return setResponseReturn(data.data, status, null);
};
