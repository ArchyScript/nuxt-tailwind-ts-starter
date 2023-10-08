<template>
  <div>
    <!-- modals -->
    <div>
      <Modal v-if="isSendingRequest">
        <ModalsProcessing />
      </Modal>

      <Modal
        v-if="activeModal == 'accept-request'"
        id="accept-request"
        size="sm"
        @close="closeModals"
      > 
        <ModalsConfirm @confirm="acceptFundRequest" @close="closeModals" btnText="Accept" />
      </Modal>

      <Modal
        v-if="activeModal == 'reject-request'"
        id="reject-request"
        size="sm"
        @close="closeModals"
      >
        <ModalsReject @reject="rejectFundRequest" @close="closeModals" />
      </Modal>

      <!-- fund request -->
      <Modal v-if="activeModal == 'fund-request'" size="sm" @close="closeModals">
        <ModalsDealsFundRequest @done="refetchData" :requestId="requestId" />
      </Modal>
    </div>

    <div class="space-y-6">
      <!-- <Disclaimer class="absolute right-0 left-0"/> -->
      <!--  -->
      <Back text="Inspection Agencies" routerLink="/inspections" />

      <!--  -->
      <div v-if="loading"></div>

      <div v-else>
        <!-- chart and trades section -->
        <section class="grid w-full grid-cols-5 gap-4"> 
          <CardContainer size="md" class="col-span-3 space-y-4">
            <div class="flex items-center space-x-4 pb-4 w-full border-b">
              <div class="flex-1 flex space-x-4 items-center">
                <span class="h-16 w-16 rounded">
                  <img
                    :src="myDeal.seller?.companyLogo"
                    :alt="myDeal.seller?.company"
                    class="w-full h-full rounded"
                  />
                </span>

                <div class="flex-1 truncate space-y-1.5">
                  <h2 class="text-2xl font-medium text-grey-500 truncate font">
                    {{ myDeal.trade?.type }}
                  </h2>

                  <div class="flex items-center space-x-1.5">
                    <h6 class="text-grey-400">Seller:</h6>
                    <p class="!text-primary-500">{{ myDeal.seller?.company }}</p>
                  </div>
                </div>
              </div>

              <div class="flex flex-col justify-between space-y-3">
                <h6 class="flex text-grey-500">Status</h6>
                <span
                  class="text-secondary-500 text-sm leading-5 bg-secondary-50 px-1.5 flex rounded-xl !w-fit h-fit py-0.5"
                >
                  {{ dealStatus }}
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
                  ${{ formatNumber(myDeal?.amount) }}
                </h6>

                <span class="text-sm text-grey-400 !leading-[160%]">
                  Interest rate:
                  {{ `${myDeal.interest_rate || 0}%` }}
                </span>

                <span class="text-sm text-grey-400 leading-[160%]">
                  Delivery Days:
                  {{
                    myDeal.payback_days > 1
                      ? `${myDeal.payback_days || ''} days`
                      : ` ${myDeal.payback_days || ''} day`
                  }}
                </span>
              </div>

              <div>
                <div
                  v-if="dealStatus == 'Pending'"
                  class="flex flex-col items-end justify-between space-y-3"
                >
                  <div class="flex items-center justify-center space-x-6 w-[80%] mx-auto pb-2">
                    <Button
                      text="Reject"
                      :hasBorder="true"
                      customClass="!py-3 !px-10 !bg-white !ring-error-500 !text-error-500 !font-medium !leading-[160%]"
                      @click="activeModal = 'reject-request'"
                    />

                    <Button
                      customClass="!py-4 !px-10 !text-white !font-medium !leading-[160%]"
                      class="btn-shadow"
                      text="Accept"
                      @click="activeModal = 'accept-request'"
                    />
                  </div>

                  <Button
                    text="Request inspection"
                    customClass="!text-warning-500 !ring-warning-500"
                    :hasBorder="true"
                    textSize="sm"
                    :hasIcon="true"
                    iconName="scan"
                    class="!py-3 !px-6"
                  />
                </div>

                <Button
                  v-else-if="myDeal.status == 'Approved'"
                  text="Fund request"
                  class="!font-medium !w-fit !py-3 !px-6 !text-sm"
                  @click="activeModal = 'fund-request'"
                />

                <Button
                  v-else-if="myDeal.status == 'Funded'"
                  text="Awaiting approval..."
                  customClass="!text-warning-500 !bg-warning-50 !ring-warning-500"
                  :hasBorder="true"
                  textSize="sm"
                  class="!py-3 !px-6"
                  :hasIcon="true"
                  iconName="scan"
                  :disabled="true"
                />

                <Button
                  v-else
                  :text="myDeal.status"
                  customClass="!text-primary-500 !bg-primary-50 !ring-primary-500"
                  :hasBorder="true"
                  textSize="sm"
                  class="!py-3 !px-6"
                  :disabled="true"
                />
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
  </div>
</template>

<script setup lang="ts">
  import { formatNumber } from '~/utils';

  const route = useRoute();
  const { $toast, $loading } = useNuxtApp();
  const { getRequest, updateRequest, acceptRequest, rejectRequest } = useRequestsApi();
  const isSendingRequest: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(false);

  const activeModal = ref('');
  const requestId: Ref<any> = ref('');

  const myDeal: any = ref({});
  const baseData = ref([{ id: '', title: '' }]);

  const closeModals = () => {
    activeModal.value = '';
  };

  const dealStatus = computed(() => myDeal.value.status);

  const getDeal = async () => {
    $loading().start();
    const id = route.params.id;
    const response = await getRequest(id);
    const { data, error } = response;
    $loading().stop();

    if (error) return $toast('show', { type: 'error', message: error?.message });

    $toast('show', { type: 'success', message: data.message || 'Deals retrieved successfully' });

    myDeal.value = data;
  };

  const acceptFundRequest = async () => {
    closeModals();
    isSendingRequest.value = true;
    const response = await acceptRequest(requestId.value);
    const { data, error } = response;
    isSendingRequest.value = false;

    if (error) return $toast('show', { type: 'error', message: error?.message });

    $toast('show', { type: 'success', message: data.message || 'Deals retrieved successfully' });
    getDeal();
  };

  const rejectFundRequest = async () => {
    closeModals();
    isSendingRequest.value = true;
    const response = await rejectRequest(requestId.value);
    const { data, error } = response;
    isSendingRequest.value = false;

    if (error) return $toast('show', { type: 'error', message: error?.message });

    $toast('show', { type: 'success', message: data.message || 'Deals retrieved successfully' });
    getDeal();
  };

  const refetchData = () => {
    closeModals();
    getDeal();
  };

  //
  onBeforeMount(async () => {
    loading.value = true;
    requestId.value = route.params?.id;
    await getDeal();
    loading.value = false;
  });
</script>
