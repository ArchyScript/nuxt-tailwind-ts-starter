 

<script setup lang="ts">
  definePageMeta({ layout: 'blank' });

  import { useAuthStore } from '~/store/authentication';
  const router = useRouter();

  const { $toast, $loading } = useNuxtApp();
  const { setAuthUser, setAuthToken } = useAuthStore();
  const { getUserProfile } = useKYCApi();

  const fetchAuthUser = async () => {
    console.log("useNuxtApp():::",  useNuxtApp())
    $loading().start();
    const response = await getUserProfile();
    const { data, error } = response;
    $loading().stop();
    if (error) {
      $toast('show', { type: 'error', message: error?.message });
      return router.push('/auth/login');
    }

    $toast('show', { type: 'success', message: 'Session restored' });

    const { authToken, kyc } = data;

    setAuthToken(authToken);
    setAuthUser(data);

    if (Object.keys(kyc).length < 1) return router.push('/auth/kyc');
    router.push('/dashboards');
  };

  onBeforeMount(() => fetchAuthUser());
</script>
