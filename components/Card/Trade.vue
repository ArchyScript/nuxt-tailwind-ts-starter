<template>
  <div class="py-1 border-b-[0.2px] border-grey-50">
    <div class="flex space-x-4 justify-between items-center p-2 hover:bg-input-bg cursor-pointer">
      <div class="flex-1 flex items-center space-x-2">
        <div class="h-12 w-12 rounded">
          <Avatar name="img-1" class="!w-full !h-full" :alt="trade.title" />
        </div>

        <div class="flex-1 truncate space-y-1.5">
          <h5 class="font-medium leading-5 text-grey-500 truncate">{{ trade.title }}</h5>
          <span
            class="text-success-500 text-xs bg-success-50 px-1.5 leading-5 flex rounded-xl !w-fit py-0.5"
          >
            {{ trade.isVerified ? 'verified' : 'verified' }}
          </span>
        </div>
      </div>

      <div class="flex space-x-4">
        <div class="flex-1 align-right flex-col flex truncate space-y-1.5">
          <h5 class="leading-5 font-medium text-grey-500 truncate">
            {{ `$${trade.amount}` }}
          </h5>

          <p class="flex-1 flex justify-end">
            <span
              class="!w-fit text-xs px-1.5 flex rounded-xl py-0.5"
              :class="`
              ${trade.status == 'funded' && 'text-success-500'}
              ${trade.status == 'inspecting' && 'text-warning-500'}
              ${trade.status == 'cancelled' && 'text-error-500'}
              ${trade.status == 'new request' && 'text-secondary-500'} 
            `"
            >
              {{ trade.status }}
            </span>
          </p>
        </div>

        <span v-if="trade.status == 'new request'" class="flex items-center justify-center">
          <IconEmail />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    trade: {
      type: Object,
      default: {
        id: '1',
        imageUrl: '~/public/images/img-1.png',
        isVerified: false,
        title: '',
        amount: 0,
        status: '',
      },
    },
  });
</script>
