<template>
  <div class="bg-[#FAFAFA] min-h-screen overflow-x-hidden w-screen">
    <div class="container block mx-auto py-32 w-full">
      <div class="w-[36rem] mx-auto">
        <img src="~/assets/images/logo-full.svg" class="m-auto h-[3.875rem]" alt="logo" />
      </div>

      <div class="mt-8 font-Poppins">
        <slot />
      </div>
    </div>

    <PartialsAppFooter layout="auth" />
  </div>

  <!-- all general components here e.g toast -->
  <Toast />
</template>

<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();
  import { useAuthStore } from '~/store/authentication';
  const { token } = useAuthStore();
  const { $toast, $loading } = useNuxtApp(); 

  onBeforeMount(() => { 
    if (token) {
      router.push('/dashboards');
      return $toast('show', { type: 'error', message: 'You are already logged in' });
    }
  });
</script>

<style>
  .box-shadow {
    box-shadow: 0px 24px 34px -2px rgba(221, 221, 221, 0.25);
  }
</style>
