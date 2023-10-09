<template>
  <CardContainer
    size="sm"
    :isRouted="true"
    :routerLink="`/inspections/${inspection._id}`"
    customClass="space-y-4"
  >
    <!-- <div class="" >  -->
    <div class="flex space-x-4">
      <div class="flex-1 flex space-x-2 items-center">
        <span class="h-12 w-12 rounded">
          <img src="/images/img-1.png" class="w-full h-full" :alt="inspection.title" />
        </span>

        <div class="flex-1 truncate space-y-1.5">
          <h5 class="leading-5 !text-grey-500 font-medium truncate">
            {{ inspection.product }}
          </h5>

          <p class="flex items-center space-x-1.5">
            <span class="text-xs text-grey-500">Seller:</span>

            <span class="text-xs text-primary-500">
              {{ inspection.seller_name }}
            </span>
          </p>
        </div>
      </div>

      <span
        class="text-xs text-secondary-500 bg-secondary-50 px-1.5 flex rounded-xl !w-fit h-fit py-0.5"
      >
        new request
      </span>
    </div>

    <!--  -->
    <div class="flex items-end space-x-4">
      <div class="flex-1 align-right flex-col flex truncate space-y-1">
        <span size="xs" class="text-xs text-grey-400">Request amount</span>
        <span class="text-xl leading-5 font-medium text-grey-500">${{ formatNumber(inspection.amount) }}</span>

        <p class="text-sm leading-5 text-grey-400">Interest rate: {{ inspection.interest_rate }}</p>
        <p class="text-sm leading-5 text-grey-400">Delivery Days: {{ inspection.payback_days }}</p>
      </div>

      <span class="flex items-center justify-center">
        <Button text="View request" :hasBorder="true" textSize="sm" class="!py-3 !px-6 !text-secondary-500 !ring-secondary-500" />
      </span>
    </div>
    <!-- </div> -->
  </CardContainer>
</template>

<script setup lang="ts">
  import { formatNumber } from '~/utils';

  const props = defineProps({
    inspection: {
      type: Object,
      default: {
        id: '',
        imageUrl: '',
        title: '',
        seller: '',
        requestAmount: 0,
        interestRate: 0,
        deliveryDays: '',
      },
    },
  });
</script>
