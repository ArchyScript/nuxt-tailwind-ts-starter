<template>
  <div class="h-screen w-screen">
    <slot />

    <!--  -->
    <Toast />
    <Loader v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
  import { useCustomStore } from '~/store/custom';
  const isLoading = computed(() => useCustomStore().isLoading);
</script>
