<template>
  <div
    class="flex flex-col justify-center items-center space-y-6 px-4"
    :class="hasTitle ? 'py-8' : 'py-10'"
  >
    <div>
      <IconBigCheckbox
        type="circle-outline"
        :width="innerWidth"
        :height="innerHeight"
        v-if="type == 'success'"
        class="text-success-500"
      />

      <IconBigCheckbox
        type="circle-outline-cancel"
        :width="innerWidth"
        :height="innerHeight"
        v-if="type == 'error'"
        class="text-error-500"
      />
    </div>

    <div
      class="flex flex-col justify-center items-center"
      :class="hasTitle ? 'space-y-1' : 'space-y-6'"
    >
      <h3 class="text-xl text-grey-500 font-semibold text-center" v-if="hasTitle">
        {{ titleText }}
      </h3>

      <p :class="!hasTitle && 'text-lg'" class="text-grey-500 font-normal text-center">
        {{ message }}
      </p>
    </div>

    <div class="flex items-center justify-center space-x-1 flex-1 w-[80%]">
      <Button
        @click="close"
        :text="btnCloseText"
        v-if="type == 'error'"
        customClass="!text-secondary-500 !py-4 !px-10  !bg-white !font-medium !leading-[160%]"
      />

      <Button
        @click="next"
        :text="btnContinueText"
        customClass="!py-4 !px-10 !text-white !font-medium !leading-[160%] !max-w-fit"
        class="btn-shadow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'success',
    },
    btnContinueText: {
      type: String,
      default: 'Continue',
    },
    btnCloseText: {
      type: String,
      default: 'cancel',
    },
    iconWidth: {
      type: Number,
      default: 65,
    },
    iconHeight: {
      type: Number,
      default: 65,
    },
    isSuccess: {
      type: Boolean,
      default: true,
    },
    hasTitle: {
      type: Boolean,
      default: true,
    },
    titleText: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['close', 'next']);
  const close = () => emit('close');
  const next = () => emit('next');
</script>

<style lang="scss" scoped>
  .btn-shadow {
    box-shadow: 0px 8px 24px 0px rgba(57, 145, 221, 0.25);
  }
</style>
