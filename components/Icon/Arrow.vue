<template>
  <span>
    <svg
      v-if="type == 'caret-down'"
      :height="height"
      :width="width"
      viewBox="0 0 9 6"
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.70573 1.39575L4.4974 4.60409L1.28906 1.39575"
        stroke="#9897A8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg
      v-if="type == 'caret-left'"
      :height="height"
      :width="width"
      viewBox="0 0 8 12"
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.70984 11.1317C6.55213 11.2894 6.29643 11.2894 6.13872 11.1317L1.29256 6.28556C1.13485 6.12785 1.13485 5.87215 1.29256 5.71444L6.13872 0.868283C6.29643 0.710571 6.55213 0.710571 6.70984 0.868283C6.86755 1.026 6.86755 1.2817 6.70984 1.43941L2.14925 6L6.70984 10.5606C6.86755 10.7183 6.86755 10.974 6.70984 11.1317Z"
        stroke="#364359"
        stroke-width="0.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 18,
    },
    height: {
      type: Number,
      default: 18,
    },
  });
</script>

<style lang="scss" scoped></style>
