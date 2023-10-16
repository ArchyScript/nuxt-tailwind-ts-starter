<template>
  <div class="bg-[#FAFAFA] min-h-screen overflow-x-hidden w-screen">
    <div class="container block mx-auto py-32 w-full">
      <slot />
    </div>
  </div>

  <!-- all general components here e.g toast -->
  <Toast />
</template>

<script setup lang="ts">
  const router = useRouter()
  const route = useRoute()
  import { useAuthStore } from "~/store/authentication"
  const { token } = useAuthStore()
  const { $toast, $loading } = useNuxtApp()

  onBeforeMount(() => {
    if (token) {
      router.push("/dashboards")
      return $toast("show", {
        type: "error",
        message: "You are already logged in",
      })
    }
  })
</script>

<style>
  .box-shadow {
    box-shadow: 0px 24px 34px -2px rgba(221, 221, 221, 0.25);
  }
</style>
