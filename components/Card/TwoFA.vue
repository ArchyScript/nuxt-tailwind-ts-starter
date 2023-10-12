<template>  
    <div class="space-y-4">
        <div 
            class="space-y-2 ring-[1.5px] rounded-lg ring-primary-500 py-6 !px-5"
        >
            <h5 class="text-grey-500 text-lg font-semibold">
                {{ details.title }}
            </h5>

            <div class="flex items-center space-x-5">
                <p class="flex-1 text-grey-400 leading-[160%]">
                    {{ details.description }}
                </p>

                <span class="pr-5 -pt-2">
                    <Toggle :value="details.isActivated" @toggle="handleToggle" />
                </span>
            </div>

            <div class="pt-2" v-if="details.isActivated">
                <div
                    class="flex bg-primary-50 items-center justify-between px-3.5 py-3 rounded-md space-x-3"
                >
                    <div class="flex items-center space-x-1.5 !text-success-400">
                        <IconCheckbox type="square" />

                        <span class="inline-block text-grey-400 text-xs leading-[160%]">
                            Added {{ details.createdAt }}
                        </span>
                    </div>

                    <div class="flex items-center space-x-1.5">
                        <span class="inline-block text-grey-400 text-xs font-semibold leading-[160%]">
                            Binded phone number:
                        </span>

                        <span class="text-grey-400 font-medium text-xs leading-[160%]">
                            {{ details.bindedNumber }}
                        </span>
                    </div>

                    <span class="flex text-xs text-primary-500 cursor-pointer font-medium leading-[160%]">
                        change
                    </span>
                </div>
            </div>
        </div>
    </div> 
</template>

<script setup lang="ts">   
  const emit = defineEmits(['toggle']);

  const props =  defineProps({ 
    details: {
        type: Object,
        default: {
            id: 'google-auth',
            title: 'Google Authenticator',
            description: 'Use the Google Authenticator app to generate one time security codes',  
            bindedNumber: '+23562023237239',
            createdAt: "June 24, 2021",
            isActivated: false,
        }
    }
  })

  const handleToggle = () => {
    const {isActivated, id} = props.details
    emit('toggle', {isActivated, id})
  }
  
</script>
