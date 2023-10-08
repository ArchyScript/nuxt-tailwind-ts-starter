<template>
  <CardContainer class="space-y-10 flex-col">
    <h5 class="font-normal leading-6 text-sm capitalize text-grey-400">
      {{ data.title }}
    </h5>

    <div class="space-y-1">
      <p class="text-grey-300 font-semibold leading-5 text-[1.25rem]">
        <span class="text-sm">{{ data.isMoney && '$' }}</span>
        {{ data.amount }}
      </p>
      <p
        class="font-medium leading-5 text-xs flex items-center space-x-1"
        :class="data.isIncrease ? 'text-success-600' : 'text-error-500'"
      >
        {{ data.isIncrease ? 'Up' : 'Down' }}
        {{ `${data.percentageChange}%` }} last month
      </p>
    </div>
  </CardContainer>
</template>

<script setup lang="ts">
  const props = defineProps({
    data: {
      type: Object,
      default: {
        title: '',
        amount: 0,
        percentageChange: 0,
        isIncrease: true,
        isMoney: false,
      },
    },
  });
</script>
