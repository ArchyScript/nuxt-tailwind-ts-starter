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
            placeholder="Search"
            @input="filterDeals"
          />
        </div>

        <div class="flex !h-[3.125rem] bg-secondary-50 !w-fit items-center space-x-4 rounded-lg border px-4">
          <IconFilter />
          <span class="text-grey-600 text-sm leading-5">Filter</span> 
        </div>
      </div>
    </section>

    <!--  --> 
    <div v-if="loading"></div>

    <div v-else>
      <section class="grid w-full grid-cols-3 gap-y-8 gap-x-5" v-if="inspections.length">
        <CardInspection v-for="inspection in inspections" :key="inspection.id" :inspection="inspection" />
      </section>

      <div v-else class="col-span-2 flex items-center justify-center">
        <NoData
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
const {$loading} = useNuxtApp()
  const { getRequests } = useRequestsApi();

  const searchText = ref('');
  const inspections = ref([
        {
          _id: 'e67rtghfg',
          imageUrl: '',
          product: "TEST 1", 
          financier: 'script', 
       }, 
        {
          _id: 'erts67dsdghfg',
          imageUrl: '',
          product: "TEST 1", 
          financier: 'scrireerpt', 
       },  
        {
          _id: 'ert98ghfg',
          imageUrl: '',
          product: "TEST 1", 
          financier: 'script', 
       }, 
        {
          _id: 'er567tsdsdghfg',
          imageUrl: '',
          product: "TEST 1", 
          financier: 'scrireerpt', 
       }, 
        {
          _id: '3232',
          imageUrl: '',
          product: "TEST 1", 
          financier: 'script', 
       }, 
        {
          _id: 'ertg2hfg',
          imageUrl: '',
          product: "TEST 1", 
          financier: 'script', 
       }, 
        {
          _id: 'ertsd87sdghfg',
          imageUrl: '',
          product: "TEST 1", 
          financier: 'scrireerpt', 
       }, 
        {
          _id: '3434343343',
          imageUrl: '',
          product: "TEST 1", 
          financier: 'script', 
       }, 
  ]);
  const loading: Ref<boolean> = ref(false);
 
 onBeforeMount(() => {
  $loading().stop();
 })

</script>
