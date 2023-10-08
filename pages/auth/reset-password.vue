<template>
  <div class="bg-white rounded box-shadow p-8 w-[36.5rem] mx-auto">
    <div class="text-sm p-1">
      <h3 class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600">
        Reset Password
      </h3>
      <p class="text-center text-grey-400 leading-[160%] text-sm text-center">
        An email has been sent to archyscript@gmail.com, Click the link in the email to reset
        your password.
      </p>

      <form class="mt-8">
        <div class="flex justify-center items-center space-x-4 w-full mt-6">
          <!--  -->
          <Button
            text="Resend email"
            :loading="loading"
            @click="resetUserVerification"
            :hasBorder="true"
          />

          <!--  -->
          <Button text="Done" :loading="loading" @click="resetUserVerification" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $toast } = useNuxtApp();
  definePageMeta({ layout: 'auth' });
  import { useAuthStore } from '~/store/authentication';
  const { setUnVerifiedUserEmail, unVerifiedUserEmail } = useAuthStore();
  const { resetPassword } = useAuthApi();

  // Reactive
  const loading: Ref<boolean> = ref(false);

  const resetUserVerification = async () => {
    loading.value = true;
    const payload = { email: unVerifiedUserEmail };

    const response = await resetPassword(payload);
    const { data, error } = response;
    loading.value = false;
    if (error) return $toast('show', { type: 'error', message: error.message });
  };
</script>
