<template>
  <button
    :type="type"
    :class="`${hasBorder && 'hasBorder'} ${isGray && 'isGray'} ${loading && 'loading'} ${
      disabled && 'disabled'
    } ${customClass}`"
    :disabled="disabled"
    @click="clickBtn"
  >
    <!-- :class="{ hasBorder: hasBorder, isGray: isGray }"  -->
    <IconSpinner type="dotted" v-if="loading" class="animate-spin" />

    <span v-else class="flex justify-center items-center space-x-2">
      <span v-if="hasIcon" :class="!isIconPrefixed && 'order-2 inline-flex justify-center items-center pl-2'">
        <IconTrash v-if="iconName == 'trash'" />
        <IconCamera v-if="iconName == 'camera'" />
        <IconScan v-if="iconName == 'scan'" />
        <IconEmail v-if="iconName == 'email'" />
        <IconDownload v-if="iconName == 'download'" />
        <IconExport v-if="iconName == 'export'" />
        <IconUpload uploadType="paper" v-if="iconName == 'paper-upload'" />
        <IconFile v-if="iconName == 'file'"/>  
      </span>

      <span class="select-none" :class="`text-${textSize} `">
        {{ text }}
      </span>
    </span>
  </button>  
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'button',
    },
    routeLink: {
      type: String,
      default: '',
    },
    hasBorder: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isGray: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isIconPrefixed: {
      type: Boolean,
      default: true,
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      default: '',
    },
    textSize: {
      type: String,
      default: 'sm',
    },
    customClass: {
      type: String,
      default: '',
    },
  });

  //
  const router = useRouter();

  // emits
  const emit = defineEmits(['click']);
  const clickBtn = () => {
    if (props.disabled || props.loading) return;
    if (props.routeLink && props.routeLink.length > 0) return router.push(props.routeLink);

    emit('click');
  };
</script>

<style lang="scss" scoped>
  button {
    @apply flex items-center justify-center text-center max-h-[3.125rem] w-full bg-primary-500 cursor-pointer text-white px-3 py-4 rounded leading-6 text-sm font-medium font-Poppins;

    &.hasBorder {
      @apply ring-1 bg-transparent text-primary-500 ring-primary-500;
    }

    &.disabled {
      @apply bg-grey-50   ring-0 text-grey-200 cursor-not-allowed;
    }

    &.loading {
      @apply cursor-not-allowed;
    } 
  }
</style>
