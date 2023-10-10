<template>
  <CardContainer class="space-y-10 flex-col">
    <h5 class="font-normal leading-6 text-sm capitalize text-grey-400">
      {{ title }}
    </h5>

    <div class="space-y-1">
      <p class="text-grey-300 font-semibold leading-5 text-[1.25rem]">
        <span class="text-sm" v-if="isMoney">$</span>
        {{ amount }}
      </p>
      <!-- <p
        class="font-medium leading-5 text-xs flex items-center space-x-1"
        :class="isIncrease ? 'text-success-600' : 'text-error-500'"
      >
        {{ isIncrease ? 'Up' : 'Down' }}
        {{ `${percentageChange}%` }} last month
      </p> -->
    </div>
  </CardContainer>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      default: 0,
    },
    percentageChange: {
      type: Number,
      default: 0,
    },
    isIncrease: {
      type: Boolean,
      default: false,
    },
    isMoney: {
      type: Boolean,
      default: false,
    },
  });
</script>