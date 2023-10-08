<template>
  <div class="bg-white rounded box-shadow p-8 w-[36.5rem] mx-auto">
    <div class="text-sm p-1">
      <h3 class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600">
        Verification Successful
      </h3>
      <p class="text-center pt-6 px-2 text-grey-400 leading-6">
        Thank you for verifying your email address. You now will be redirected to the KYC page for
        you to complete your registration
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '~/store/authentication';
  definePageMeta({ layout: 'auth' });

  const { verifyUser } = useAuthApi();
  const { unVerifiedUserEmail, setAuthUser, setAuthToken } = useAuthStore();
  const router = useRouter();
  const route = useRoute();

  const { $toast } = useNuxtApp();
  const loading: Ref<boolean> = ref(false);

  // function
  const verify = async () => {
    loading.value = true;
    const { token } = route.params;

    const response = await verifyUser(token);
    const { data, error } = response;
    loading.value = false;
    if (error) return $toast('show', { type: 'error', message: error.message });
    const { profile, authToken } = data;

    setAuthToken(authToken);
    setAuthUser(profile);

    setTimeout(() => router.push('/auth/kyc'), 3000);
  };

  // Lifcycle
  onMounted(() => verify());
</script>
