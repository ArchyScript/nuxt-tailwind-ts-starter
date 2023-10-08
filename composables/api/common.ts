import { uploadAxiosInstance, commonAxiosInstance } from '~/composables/axios/config';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';

export const useCommonApi = () => {
  // upload file
  const uploadFile = async (payload: FormData) => {
    try {
      const response = await uploadAxiosInstance.post(`cloudinary/upload`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // liveness check
  const livenessCheck = async (payload: any) => {
    try {
      const response = await commonAxiosInstance.post(`liveness-check`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // liveness check
  const getConstantData = async () => {
    try {
      const response = await commonAxiosInstance.get(`constants`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    uploadFile,
    livenessCheck,
    getConstantData,
  };
};
