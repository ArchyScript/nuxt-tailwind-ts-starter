<template> 
    <div class="space-y-4">
        <h4 class="text-grey-500 leading-[120%] tracking-wide font-medium text-lg">
        Offer details
        </h4>

        <CardContainer customClass="!bg-ui-bg grid grid-cols-2 gap-y-3 gap-x-2">
        <div class="space-y-0.5">
            <h6 class="!text-grey-200 !leading-[160%] text-sm">Product Name</h6>
            <h4 class="text-lg text-grey-500 leading-[160%]">
            {{ offerDetails?.nameOfVessel }}
            </h4>
        </div>

        <div class="space-y-0.5">
            <h6 class="!text-grey-200 !leading-[160%] text-sm">Delivery Days</h6>
            <h4 class="text-lg text-grey-500 leading-[160%]">
            {{
                offerDetails?.deliveryDays > 1
                ? `${offerDetails?.deliveryDays} days`
                : ` ${offerDetails?.deliveryDays} day`
            }}
            </h4>
        </div>
        <!--  -->
        <div class="space-y-0.5">
            <h6 class="!text-grey-200 !leading-[160%] text-sm">Price</h6>
            <h4 class="text-lg text-grey-500 leading-[160%]">
            {{ formatNumber(50000) }}
            </h4>
        </div>

        <div class="space-y-0.5">
            <h6 class="!text-grey-200 !leading-[160%] text-sm">Contract Length</h6>
            <h4 class="text-lg text-grey-500 leading-[160%]">
            {{ offerDetails?.contractLength }} years
            </h4>
        </div>
        <!--  -->
        <div class="space-y-0.5">
            <h6 class="!text-grey-200 !leading-[160%] text-sm">Quantity</h6>
            <h4 class="text-lg text-grey-500 leading-[160%]">
            {{ offerDetails?.quantity }}
            </h4>
        </div>
        <div class="space-y-0.5">
            <h6 class="!text-grey-200 !leading-[160%] text-sm">Vessel Name</h6>
            <h4 class="text-lg text-grey-500 leading-[160%]">
            {{ offerDetails?.nameOfVessel }}
            </h4>
        </div>
        <!--  -->
        <div class="space-y-0.5">
            <h6 class="!text-grey-200 !leading-[160%] text-sm">Mode of transportation</h6>
            <h4 class="text-lg text-grey-500 leading-[160%]">
            {{ offerDetails?.modeTransport }}
            </h4>
        </div>
        <div class="space-y-0.5">
            <h6 class="!text-grey-200 !leading-[160%] text-sm">Vessel Quality</h6>
            <h4 class="text-lg text-grey-500 leading-[160%]">
            {{ offerDetails?.quality }}
            </h4>
        </div>
        <!--  -->
        <div class="space-y-0.5">
            <h6 class="!text-grey-200 !leading-[160%] text-sm">Port Loading</h6>
            <h4 class="text-lg text-grey-500 leading-[160%]">
            {{ offerDetails?.loadingTerminal }}
            </h4>
        </div>
        <div class="space-y-0.5">
            <h6 class="!text-grey-200 !leading-[160%] text-sm">IMO Number</h6>

            <h4 class="text-lg text-grey-500 leading-[160%]">
            IMO
            {{ offerDetails?.imoNumber }}
            </h4>
        </div>
        <!--  -->
        <div class="col-span-2">
            <h6 class="!text-grey-200 leading-[160%] text-sm">Procedure</h6>
            <h4 class="text-lg text-grey-500 leading-[160%]">
            {{ offerDetails?.procedure }}
            </h4>
        </div>

        <!--  -->
        <div
            class="col-span-2 flex flex items-center justify-between border border-dashed rounded"
        >
            <div
            class="col-span-2 flex items-center space-x-2 p-2 cursor-pointer text-secondary-500 rounded"
            >
            <IconEyes title="open" />
            <span class="text-xs text-secondary-500">Laycan Agreement</span>
            </div>

            <!--  -->
            <div
            class="col-span-2 flex items-center space-x-2 p-2 cursor-pointer text-secondary-500 rounded"
            >
            <IconEyes title="open" />
            <span class="text-xs text-secondary-500">Performance docs</span>
            </div>
            <!--  -->
            <div
            class="col-span-2 flex items-center space-x-2 p-2 cursor-pointer text-secondary-500 rounded"
            >
            <IconEyes title="open" />
            <span class="text-xs text-secondary-500">Licence & Permits</span>
            </div>
        </div>
        </CardContainer>
    </div> 
</template> 

<script setup lang="ts">
  import { formatNumber } from '~/utils'; 
  const props = defineProps({
    offerDetails: {
        type: Object,
        default: {
            nameOfVessel: "Test name",
            deliveryDays: 46,
            price: 145,
            contractLength: 145,
            quantity: 145,
            modeTransport: "test transport",
            quality: "quality",
            loadingTerminal: "load terminal",
            procedure: "Lorem ipsum dolor sit amet consectetur. Pharetra in tempor vel c  ongue maecenas ultrices at a. Imperdiet mattis porttitor pulvinar lobortis. Lorem pellentesque nibh velit enim neque ut elit tincidunt rhoncus. Risus mattis hendrerit elementum cursus ullamcorper tempor.",
            imoNumber: "55467896", 
        }
    }
  })   

</script>
