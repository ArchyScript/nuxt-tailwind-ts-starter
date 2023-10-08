<template>
  <div class="bg-white rounded box-shadow p-8 w-[36.5rem] mx-auto">  
    <div class="text-sm p-1">
      <h3
        class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600"
      >
        Link expired
      </h3>
      <p class="text-center text-grey-400 leading-6">
        This link has expired. Please check your inbox for the most recent link.
      </p>

      <form class="mt-8">
        <Button
          text="Back to Login"
          :loading="loading"
          :hasBorder="true"
          routeLink="/auth/login"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts"> 
definePageMeta({ layout: "auth" });  
  const loading: Ref<boolean> = ref(false);
</script>

