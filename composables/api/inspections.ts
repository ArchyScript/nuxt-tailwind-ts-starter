import { defaultAxiosInstance } from '~/composables/axios/config';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';

export const useInspectionsApi = () => {
  // all inspections
  const allInspections = async () => {
    try {
      const response = await defaultAxiosInstance.get(`deals`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // single inspection
  const getInspection = async (params: { id: any }) => {
    try {
      const response = await defaultAxiosInstance.get(`deals/${params.id}`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  }; 

  return {
    allInspections ,
    getInspection, 
  };
};
