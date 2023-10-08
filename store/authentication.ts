import { defineStore } from 'pinia'; 
const serializer = {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
};

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  // logged in user
  const token = ref<String>('');
  const userProfile = ref<any>({});
  const userKYC = ref<any>({});
  const authenticatedUser = ref<any>({});
  const previousRoute = ref<string | null>(null);

  // unauthenticated data like kyc data in local storage
  const unVerifiedUserEmail = ref<String>('');
  const kycData = ref<Object>({});
 
  // actions
  const setUnVerifiedUserEmail = (email: string) => {
    unVerifiedUserEmail.value = email;
  };

  const setAuthToken = (authToken: string) => {
    token.value = authToken;
    localStorage.setItem('authToken', authToken);
  };

  const setAuthUser = (userDetails: any) => { 
    authenticatedUser.value = userDetails;
  };
 
  const getAuthenticatedUser = async () => {
    const { getUserProfile } = useKYCApi();

    const response = await getUserProfile();
    const { data, error } = response;
    if (error) return;

    const { kyc } = data;
    // success message for login
    setAuthUser(data); 
    if (Object.keys(kyc).length < 1) return router.push('/auth/kyc');
  };

  const setKYCData = (data: any) => {
    kycData.value = data;
    saveKYCDataToLocalStorage();
  };

  const saveKYCDataToLocalStorage = () => {
    localStorage.setItem('kycData', serializer.serialize(kycData.value));
  };

  const loadKYCDataFromLocalStorage = async () => {
    const kycInStorage = localStorage.getItem('kycData');
    if (!kycInStorage) return;

    const deserializedData = serializer.deserialize(kycInStorage);
    if (Object.keys(deserializedData).length > 0) {
      kycData.value = deserializedData;
    }
  };

  const clearAuthStore = () => {
    token.value = '';
    userProfile.value = {};
    kycData.value = '';
    unVerifiedUserEmail.value = '';
  };

  function savePreviousRoute() {
    previousRoute.value = router.currentRoute.value.fullPath;
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    clearAuthStore();
    savePreviousRoute();
    router.push('/auth/login');
  };

  return {
    token,
    userProfile,
    userKYC,
    kycData,
    previousRoute,
    authenticatedUser, 
    unVerifiedUserEmail, 
    setAuthToken,
    setAuthUser,
    logout,
    getAuthenticatedUser,
    setUnVerifiedUserEmail,
    loadKYCDataFromLocalStorage,
    saveKYCDataToLocalStorage,
    setKYCData,
    savePreviousRoute, 
  };
});
