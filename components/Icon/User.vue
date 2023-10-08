<template>
  <span>
    <svg
      v-if="title == 'single'"
      :width="width"
      :height="height"
      class="fill-current"
      viewBox="0 0 12 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.97049 4.46829C9.97049 6.67106 8.20433 8.43733 6 8.43733C3.79642 8.43733 2.02951 6.67106 2.02951 4.46829C2.02951 2.26552 3.79642 0.5 6 0.5C8.20433 0.5 9.97049 2.26552 9.97049 4.46829ZM6 15.5C2.74678 15.5 0 14.9712 0 12.9312C0 10.8905 2.76404 10.3804 6 10.3804C9.25397 10.3804 12 10.9092 12 12.9492C12 14.99 9.23596 15.5 6 15.5Z"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: 'single',
    },
    width: {
      type: Number,
      default: 14,
    },
    height: {
      type: Number,
      default: 16,
    },
  });
</script>
