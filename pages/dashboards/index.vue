<template>
  <div> 
    <div class="space-y-6"> 
      <section class="flex justify-between items-center">
        <h4 class="flex-1 text-[1.125rem] font-semibold font-Poppins text-grey-500">
          Hi,
        <span class="text-secondary-600">{{ financierFullname  }}</span>
          👋🏻
        </h4>

        <span>
          <Button
            text="View inspection request"
            class="!font-medium !py-3.5 !px-6 !text-sm"
            @click="activeModal = 'fund-offer'"
          />
        </span>
      </section>

      <!-- card -->
      <section class="grid w-full grid-cols-4 gap-5">
        <CardLeaderboard title="Total inspected trades" :amount="inspectedDeals" :isIncrease="true" />
        <CardLeaderboard title="ongoing trades" :amount="ongoingDeals" :isIncrease="false" />
        <CardLeaderboard title="closed trades" :amount="closedDeals.length" :isIncrease="false" />
        <CardLeaderboard title="New request" :amount="newRequests" :isIncrease="false" />
      </section>

      <!-- chart and trades section -->
      <section class="grid w-full grid-cols-5 gap-x-4">
        <!-- chart -->
        <div class="col-span-3">
          <CardContainer class="space-y-8 px-8 py-6 flex-col">
            <div class="flex justify-between items-center">
              <h6 class="text-sm text-grey-500">Revenue</h6>

              <span class="text-sm text-center cursor-pointer border px-4 py-1.5 rounded">
                2021
              </span>
            </div>

            <!-- chart -->
            <div class="flex items-center justify-center flex-grow">
              <div v-if="hasChart" class="flex-grow">
                <ChartsLine :chartData="temperatureChartData" :chartOptions="chartOptions" />
              </div>

              <NoData v-else />
            </div>

            <div class="flex justify-between items-center">
              <p class="text-sm leading-5 text-grey-600 cursor-pointer flex-1">
                Here is the CSV file you can download
              </p>

              <span>
                <Button
                  text="Download CSV"
                  iconName="download"
                  :hasIcon="true"
                  :isIconPrefixed="false"
                  class="!font-normal !py-1.5 !px-4 !bg-secondary-300 !text-xs"
                  @click="activeModal = 'fund-offer'"
                />
              </span>
            </div>
          </CardContainer>
        </div>

        <!-- recent trades -->
        <div class="col-span-2">
          <CardContainer class="space-y-5 px-8 py-6 flex-col">
            <div class="flex justify-between items-center">
              <h6 class="text-sm text-grey-600">Recent requests</h6>
              <span class="flex text-sm leading-5 cursor-pointer text-secondary-500">see all</span>
            </div>

            <div class="space-y-4 pb-6">
              <div class="flex justify-between items-center">
                <h6 class="text-sm font-medium cursor-pointer text-grey-200">Financier Name</h6>
                <span class="text-sm leading-5 cursor-pointer text-grey-200">Price</span>
              </div>

              <!-- trade list -->
              <div>
                <div
                  v-if="recentTrades.length "
                  class="flex-col max-h-[25rem] overflow-scroll no-scrollbar"
                >
                  <CardTrade v-for="trade in recentTrades" :key="trade.id" :trade="trade" />
                </div>

                <div v-else class="flex items-center justify-center">
                  <NoData  title="No new request"/>
                </div>
              </div>
            </div>
          </CardContainer>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '~/store/authentication';

  const { $toast, $loading } = useNuxtApp();
  const { dashbaordStats } = useRequestsApi();
  const { authenticatedUser, logout, getAuthenticatedUser } = useAuthStore();

  const authUser: any = computed(() => authenticatedUser);
  const financierFullname = computed(
    () => `${authenticatedUser?.kyc?.first_name} ${authenticatedUser?.kyc?.last_name}`,
  );

  const activeModal = ref('');

  const hasChart = ref(false);
  const closedDeals = ref([]);
  const inspectedDeals = ref(0);
  const ongoingDeals = ref(0);
  const newRequests = ref(0);

  const recentTrades = ref([
    {
      id: '1',
      imageUrl: '~/public/images/img-1.png',
      isVerified: true,
      title: 'BLCO',
      amount: 1000074300,
      status: 'cancelled',
    },
  ]);

  const closeModals = () => {
    activeModal.value = '';
  };

  const fetchDashboardData = async () => {
    // $loading().start();
    // const response = await dashbaordStats();
    // const { data, error } = response;
    $loading().stop();

    // if (error) return $toast('show', { type: 'error', message: error?.message });

    // closedDeals.value = data?.data?.closedDeals;
    // inspectedDeals.value = data?.data?.inspectedDeals;
    // ongoingDeals.value = data?.data?.ongoingDeals;
    // newRequests.value = data?.data?.newRequests;
  };

  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill?: boolean;
    }[];
  }

  const temperatureChartData = ref<ChartData>({
    labels: ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30'],
    datasets: [
      {
        label: 'Temperature',
        data: [25, 28, 30, 27, 26, 29],
        borderColor: 'blue',
        fill: false,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  onBeforeMount(async () => { 
    fetchDashboardData(); 
  });
</script>
