<template> 
    <div class="space-y-6" >
        <h6 class="text-sm font-medium text-grey-300 py-3 border-b-[1.5px] border-ui-bg">
            Setup Two factor verification to increase security
        </h6>

        <div class="space-y-4">
            <div
                v-for="twoFA in twoFAs"
                :key="twoFA.title"
                class="space-y-2 ring-[1.5px] rounded-lg ring-primary-500 py-6 !px-5"
            >
                <h5 class="text-grey-500 text-lg font-semibold">
                {{ twoFA.title }}
                </h5>

                <div class="flex items-center space-x-5">
                <p class="flex-1 text-grey-400 leading-[160%]">
                    {{ twoFA.description }}
                </p>

                <span class="pr-5 -pt-2">
                    <Toggle :value="toggleValue" @toggle="toggleValue = !toggleValue" />
                </span>
                </div>

                <div class="pt-2" v-if="toggleValue">
                    <div
                        class="flex bg-primary-50 items-center justify-between px-3.5 py-3 rounded-md space-x-3"
                    >
                        <div class="flex items-center space-x-1.5 !text-success-400">
                        <IconCheckbox type="square" />

                        <span class="inline-block text-grey-400 text-xs leading-[160%]">
                            Added June 24, 2021
                        </span>
                        </div>

                        <div class="flex items-center space-x-1.5">
                        <span class="inline-block text-grey-400 text-xs font-semibold leading-[160%]">
                            Binded phone number:
                        </span>

                        <span class="text-grey-400 font-medium text-xs leading-[160%]">
                            +562023237239
                        </span>
                        </div>

                        <span
                        @click="toggleValue = !toggleValue"
                        class="flex text-xs text-primary-500 cursor-pointer font-medium leading-[160%]"
                        >
                        change
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script setup lang="ts">  
  const loading = ref(false);
  const toggleValue = ref(false); 
  const emit = defineEmits(['done']);
 

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
    
</script>
