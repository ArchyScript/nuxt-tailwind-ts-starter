<template>
  <div class="overflow-y-auto no-scrollbar overflow-x-hidden py-6 flex flex-col flex-grow">
    <div class="py-2">
      <div class="mb-8 px-4">
        <Brandname type="white" />
      </div>

      <div class="flex items-center space-x-2 py-1 px-4">
        <div class="-mt-1 w-11 h-11">
          <img
            v-if="financierImageUrl"
            :src="financierImageUrl"
            :alt="financierFullname"
            class="h-full w-full border border-warning-500 rounded-full"
          />

          <div
            v-else
            class="h-full w-full text-sm font-semibold bg-white text-warning-500 border border-warning-500 rounded-full flex justify-center items-center"
          >
            {{ financierFullnameInitials }}
          </div>
        </div>

        <div class="flex-1">
          <h5 class="text-warning-50 font-medium mb-0.5">{{ "financierFullname" }}</h5>
          <h6 class="leading-5 text-sm text-warning-500">{{ "financierUserRole"   }}</h6>
        </div>
      </div>
    </div>

    <!-- Main menu -->
    <div class="border-b border-secondary-800 py-6">
      <h6 class="text-sm font-light tracking-wide text-grey-200 px-4 mb-2 py-2">Main menu</h6>

      <div class="flex flex-col space-y-3">
        <nuxt-link v-for="link in mainMenu" :key="link.route" :to="link.route">
          <div
            class="flex items-center space-x-2 rounded-md font-Poppins text-grey-200 py-2.5 px-4"
            :class="tabIsActive(link.route) ? 'bg-warning-500 text-white' : ' hover:bg-grey-300'"
          >
            <IconSidebar :title="link.icon" />

            <span>{{ link.title }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>

    <!-- Preferences -->
    <div class="py-6">
      <h6 class="text-sm font-light tracking-wide text-grey-200 px-4 mb-2 py-2">Preferences</h6>

      <div class="flex flex-col space-y-3">
        <nuxt-link v-for="preference in preferences" :key="preference.route" :to="preference.route">
          <div
            class="flex items-center space-x-2 rounded-md font-Poppins text-grey-200 py-2.5 px-4"
            :class="tabIsActive(preference.route) && 'bg-warning-500 text-warning-50 '"
          >
            <IconSidebar :title="preference.icon" />
            <span>{{ preference.title }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { getUserProfile } = useKYCApi();
  
  const mainMenu = ref([
    {
      title: 'Dashboards',
      route: '/dashboards',
      icon: 'dashboard',
    }, 
    {
      title: 'Inspections',
      route: '/inspections',
      icon: 'inspections',
    },
    {
      title: 'Activity logs',
      route: '/activity-logs',
      icon: 'activity-logs',
    },
  ]);

  const preferences = ref([
    {
      title: 'Account',
      route: '/account',
      icon: 'profile',
    },
  ]);

  const activeTab = ref('/dashboards');
  const authUser: Ref<any> = ref({});
  const financierFullname = computed(() => {
    return `${authUser.value?.kyc?.first_name || ''} ${authUser.value?.kyc?.last_name || ''}`;
  });
  const financierFullnameInitials = computed(() => {
    return `${authUser.value?.kyc?.first_name[0]?.toUpperCase() || ''}
    ${authUser.value?.kyc?.last_name[0]?.toUpperCase() || ''}`;
  });
  const financierImageUrl = computed(() => authUser.value?.kyc?.selfie);
  const financierUserRole = computed(() => authUser.value?.profile?.userRole);

  const tabIsActive = (tabRoute: string) => {
    const mainName = tabRoute;
    const route = useRoute();

    if (mainName == 'base' && route.path == '/') {
      return true;
    } else if (mainName != 'base' && route.path.includes(mainName)) {
      return true;
    }

    return false;
  };

  const fetchAuthUser = async () => {
    const response = await getUserProfile();
    const { data, error } = response;
    if (error) return;
    authUser.value = data;
  };

  onBeforeMount(() => fetchAuthUser());
</script>
