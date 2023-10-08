import { defaultAxiosInstance } from '~/composables/axios/config';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';

export const useKYCApi = () => {
  // verify file
  const verifyKYC = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance.post(`kyc`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // update file
  const updateKYC = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance.post(`account`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // get user profile
  const getUserProfile = async () => {
    try {
      const response = await defaultAxiosInstance.get(`account`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    verifyKYC,
    updateKYC,
    getUserProfile,
  };
};
