<template>
  <span>
    <svg
      :height="height"
      :width="width"
      viewBox="0 0 21 21"
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 20.5L0.5 18.5L8.5 10.5L0.5 2.5L2.5 0.5L10.5 8.5L18.5 0.5L20.5 2.5L12.5 10.5L20.5 18.5L18.5 20.5L10.5 12.5L2.5 20.5Z"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
  const props = defineProps({
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
  });
</script>

<style lang="scss" scoped></style>
