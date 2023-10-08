<template>
  <div class="flex flex-col space-y-6">
    <h4 size="lg" class="text-lg text-black !font-semibold">Delete my account</h4>

    <div class="space-y-4">
      <h6 class="text-sm text-grey-500">Deleting your account will:</h6>

      <div class="flex bg-primary-50 py-2.5 px-2 space-x-3 rounded">
        <span class="py-0.5">
          <IconInfo class="text-primary-500" :width="21.5" :height="21.5" />
        </span>

        <div class="flex-1 space-y-0.5">
          <p class="text-sm text-grey-500 font-Montserrat">Deleting your account will:</p>

          <div
            v-for="warning in warnings"
            :key="warning.text"
            class="flex items-center space-x-2.5 pl-1.5"
          >
            <span class="h-1 w-1 bg-grey-500 rounded-full"></span>

            <p class="text-xs text-grey-400 leading-[160%] flex-1">
              {{ warning.text }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center space-x-1">
      <Button
        text="Cancel"
        customClass="!text-grey-400 !py-4 !px-11 !bg-transparent !font-medium !leading-[160%] !flex-1"
        @click="close"
      />

      <Button
        text="Delete account"
        customClass="!text-error-500 !bg-error-50  !py-4 !px-11 !font-medium !leading-[160%] !flex-1"
        @click="deleteAccount"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    warnings: {
      type: Array,
      default: [],
    },
  });

  // const deleteWarnings = ref([
  //   { text: 'Delete your account info and transaction history' } ,
  //   { text: 'Delete you from all VesselTrust activities' } ,
  //   { text: 'Cancel all ongoing trades and contract.' } ,
  // ])

  const emit = defineEmits(['close', 'deleteAcount']);
  const close = () => emit('close');
  const deleteAccount = () => emit('deleteAcount');
</script>

<style lang="scss" scoped>
  .btn-shadow {
    box-shadow: 0px 8px 24px 0px rgba(57, 145, 221, 0.25);
  }
</style>
