<template> 
    <section class="w-2/3 space-y-6 items-center">
      <CardContainer class="!p-5 rounded-md !pr-8 space-y-4 w-full">
        <div class="flex items-center !bg-primary-50 rounded-md">
          <h6
            v-for="(tab, index) in tabs"
            :key="`${tab.id}_${index}`"
            class="text-sm flex-1 text-center capitalize select-none font-medium px-6 py-3 rounded-md cursor-pointer"
            :class="
              activeTabId == tab.id
                ? '!bg-primary-500 !text-white'
                : '!text-primary-500 !bg-primary-50'
            "
            @click="toggleActiveTab(tab.id)"
          >
            {{ tab.title }}
          </h6>
        </div>
 
        <!--  -->
        <AccountSecurityResetPassword v-if="activeTabId == 'reset-password'" />
        <AccountSecurityTwoFA v-else /> 
      </CardContainer>
    </section> 
</template>

<script setup lang="ts">   
  const activeTabId = ref('reset-password');  
  const tabs = ref([
    { title: 'Reset password', id: 'reset-password' },
    { title: '2-Factor Authentication', id: '2fa' },
  ]);

  const twoFAs = ref([
    {
      id: 'google-auth',
      title: 'Google Authenticator',
      description: 'Use the Google Authenticator app to generate one time security codes',
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Use the Google Authenticator app to generate one time security codes',
    },
    {
      id: 'text-message',
      title: 'Text message (SMS) ',
      description: 'Use the Google Authenticator app to generate one time security codes',
    },
    {
      id: 'security-key',
      title: 'Security key',
      description: 'Use the Google Authenticator app to generate one time security codes',
    },
  ]);

  //
  const toggleActiveTab = (tabId: string) => {
    activeTabId.value = tabId;
  }; 
</script>
