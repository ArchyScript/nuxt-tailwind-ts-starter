<template>
  <div class="bg-white rounded box-shadow p-8 w-[36.5rem] mx-auto">
    <div class="text-sm p-1">
      <h3 class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600">
        Forgot Password
      </h3>
      <p class="text-center text-grey-400 leading-6">
        Enter the email address associated with your account, and we’ll send you an email with a
        link to reset your password.
      </p>

      <form class="mt-8">
        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">Email Address</label>

          <div class="relative bg-input-bg rounded">
            <span class="icon icon-left"> <IconEmail /> </span>

            <input
              id="email"
              v-model="payload.email"
              class="input-field !pl-12 pr-4"
              type="email"
              placeholder="example@gmail.com"
            />
          </div>
        </div>

        <div class="block w-full mt-6">
          <Button
            text="Send email"
            :disabled="!areFieldsValidated"
            :loading="loading"
            @click="handleForgotPassword"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ layout: 'auth' }); 
  const { $toast } = useNuxtApp();
  const router = useRouter();

  // import { useAuthStore } from '~/store/authentication';
  // const { setUnVerifiedUserEmail, unVerifiedUserEmail } = useAuthStore();
  // const { requestPassword } = useAuthApi();

  const loading: Ref<boolean> = ref(false);
  const payload = ref({ email: '' });

  const handleForgotPassword = async () => {
    loading.value = true;

    setTimeout(() => {
      loading.value = false;
    }, 1500);
  };

  // const requestUserPassword = async () => {
  //   loading.value = true;
  //   const response = await requestPassword(payload.value);
  //   const { data, error } = response;
  //   loading.value = false;
  //   if (error) return $toast('show', { type: 'error', message: error.message });

  //   setUnVerifiedUserEmail(payload.value.email);
  //   router.push('/auth/reset-password');
  // };
</script>

<style scoped>
  .input-field {
    @apply bg-transparent focus:bg-transparent focus:ring-primary-400 focus:ring-1 w-full flex-1 rounded leading-5 block text-sm py-3.5  outline-0 border-0;
  }
  .icon {
    @apply absolute top-0 h-full rounded-tl rounded-bl bg-transparent flex justify-center items-center px-[1.125rem];
  }
  .icon.icon-left {
    @apply rounded-tl rounded-bl left-0;
  }
</style>
