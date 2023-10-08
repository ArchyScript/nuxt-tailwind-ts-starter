<template>
  <div class="space-y-4">
    <!-- header -->
    <section class="flex items-center w-fit border-b-4 border-grey-50 space-x-4">
      <h6
        v-for="(tab, index) in tabs"
        :key="`${tab.id}_${index}`"
        class="text-grey-700 text-sm capitalize select-none font-medium px-6 py-3 cursor-pointer"
        :class="
          activeTabId == tab.id
            ? 'border-b-4 -mb-1 border-primary-500 !text-primary-500'
            : '!text-grey-300'
        "
        @click="toggleActiveTab(tab.id)"
      >
        {{ tab.title }}
      </h6>
    </section>

    <!--  -->
    <section> 
      <div v-show="activeTabId == 'profile'"><AccountProfile /></div>
      <div v-show="activeTabId == 'security'"><AccountSecurity /></div>
      <!-- <div v-show="activeTabId == 'bank-information'"><AccountBankInformation /></div> --> 
    </section>
  </div>
</template>

<script setup lang="ts">
  const { $toast, $loading } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();

  const activeTabId = ref('profile');

  const tabs = ref([
    { title: 'Profile', id: 'profile' },
    { title: 'Security', id: 'security' },
    // {title: "KYC Verification",  id: "kyc"},
    // { title: 'Bank Information', id: 'bank-information' },
  ]);

  const toggleActiveTab = (tabId: string) => {
    activeTabId.value = tabId;
  };
 
  onBeforeMount(() => {
    $loading().stop(); 
  });
</script>
