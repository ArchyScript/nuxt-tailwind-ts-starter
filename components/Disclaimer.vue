<template>
    <CardContainer>
       
      <div class="flex bg-primary-50 py-2.5 px-2 space-x-3 rounded">
        <span class="py-0.5">
          <IconInfo class="text-primary-500" :width="21.5" :height="21.5" />
        </span>

        <div class="flex-1 space-y-0.5">
            <h5 class="text-sm text-primary-500 font-Montserrat">{{title}}</h5>

           
            <p class="text-xs text-grey-400 leading-[160%] flex-1">
                {{ detailText }}
            </p> 
        </div>
      </div>
    </CardContainer>
</template>

<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            default: ""
        }, 
        detailText: {
            type: String,
            default: ""
        }
    })

</script>