<template>
  <div class="w-[36.5rem] mx-auto">
    <div class="text-sm p-1">
      <div class="flex flex-col justify-center items-center">
        <IconEmptyImg class="mb-8" />

        <h3 class="text-center leading-7 mb-2 text-[1.25rem] font-semibold text-black">
          Verify Your Account
        </h3>

        <p class="text-center text-grey-400 leading-6">
          An email has been sent to {{ unVerifiedUserEmail }}, Click the link in the email to reset
          your password.
        </p>
      </div>

      <form class="mt-8">
        <div class="flex justify-center items-center space-x-4 w-full mt-6">
          <!--  -->
          <Button
            text="Resend email"
            :loading="loading"
            @click="resendUserVerification"
            :hasBorder="true"
          />

          <!--  -->
          <Button text="Done" @click="handleVerified" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '~/store/authentication';

  const { unVerifiedUserEmail } = useAuthStore();
  const router = useRouter();
  const { resendVerification } = useAuthApi();

  definePageMeta({ layout: 'auth' });

  // Reactive
  const loading: Ref<boolean> = ref(false);

  //
  const handleVerified = async () => {
    router.push('/auth/login');
  };
  const resendUserVerification = async () => {
    loading.value = true;
    const payload = { email: unVerifiedUserEmail };

    const response = await resendVerification(payload);
    const { data, error } = response;
    loading.value = false;
    if (error) return;
  };

  onBeforeMount(async () => {
    if (!unVerifiedUserEmail) return router.push('/auth/login');
  });
</script>
