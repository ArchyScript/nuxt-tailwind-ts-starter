<template>
  <CardContainer 
    :isRouted="true"
    :routerLink="`/inspections/${inspection._id}`"
    customClass="!space-y-4"
  > 
    <div class="flex space-x-4">
      <div class="flex-1 flex space-x-2 items-center">
        <span class="h-12 w-12 rounded">
          <img src="/images/img-1.png" class="w-full h-full" :alt="inspection.product" />
        </span>

        <div class="flex-1 truncate space-y-1.5">
          <h5 class="leading-5 !text-grey-500 font-medium truncate">
            {{ inspection.product }}
          </h5>

          <p class="flex items-center space-x-1.5">
            <span class="text-xs text-grey-500">Financier:</span>

            <span class="text-xs text-secondary-500">
              {{ inspection.financier }}
            </span>
          </p>
        </div>
      </div>

      <span
        class="text-xs text-secondary-500 bg-secondary-50 px-1.5 flex rounded-xl !w-fit capitalize h-fit py-0.5"
      >
        new request
      </span>
    </div>

    <!--  -->
    <div class="flex justify-end"> 
      <span class="flex flex-end items-center justify-center">
        <Button text="View request" :hasBorder="true"  class="flex !py-3 !px-6" />
      </span>
    </div> 
  </CardContainer>
</template>

<script setup lang="ts">
  import { formatNumber } from '~/utils';

  const props = defineProps({
    inspection: {
      type: Object,
      default: {
        _id: '',
        imageUrl: '', 
        financier: '', 
        product: ""
      },
    },
  });
</script>
