import { defineStore } from "pinia"
const serializer = {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
}

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter()

  // logged in user
  const token = ref<String>("")
  const authenticatedUser = ref<any>({})

  // actions
  const setAuthToken = (authToken: string) => {
    token.value = authToken
    localStorage.setItem("authToken", authToken)
  }

  const clearAuthStore = () => {
    token.value = ""
    authenticatedUser.value = {}
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    clearAuthStore()
    router.push("/auth/login")
  }

  return {
    token,
    authenticatedUser,
    setAuthToken,
    logout,
  }
})
