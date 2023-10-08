<template>
  <span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :height="height"
      :width="width"
      class="fill-current"
      viewBox="0 0 448 512"
    >
      <path
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
  const props = defineProps({
    width: {
      type: Number,
      default: 15,
    },
    height: {
      type: Number,
      default: 15,
    },
  });
</script>

<style lang="scss" scoped></style>
