<template>
  <div class="space-y-8">
    <!-- header -->
    <section class="flex justify-between items-center">
      <div class="flex items-center space-x-6">
        <div class="relative rounded border">
          <!-- Icons  -->
          <div class="absolute bottom-[0.875rem] left-[0.875rem]">
            <IconSearch />
          </div>
          <input
            id="search-box"
            v-model="searchText"
            type="text"
            name="search-box"
            class="h-[3.125rem] !w-full rounded border-none bg-[#FCFCFE] px-12 text-base outline-none placeholder:text-[#656e83]"
            placeholder="Search campaigns..."
            @input="filterDeals"
          />
        </div>

        <div class="flex !h-[3.125rem] !w-fit items-center space-x-4 rounded-lg border px-4">
          <IconFilter />
          <span class="text-grey-600 text-sm leading-5">Filter</span> 
        </div>
      </div>
    </section>

    <!--  --> 
    <div v-if="loading"></div>

    <div v-else>
      <section class="grid w-full grid-cols-2 gap-y-8 gap-x-5" v-if="myDeals.length">
        <CardDeal v-for="deal in myDeals" :key="deal.id" :data="deal" />
      </section>

      <div v-else class="col-span-2 flex items-center justify-center">
        <GenericNoData
          class="col-span-2"
          :hasBtn="true"
          btnText="View marketplace"
          title="No Deals available"
          detailText="You haven`t started a deal or have any request from a Buyer "
          routeLink="/dashboards"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $toast, $loading } = useNuxtApp();
  const { getRequests } = useRequestsApi();

  const searchText = ref('');
  const myDeals = ref([]);
  const loading: Ref<boolean> = ref(false);

  const filterDeals = () => {
    console.log("filter func")
  };

  const getDeals = async () => {
    loading.value = true;
    $loading().start();
    const response = await getRequests();
    const { data, error } = response;
    loading.value = false;
    $loading().stop();

    if (error) return $toast('show', { type: 'error', message: error?.message });

    $toast('show', { type: 'success', message: data.message || 'Deals retrieved successfully' });

    myDeals.value = data.fund_requests;
  };

  //
  onBeforeMount(() => getDeals());
</script>
