<template>
  <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 no-scrollbar antialiased bg-ui-bg">
    <!-- Sidebar -->
    <div
      class="fixed flex flex-col left-0 w-[17.5rem] p-4 bg-grey-700 h-full transition-all duration-300 border-none z-10"
    >
      <PartialsSidebar />
    </div>

    <!--  -->
    <div class="ml-[17.5rem] flex flex-col !no-scrollbar min-h-screen">
      <PartialsTopbar />

      <div class="container flex-1 h-full mx-auto w-full !no-scrollbar mb-20 p-8">
        <slot />
      </div>

      <PartialsAppFooter layout="default" />
    </div>

    <!-- all general components here e.g toast -->
    <Loader v-if="isLoading" />
    <Toast />
  </div>
</template>

<script setup lang="ts">
  import { useCustomStore } from '~/store/custom';
  const isLoading = computed(() => useCustomStore().isLoading); 
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
