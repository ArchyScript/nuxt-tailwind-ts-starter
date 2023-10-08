import { defaultAxiosInstance, commonAxiosInstance } from '~/composables/axios/config';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';

export const useUserApi = () => {
  const addNewAccount = async (payload: any) => {
    try {
      const response = await commonAxiosInstance.post(`/user/bank-accounts`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  const updateBankAccount = async (accountId: any, payload: any) => {
    try {
      const response = await commonAxiosInstance.post(`/user/bank-accounts/${accountId}`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  const removeBankAccount = async (accountId: any) => {
    try {
      const response = await commonAxiosInstance.delete(`/user/bank-accounts/${accountId}/remove`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    addNewAccount,
    updateBankAccount,
    removeBankAccount,
  };
};
