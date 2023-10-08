<template>
  <div class="flex flex-col justify-center items-center space-y-8 py-6 px-4">
    <h4 customClass="text-lg text-grey-500  text-center">
      {{ confirmationMessage }}
    </h4>

    <div class="flex items-center justify-center space-x-1 flex-1 w-[80%]">
      <Button
        @click="close"
        text="cancel"
        customClass="!text-secondary-500 !py-4 !px-10 !bg-white !font-medium !leading-[160%]"
      />

      <Button
        @click="confirm"
        :text="btnText"
        :customClass="`!py-4 !px-10 !text-white !font-medium !leading-[160%] !max-w-fit ${
          isDanger && '!bg-error-500'
        }`"
        class="btn-shadow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    confirmationMessage: {
      type: String,
      default: 'Are you sure ou want to confirm this?',
    },
    btnText: {
      type: String,
      default: 'Confirm',
    },
    isDanger: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['close', 'confirm']);
  const close = () => emit('close');
  const confirm = () => emit('confirm');
</script>

<style lang="scss" scoped>
  .btn-shadow {
    box-shadow: 0px 8px 24px 0px rgba(57, 145, 221, 0.25);
  }
</style>
