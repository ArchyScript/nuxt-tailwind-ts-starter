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
      <section class="grid w-full grid-cols-2 gap-y-8 gap-x-5" v-if="inspections.length >= 1">
        <CardDeal v-for="inspection in inspections" :key="inspection.id" :data="inspection" />
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
  const inspections = ref([
        {
          id: 'ertghfg',
          imageUrl: '',
          title: 'test ne',
          seller: 'script',
          requestAmount: 0,
          interestRate: 0,
          deliveryDays: '43', 
       }, 
        {
          id: 'ertsdsdghfg',
          imageUrl: '',
          title: 'test ne',
          seller: 'scrireerpt',
          requestAmount: 0,
          interestRate: 0,
          deliveryDays: '43', 
       }, 
        {
          id: '3434343',
          imageUrl: '',
          title: 'test ne',
          seller: 'script',
          requestAmount: 0,
          interestRate: 0,
          deliveryDays: '43', 
       }, 
  ]);
  const loading: Ref<boolean> = ref(false);
 

</script>
