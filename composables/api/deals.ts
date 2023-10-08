import { defaultAxiosInstance } from '~/composables/axios/config';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';

export const useDealsApi = () => {
  // deals
  const allDeals = async () => {
    try {
      const response = await defaultAxiosInstance.get(`deals`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // getSingleDeal
  const getSingleDeal = async (params: { id: any }) => {
    try {
      const response = await defaultAxiosInstance.get(`deals/${params.id}`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // createDeal
  const createDeal = async (params: { id: any }) => {
    try {
      const response = await defaultAxiosInstance.post(`deals`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    allDeals,
    getSingleDeal,
    createDeal,
  };
};
