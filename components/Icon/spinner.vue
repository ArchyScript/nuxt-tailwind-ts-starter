<template>
  <span>
    <!--  -->
    <svg
      v-if="type == 'dotted'"
      xmlns="http://www.w3.org/2000/svg"
      :height="height"
      :width="width"
      viewBox="0 0 512 512"
      class="fill-current"
    >
      <path
        d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
      />
    </svg>

    <!--  -->
    <svg
      v-if="type == 'solid'"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 20 20"
      class="fill-current"
    >
      <mask
        id="mask0_4109_103307"
        style="mask-type: alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        :width="width"
        :height="height"
      >
        <path
          d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM1.998 10C1.998 14.4194 5.58062 18.002 10 18.002C14.4194 18.002 18.002 14.4194 18.002 10C18.002 5.58062 14.4194 1.998 10 1.998C5.58062 1.998 1.998 5.58062 1.998 10Z"
          fill="#CBEDDE"
        />
      </mask>
      <g mask="url(#mask0_4109_103307)">
        <rect x="-4" y="-4" width="28" height="28" fill="url(#paint0_angular_4109_103307)" />
        <circle cx="9.85938" cy="19" r="1" fill="white" />
      </g>
      <defs>
        <radialGradient
          id="paint0_angular_4109_103307"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 10) rotate(90) scale(14)"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </span>
</template>

<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      default: 'solid',
    },
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
  });
</script>

<style lang="scss" scoped></style>
