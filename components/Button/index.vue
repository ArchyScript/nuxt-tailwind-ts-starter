<template>
  <button
    :type="type"
    :class="`${hasBorder && 'hasBorder'} ${isGray && 'isGray'} ${
      loading && 'loading'
    } ${disabled && 'disabled'} ${customClass}`"
    :disabled="disabled"
    @click="clickBtn"
  >
    <IconSpinner type="dotted" v-if="loading" class="animate-spin" />

    <div v-else>
      {{ text }}
    </div>
  </button>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "button",
    },
    routeLink: {
      type: String,
      default: "",
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
      default: "",
    },
    textSize: {
      type: String,
      default: "sm",
    },
    customClass: {
      type: String,
      default: "",
    },
  })

  //
  const router = useRouter()

  // emits
  const emit = defineEmits(["click"])
  const clickBtn = () => {
    if (props.disabled || props.loading) return
    if (props.routeLink && props.routeLink.length > 0)
      return router.push(props.routeLink)

    emit("click")
  }
</script>

<style lang="scss" scoped>
  button {
    @apply flex items-center justify-center text-center;

    &.hasBorder {
      @apply ring-1 bg-transparent;
    }

    &.disabled {
      @apply ring-0  cursor-not-allowed;
    }

    &.loading {
      @apply cursor-not-allowed;
    }
  }
</style>
