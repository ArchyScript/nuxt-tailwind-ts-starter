import { defaultAxiosInstance, commonAxiosInstance } from '~/composables/axios/config';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';

export const useRequestsApi = () => {
  // dashbaordStats
  const dashbaordStats = async () => {
    try {
      const response = await defaultAxiosInstance.get(`dashboard/stats`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // getInspections
  const getRequests = async () => {
    try {
      const response = await commonAxiosInstance.get(`requests`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // singleInspection
  const getRequest = async (id: any) => {
    try {
      const response = await commonAxiosInstance.get(`request/${id}`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  const acceptRequest = async (requestId: any) => {
    try {
      const response = await commonAxiosInstance.post(`/requests/${requestId}/approve`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  const rejectRequest = async (requestId: any) => {
    try {
      const response = await commonAxiosInstance.post(`/requests/${requestId}/reject`);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  const updateRequest = async (requestId: any, payload: any) => {
    try {
      const response = await commonAxiosInstance.post(`/requests/${requestId}/update`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // fundRequest
  const fundRequest = async (requestId: string, payload: any) => {
    try {
      const response = await commonAxiosInstance.post(
        `requests/${requestId}/release-funds`,
        payload,
      );
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    dashbaordStats,
    getRequests,
    getRequest,
    fundRequest,
    updateRequest,
    acceptRequest,
    rejectRequest,
  };
};
