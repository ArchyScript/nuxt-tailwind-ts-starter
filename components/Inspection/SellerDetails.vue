<template>  
    <CardContainer size="md" class="flex-col space-y-4">
        <h4 class="text-lg text-grey-500 font-medium leading-[160%]">Sellers details</h4>

        <div class="flex-1 flex space-x-2 items-center">
        <span class="h-12 w-12 rounded-full ring-2 ring-primary-500">
            <img
            :src="sellerDetails?.companyLogo"
            :alt="sellerDetails?.company"
            class="w-full h-full rounded-full"
            />
        </span>

        <div class="flex-1 truncate space-y-1.5">
            <div class="flex items-center space-x-2">
            <h class="font-medium text-grey-500 truncate pr-2">
                {{ sellerDetails?.company }}
            </h>
            <IconCheckbox type="square" :width="20" :height="20" class="text-success-500" />
            </div>

            <span
            class="text-sm text-error-500 bg-error-50 px-1.5 leading-5 flex rounded-xl !w-fit h-fit py-0.5"
            >
            Seller
            </span>
        </div>
        </div>

        <div class="flex items-center space-x-1.5">
        <span class="text-sm leading-5 text-grey-400">Trades(s)</span>
        <span class="text-sm leading-5 text-grey-600 font-semibold">
            {{ sellerDetails?.total_trades }}
        </span>
        <span class="text-sm leading-5 text-grey-200">|</span>
        <span class="text-sm leading-5 text-grey-500 font-medium">
            {{ sellerDetails?.rating }}%
        </span>
        </div>

        <div class="flex justify-end">
            <Button
                text="Contact seller"
                customClass="!w-fit"
                :hasBorder="true"
                textSize="sm"
                :hasIcon="true"
                iconName="email"
                class="!py-3 !px-6 !text-secondary-500 !ring-secondary-500"
            />
        </div>
    </CardContainer> 
</template>

<script setup lang="ts">  
  const props = defineProps({
    sellerDetails: {
        type: Object,
        default: {
            company: "Test name",
            companyLogo: "Test",
            total_trades: "145",
            rating: "56", 
        }
    }
  })   
</script>
