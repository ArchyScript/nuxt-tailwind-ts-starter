<template> 
      <div class=" w-[480px] flex bg-primary-50 py-4 px-6 space-x-4 rounded absolute right-0 top-16">
        <span class="py-0.5">
          <IconInfo class="text-primary-500" :width="24" :height="24" />
        </span>

        <div class="relative"> 
            <div class="flex-1 space-y-1 pr-14">
                <h5 class="text-primary-500 font-Poppins">{{title}}</h5> 
            
                <p class="text-sm text-grey-400 leading-[160%] font-Poppins flex-1">
                    {{ detailText }}
                </p> 
            </div>
            
            <span class="px-0.5 cursor-pointer absolute top-0 right-0" @click="close">
                <IconClose :height="12" :width="12" />
            </span>
        </div>

      </div> 
</template>

<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            default: "Inspection in progress"
        }, 
        detailText: {
            type: String,
            default: "This should carry a detailed description of the inspection that will be carried out."
        }
    })

    const emit = defineEmits(["close"])

    const close = () => emit('close');

</script>