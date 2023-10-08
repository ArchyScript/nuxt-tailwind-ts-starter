<template>
  <div class="bg-white rounded box-shadow p-8 w-[36.5rem] mx-auto">
    <div class="text-sm p-1">
      <h3 class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600">
        Create account
      </h3>
      <p class="text-center text-grey-400 leading-6">Fill up the form to register</p>

      <form class="mt-8" @submit.prevent="registerFinacier">
        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">Email Address</label>

          <div class="relative bg-input-bg rounded">
            <span class="icon icon-left text-grey-40">
              <IconEmail />
            </span>

            <input
              id="email"
              class="input-field !pl-12 pr-4"
              type="email"
              placeholder="example@gmail.com"
              v-model="payload.email"
              @blur="v$.email.$touch()"
              :class="v$.email.$invalid && 'error'"
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="password" class="block mb-2 leading-6 text-grey-500">Password</label>

          <div class="relative bg-input-bg rounded">
            <span class="icon icon-left">
              <IconLock />
            </span>

            <input
              id="password"
              v-model="payload.password"
              @blur="v$.password.$touch()"
              :class="v$.password.$invalid && 'error'"
              :type="showPassword ? 'text' : 'password'"
              class="input-field !px-12"
              placeholder="password"
              autocomplete="current-password"
            />

            <span class="icon icon-right" @click="showPassword = !showPassword">
              <IconEyes :title="showPassword ? 'open' : 'close'" />
            </span>
          </div>
        </div>

        <div class="mb-4 flex items-center space-x-4">
          <div class="flex-1">
            <label for="password" class="flex space-x-2 items-center mb-2 leading-6 text-grey-500">
              <span>Payback Period</span>

              <IconInfo class="text-grey-40" />
            </label>

            <div class="relative bg-input-bg w-full rounded">
              <input
                id="payback_days"
                type="text"
                class="input-field px-4"
                placeholder="Payback Period"
                v-model="payload.payback_days"
                @blur="v$.payback_days.$touch()"
                :class="v$.payback_days.$invalid && 'error'"
              />
            </div>
          </div>

          <div class="flex-1">
            <label
              for="interest_rate"
              class="flex space-x-2 items-center mb-2 leading-6 text-grey-500"
            >
              <span>Interest rate</span>

              <IconInfo class="text-grey-40" />
            </label>
            <div class="relative bg-input-bg w-full rounded">
              <input
                id="interest_rate"
                class="input-field px-4"
                type=" text"
                placeholder="Interest rate"
                v-model="payload.interest_rate"
                @blur="v$.interest_rate.$touch()"
                :class="v$.interest_rate.$invalid && 'error'"
              />
            </div>
          </div>
        </div>

        <div class="block w-full mt-6">
          <Button type="submit" text="Create account" :loading="loading" />
        </div>

        <div class="flex justify-center items-center space-x-4 mt-8">
          <span class="text-center text-grey-400 leading-6">Already have an account?</span>

          <nuxt-link to="/auth/login" class="text-primary-500 font-medium leading-6 font-Poppins">
            Log in
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RegisterPayloadType } from '~/types/auth';

  import { useAuthStore } from '~/store/authentication';
  import {
    required,
    email,
    minLength,
    maxLength,
    minValue,
    maxValue,
    helpers,
  } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';

  definePageMeta({ layout: 'auth' });
  const { $toast } = useNuxtApp();

  const { register } = useAuthApi();
  const { setUnVerifiedUserEmail } = useAuthStore();
  const router = useRouter();

  const showPassword: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(false);
  const payload: Ref<any> = ref({
    email: '',
    password: '',
    payback_days: '',
    interest_rate: '',
  });

  //
  const rules = computed(() => {
    return {
      email: { required, email },
      password: { required, maxLength: maxLength(128), minLength: minLength(4) },
      payback_days: { required },
      interest_rate: { required },
    };
  });

  //
  const v$ = useVuelidate(rules, payload.value);

  //
  const registerFinacier = async () => {
    v$.value.$touch();
    loading.value = true;

    const response = await register(payload.value);
    const { data, error } = response;
    loading.value = false;
    if (error) return $toast('show', { type: 'error', message: error.message });

    //
    setUnVerifiedUserEmail(payload.value.email);
    router.push('/auth/verify-account');
  };
</script>

<style>
  .input-field {
    @apply bg-transparent focus:bg-transparent focus:ring-primary-400 focus:ring-1 w-full flex-1 rounded leading-5 block text-sm py-3.5 outline-0 border-0;
  }
  .input-field.error {
    @apply border border-error-500;
  }
  .icon {
    @apply absolute top-0 h-full rounded-tl rounded-bl bg-transparent flex justify-center items-center px-[1.125rem];
  }
  .icon.icon-left {
    @apply rounded-tl rounded-bl left-0;
  }
  .icon.icon-right {
    @apply rounded-tr rounded-br right-0 cursor-pointer;
  }
</style>
