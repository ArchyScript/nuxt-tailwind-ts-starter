import { defaultAxiosInstance } from "~/composables/axios/config"
import { LoginPayloadType, RegisterPayloadType } from "~/types/auth"
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from "~/composables/axios/response"

export const useAuthApi = () => {
  const login = async (payload: LoginPayloadType) => {
    try {
      const response = await defaultAxiosInstance.post(`login`, payload)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  const register = async (payload: RegisterPayloadType) => {
    try {
      const response = await defaultAxiosInstance.post(`register`, payload)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  return {
    login,
    register,
  }
}
