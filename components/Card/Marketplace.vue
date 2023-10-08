<template>
  <CardContainer
    size="sm"
    :isRouted="true"
    :routerLink="`/marketplace/${marketplace.id}`"
    customClass="space-y-4"
  >
    <!-- <div class="" >  -->
    <div class="flex space-x-4">
      <div class="flex-1 flex space-x-2 items-center">
        <span class="h-12 w-12 rounded">
          <Avatar name="img-1" class="!w-full !h-full" :alt="marketplace.title" />
        </span>

        <div class="flex-1 truncate space-y-1.5">
          <h5 class="leading-5 font-medium leading-5 text-grey-500 truncate">
            {{ marketplace.title }}
          </h5>

          <p class="flex items-center space-x-1.5">
            <span class="text-xs text-grey-500">Seller:</span>
            <span class="text-xs text-primary-500">{{ marketplace.title }}</span>
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
        <span class="inline-block text-xs text-grey-400">Request amount</span>
        <h4 class="text-2xl font-medium leading-5 text-grey-500">
          ${{ marketplace.requestAmount }}
        </h4>
        <p class="text-sm leading-5 text-grey-400">Interest rate: {{ marketplace.interestRate }}</p>
        <p class="text-sm leading-5 text-grey-400">Delivery Days: {{ marketplace.deliveryDays }}</p>
      </div>

      <span class="flex items-center justify-center">
        <Button text="View request" :hasBorder="true" textSize="sm" class="!py-3 !px-6" />
      </span>
    </div>
    <!-- </div> -->
  </CardContainer>
</template>

<script setup lang="ts">
  const props = defineProps({
    marketplace: {
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
