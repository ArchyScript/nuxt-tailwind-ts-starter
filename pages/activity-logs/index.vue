<template>
  <div class="space-y-8">
    <!-- header -->
    <section class="flex justify-between items-center ">
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
            placeholder="Search..."
          />
        </div>

        <div class="flex !h-[3.125rem] !w-fit items-center space-x-4 rounded-lg bg-primary-50 border px-4">
          <IconFilter />
          <span class="inline text-grey-600 text-sm leading-5">Filter</span>
        </div>
      </div>

      <div class="flex"> 
        <Button
            text="Export"
            iconName="export"
            :hasIcon="true" 
            :hasBorder="true"
            class="font-normal !py-3.5 !px-6 text-sm" 
        /> 
      </div>
    </section>

    <!-- logs -->
    <section>
    <!-- <div v-if="loading"></div> -->
 
      <div v-if="activityLogs.length">
        <!-- <UploadCustom/>  -->
        
        <CardContainer size="auto" customClass="space-y-4">
          <table class="table-auto w-full">
            <thead class="bg-ui-bg">
              <tr>
                <td class="border-[1px] border-input-bg bg-transaprent">
                  <h5
                    class="flex justify-center items-center text-grey-700 capitalize leading-5 text-sm font-medium px-6 py-3"
                  >
                    Date
                  </h5>
                </td>
                <td class="border-[1px] border-input-bg bg-transaprent">
                  <h5
                    class="flex justify-center items-center text-grey-700 capitalize leading-5 text-sm font-medium px-6 py-3"
                  >
                    IP address
                  </h5>
                </td>
                <td class="border-[1px] border-input-bg bg-transaprent">
                  <h5
                    class="flex justify-center items-center text-grey-700 capitalize leading-5 text-sm font-medium px-6 py-3"
                  >
                    Type
                  </h5>
                </td>
                <td class="border-[1px] border-input-bg bg-transaprent">
                  <h5
                    class="flex justify-center items-center text-grey-700 capitalize leading-5 text-sm font-medium px-6 py-3"
                  >
                    Description
                  </h5>
                </td>
                <td class="border-[1px] border-input-bg bg-transaprent">
                  <h5
                    class="flex justify-center items-center text-grey-700 capitalize leading-5 text-sm font-medium px-6 py-3"
                  >
                    Status
                  </h5>
                </td>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr
                v-for="log in activityLogs"
                :key="log.id"
                class="hover:bg-ui-bg hover:bg-opacity-30 cursor-pointer"
              >
                <td class="border-[1px] border-input-bg">
                  <span
                    class="text-sm text-grey-500 capitalize flex items-center justify-center leading-5 px-6 py-4"
                  >
                    {{ log.date }}
                  </span>
                </td>
                <td class="border-[1px] border-input-bg">
                  <span
                    class="text-sm text-grey-500 capitalize flex items-center justify-center leading-5 px-6 py-4"
                  >
                    {{ log.ip }}
                  </span>
                </td>
                <td class="border-[1px] border-input-bg">
                  <span
                    class="text-sm text-grey-500 capitalize flex items-center justify-center leading-5 px-6 py-4"
                  >
                    {{ log.type }}
                  </span>
                </td>
                <td class="border-[1px] border-input-bg">
                  <span
                    class="text-sm text-grey-500 capitalize flex items-center justify-center leading-5 px-6 py-4"
                  >
                    {{ log.description }}
                  </span>
                </td>
                <td class="border-[1px] border-input-bg">
                  <span
                    class="text-sm flex justify-center items-center px-6 py-4 capitalize"
                    :class="`
                      ${log.status == 'completed' && '!text-success-500'} 
                      ${log.status == 'updated' && '!text-secondary-500'} 
                      ${log.status == 'failed' && '!text-error-500 italic'}
                    `"
                  >
                    {{ log.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContainer>
      </div>

    <div v-else class=" flex items-center justify-center">
        <NoData
          class="col-span-2"  
          title="No activities available"
          :hasDetailsText="true"
          detailText="all your activities will be displayed here "
          routeLink="/dashboards"
        />
      </div> 
    </section>
  </div>
</template>

<script setup lang="ts">
  const { $toast, $loading } = useNuxtApp();
  const searchText = ref('');

  const activityLogs = ref([
    {
      id: '12131',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'completed',
    },
    {
      id: '2',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'updated',
    },
    {
      id: '132',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'updated',
    },
    {
      id: '121',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'completed',
    },
    {
      id: '142',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'failed',
    },
    {
      id: '11',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'failed',
    },
    {
      id: '1',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'updated',
    }, 
  ]);

  const fetchActivityLogs = () => {
    $loading().stop(); 
  }

  onBeforeMount(() => {
    fetchActivityLogs()
  })
</script>
