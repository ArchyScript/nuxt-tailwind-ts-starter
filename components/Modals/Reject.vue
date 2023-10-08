<template>
  <div class="flex flex-col justify-center items-center space-y-8 py-6 px-4">
    <h4 class="text-lg text-grey-500 text-center">
      {{ warning }}
    </h4>

    <div class="flex items-center justify-center space-x-1 flex-1 w-[80%]">
      <Button
        @click="close"
        text="cancel"
        customClass="!text-secondary-500 !py-4 !px-10 !bg-white !font-medium !leading-[160%]"
      />

      <Button
        @click="reject"
        text="Reject"
        customClass="!py-4 !px-10 !text-white !bg-error-500 !font-medium !leading-[160%] !max-w-fit"
        class="btn-shadow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    warning: {
      type: String,
      default: 'Are you sure ou want to reject this?',
    },
  });

  const emit = defineEmits(['close', 'reject']);
  const close = () => emit('close');
  const reject = () => emit('reject');
</script>

<style lang="scss" scoped>
  .btn-shadow {
    box-shadow: 0px 8px 24px 0px rgba(57, 145, 221, 0.25);
  }
</style>
