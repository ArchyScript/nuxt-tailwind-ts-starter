<template>
  <span>
    <svg
      v-if="type == 'circle'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      :height="height"
      :width="width"
      class="fill-current"
    >
      <path
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
      />
    </svg>

    <svg
      v-if="type == 'circle-outline'"
      :height="height"
      :width="width"
      class="fill-current"
      viewBox="0 0 65 65"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_1489_106224"
        style="mask-type: alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="65"
        height="65"
      >
        <path
          d="M64.5 32.5C64.5 14.8269 50.1731 0.5 32.5 0.5C14.8269 0.5 0.5 14.8269 0.5 32.5C0.5 50.1731 14.8269 64.5 32.5 64.5C50.1731 64.5 64.5 50.1731 64.5 32.5ZM6.8936 32.5C6.8936 18.358 18.358 6.8936 32.5 6.8936C46.642 6.8936 58.1064 18.358 58.1064 32.5C58.1064 46.642 46.642 58.1064 32.5 58.1064C18.358 58.1064 6.8936 46.642 6.8936 32.5Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_1489_106224)">
        <rect x="-12.3047" y="-12.2998" width="89.6" height="89.6" />
        <circle cx="32.0359" cy="61.3006" r="3.2" />
      </g>
      <path
        d="M21.5 32.5003L28.8333 39.8337L43.5 25.167"
        stroke="#47BD8F"
        stroke-width="3.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg
      v-if="type == 'square'"
      class="fill-current"
      :height="height"
      :width="width"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.7525 0.5H11.255C13.7975 0.5 15.5 2.285 15.5 4.94V11.0683C15.5 13.715 13.7975 15.5 11.255 15.5H4.7525C2.21 15.5 0.5 13.715 0.5 11.0683V4.94C0.5 2.285 2.21 0.5 4.7525 0.5ZM7.5725 10.2425L11.135 6.68C11.39 6.425 11.39 6.0125 11.135 5.75C10.88 5.495 10.46 5.495 10.205 5.75L7.1075 8.8475L5.795 7.535C5.54 7.28 5.12 7.28 4.865 7.535C4.61 7.79 4.61 8.2025 4.865 8.465L6.65 10.2425C6.7775 10.37 6.9425 10.43 7.1075 10.43C7.28 10.43 7.445 10.37 7.5725 10.2425Z"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      default: 'circle',
    },
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
