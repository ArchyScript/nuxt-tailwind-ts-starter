<template>
  <div>  
    <div class="space-y-6"> 
      <Back text="Inspection Agencies" routerLink="/inspections" />
 
      <div v-if="loading"></div>
 
      <section class="grid w-full grid-cols-5 gap-4" v-else> 
        <CardContainer size="md" class="col-span-3 space-y-4">
          <div class="flex items-center space-x-4 pb-4 w-full border-b">
            <div class="flex-1 flex space-x-4 items-center">
              <span class="h-16 w-16 rounded-sm border">
                <img
                  src="test"
                  alt="test"
                  class="w-full h-full rounded-sm"
                />
              </span>

              <div class="flex-1 truncate space-y-1.5">
                <h2 class="text-2xl font-medium text-grey-500 truncate font">
                  {{ "Test trade type" }}
                </h2>

                <div class="flex items-center space-x-1.5">
                  <h6 class="text-grey-400">Seller:</h6>
                  <p class="!text-primary-500">{{ 'BCO5' }}</p>
                </div>
              </div>
            </div>

            <div class="flex flex-col justify-between space-y-3">
              <h6 class="flex text-grey-500">Status</h6>
              <span
                class="text-secondary-500 text-sm leading-5 bg-secondary-50 px-1.5 flex rounded-xl !w-fit h-fit py-0.5"
              >
                {{ 'pending' }}
              </span>
            </div>
          </div>

          <!--  -->
          <div class="flex space-x-4 pb-4 w-full border-b">
            <div class="flex-1 flex flex-col flex truncate space-y-0.5">
              <span class="text-sm leading-5 text-grey-400 leading-[160%]">Request amount</span>

              <h6
                class="text-sm text-grey-500 leading-[140%] tracking-wide font-semibold !text-[1.75rem]"
              >
                ${{ formatNumber(49789) }}
              </h6>

              <span class="text-sm text-grey-400 !leading-[160%]">
                Interest rate:
                {{ `${0.5}%` }}
              </span>

              <span class="text-sm text-grey-400 leading-[160%]">
                Delivery Days:
                {{ `${7} days` }}
              </span> 
            </div> 

            <div> 
              <Button
                text="Inspect offer" 
                textSize="sm"
                :hasIcon="true"
                iconName="scan"
                class="!py-3 !px-6"
              /> 
 
              <!-- <Button
                text="Upload inspection report" 
                textSize="sm"
                :hasIcon="true"
                :hasBorder="true"
                iconName="paper-upload"
                class="!py-3 !px-6"
              />  -->
            </div>
          </div>

          <!--  offer details -->
          <InspectionOfferDetails/>
        </CardContainer> 

        <!--  -->
        <div class="col-span-2 space-y-5">
          <InspectionFinancierDetails/>
          <InspectionSellerDetails/>
          <InspectionServiceCharge/>
        </div>
      </section> 
    </div>
  </div>
</template>

<script setup lang="ts">
  import { formatNumber } from '~/utils';

  const route = useRoute(); 

  const loading: Ref<boolean> = ref(false);
  const activeModal = ref('');  

  const closeModals = () => activeModal.value = ''; 
 
</script>
