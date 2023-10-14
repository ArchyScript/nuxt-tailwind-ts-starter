<template>
  <div
    class="fixed top-0 left-0 !w-screen !h-screen overflow-auto flex flex-col bg-grey-500 bg-opacity-30 !z-50 overflow-auto pt-16 pb-24 items-center"
    @click="closeModal"
  >
    <transition name="modal-fade">
      <CardContainer
        :size="hasTitle ? 'sm' : 'lg'"
        class="relative top-0 modal h-auto w-full !z-50 bg-white box-shadow modal-fade"
        :style="`width: ${modalSizes} !important;`"
      >
        <span
          v-if="!hasTitle"
          class="absolute bg-primary-50 p-4 rounded-tr-md cursor-pointer top-0 right-0"
          @click="close"
        >
          <IconClose />
        </span>

        <div v-else class="flex items-center justify-between mb-5">
          <h5
            class="font-medium leading-5 text-grey-400 capitalize select-none"
          >
            {{ title }}
          </h5>

          <span class="px-0.5 cursor-pointer" @click="close">
            <IconClose :height="12" :width="12" />
          </span>
        </div>

        <!--  -->
        <slot />
      </CardContainer>
    </transition>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    hasTitle: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "md",
    },
    centered: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(["close"])
  const modalSizes = computed(() => {
    if (props.size == "xs") return "18.75rem"
    if (props.size == "sm") return "29.25rem"
    if (props.size == "md") return "31.25rem"
    if (props.size == "mdlg") return "36.5rem"
    if (props.size == "lg") return "44rem"
    if (props.size == "xl") return "71.25rem"
    else props.size
  })

  const close = () => emit("close", props.id)

  window.addEventListener("keyup", (e) => {
    if (e.key == "Escape") return close()
  })
</script>

<style lang="scss" scoped>
  .box-shadow {
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.04);
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 3s;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }
</style>
