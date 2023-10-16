<template>
  <div class="flex items-center justify-between sticky top-0 h-16 px-8 z-50">
    <h4 class="text-lg text-black">nav bar</h4>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from "~/store/authentication"
  const { authenticatedUser, logout } = useAuthStore()

  const router = useRouter()
  const route = useRoute()

  const logoutUser = () => logout()
</script>
