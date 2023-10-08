<template>
  <div>
    <h3 class="font-medium text-xl leading-5">ererererer</h3>

    <p class="text-grey-600 text-sm leading-5">Your identity verification failed</p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    message: {
      type: String,
      default: '',
    },
  });
</script>
