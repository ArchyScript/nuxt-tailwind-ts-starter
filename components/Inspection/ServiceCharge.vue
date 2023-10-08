<template>   
 
    <CardContainer size="md" class="flex-col space-y-4">
        <div class="flex items-center justify-between space-x-2">
            <h4 class="text-lg text-grey-500 font-medium leading-[160%]">Service charge</h4>

            <span> paid </span>
        </div>

        <CardContainer size="xs" customClass="!bg-ui-bg space-y-2">
            <div class="space-y-0.5">
                <h6 class="!text-grey-200 !leading-[160%] text-sm">Type</h6>
                <h4 class="text-lg text-grey-500 leading-[160%]">
                    {{ serviceCharge.details?.document_type }}
                </h4>
            </div>

            <!--  -->
            <div class="space-y-0.5">
                <h6 class="!text-grey-200 !leading-[160%] text-sm">Amount</h6>
                <h4 class="text-lg text-grey-500 leading-[160%]">
                    ${{ formatNumber(serviceCharge.amount) }}
                </h4>
            </div>
 
            <!-- fiat -->
            <div class="space-y-2" v-if="serviceCharge.method == 'fiat'">
                <div class="space-y-0.5">
                    <h6 class="!text-grey-200 !leading-[160%] text-sm">Account name</h6>
                    <h4 class="text-lg text-grey-500 uppercase leading-[160%]">
                        {{ serviceCharge.bank_account?.account_name }}
                    </h4>
                </div>

                <div class="space-y-0.5">
                    <h6 class="!text-grey-200 !leading-[160%] text-sm">Account number</h6>
                    <h4 class="text-lg text-grey-500 leading-[160%]">
                        {{ serviceCharge.bank_account?.account_number }}
                    </h4>
                </div>

                <div class="space-y-0.5">
                    <h6 class="!text-grey-200 !leading-[160%] text-sm">Bank</h6>
                    <h4 class="text-lg text-grey-500 leading-[160%]">
                        {{ serviceCharge.bank_account?.bank_name }}
                        ({{ serviceCharge.bank_account?.swift_code }})
                    </h4>
                </div>
            </div>

            <!-- crypto -->
            <div v-else class="space-y-0.5">
                <h6 class="!text-grey-200 !leading-[160%] text-sm">Address</h6>
                <div class="flex justify-between items-center truncate space-x-2">
                    <h4 class="text-lg text-grey-500 truncate leading-[160%]">
                        0x32gBe4125456412545678fgtjgbmj78fgtjgbm6412545678fgtjgbmjj015575x
                    </h4>

                    <span
                        class="p-1.5 rounded !text-secondary-500 bg-secondary-50 cursor-pointer"
                    >
                        <IconCopy fill="white" />
                    </span>
                </div>
            </div> 
        </CardContainer> 
    </CardContainer> 
</template>

<script setup lang="ts">
  import { formatNumber } from '~/utils';

  const props = defineProps({
    serviceCharge: {
        type: Object,
        default: {
            companyLogo: "Test",
            companyLogo: "Test",
            companyLogo: "Test",
            companyLogo: "Test",
            companyLogo: "Test",
            companyLogo: "Test", 
        }
    }
  }) 

  const myDeal: any = ref({});   
  const dealStatus = computed(() => myDeal.value.status);
   
</script>
