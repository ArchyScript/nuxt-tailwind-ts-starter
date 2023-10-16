<template>
  <div
    class="min-h-screen flex flex-col flex-auto flex-shrink-0 no-scrollbar antialiased bg-ui-bg"
  >
    <div>
      <slot />
    </div>

    <!-- all general components here e.g toast -->
    <Loader v-if="isLoading" />
    <Toast />
  </div>
</template>

<script setup lang="ts">
  import { useCustomStore } from "~/store/custom"
  const isLoading = computed(() => useCustomStore().isLoading)
</script>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
