<template>
  <section class="w-full h-[100vh] flex justify-center items-center flex-col bg-prinary-50">
    <!-- Text here -->
    <div class=" text-center block w-[35%] space-y-3">
      <h1 class="text-[1.5rem] font-bold text-grey-500">Oops... page not found.</h1>

      <p class="m-auto  w-full text-grey-400  font-medium opacity-70">
        The page you’re looking for might have been removed, temporarily unavailable or never
        existed. We’re sad you had to see this and hope you never see it again.
      </p>

<div class="flex justify-center items-center ">
      <nuxt-link to="/dashboards" class="rounded-lg px-8 py-3 border bg-primary-500 text-primary-50">
        Dashboards
      </nuxt-link> 
</div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = defineProps({
    error: Object,
  });
  const handleError = () => clearError({ redirect: '/' });

  onMounted(() => {
    console.error(props.error);
  });
</script>
