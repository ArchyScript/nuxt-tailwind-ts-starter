import { defaultAxiosInstance, commonAxiosInstance } from '~/composables/axios/config';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';
import { LoginPayloadType, RegisterPayloadType } from '~/types/auth';

export const useAuthApi = () => {
  // login
  const login = async (payload: LoginPayloadType) => {
    try {
      const response = await defaultAxiosInstance.post(`login`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // register
  const register = async (payload: RegisterPayloadType) => {
    try {
      // const register = async (payload: any) => {
      const response = await defaultAxiosInstance.post(`register`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // resend verification
  const resendVerification = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance.post(`resend-verification-mail`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // changePassowrd
  const changePassowrd = async (payload: any) => {
    try {
      const response = await commonAxiosInstance.post(`auth/change-password`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // resetPassword
  const resetPassword = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance.post(`reset-password`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // verify2FA
  const verify2FA = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance.post(`verify`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // initiate2FA
  const initiate2FA = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance.post(`authentication`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // requestPassword
  const requestPassword = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance.post(`request-password`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // verifyUser
  const verifyUser = async (token: string | string[]) => {
    try {
      const response = await defaultAxiosInstance.get(`verify/${token}`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // delete financier
  const deleteInspector = async () => {
    try {
      const response = await defaultAxiosInstance.post(`delete-account`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // logout
  const logout = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance.post(`logout`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    login,
    register,
    resendVerification,
    changePassowrd,
    resetPassword,
    verify2FA,
    initiate2FA,
    requestPassword,
    verifyUser,
    logout,
    deleteInspector,
  };
};
