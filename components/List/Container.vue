<template>
  <div
    :class="`bg-white  w-full 
        ${size == 'sm' && 'rounded p-6'}  
        ${size == 'md' && 'rounded-md p-6'}  
        ${size == 'xl' && 'rounded-xl p-6'} 
        ${hasBoxShadow && 'box-shadow'}
        ${customClass}
    `"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    customClass: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'sm',
    },
    hasBoxShadow: {
      type: Boolean,
      default: false,
    },
  });
</script>
