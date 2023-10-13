<template>
  <div
    v-show="showToast"
    class="z-50 fixed top-2 right-2 w-80 p-4 rounded-sm"
    :class="`bg-${updatedTypeWithColorMatch}-50`"
  >
    <!-- class="z-50 fixed top-0 -right-0.5 w-[35.375rem] py-4 px-6 rounded-l-md border-[1.5px]" -->
    <!-- <div class="flex space-x-4 pr-16 relative">
      <span class="p-0.5" :class="`!text-${updatedTypeWithColorMatch}-500`"> 
        <IconCheckbox
          v-if="updatedTypeWithColorMatch == 'success'"
          :height="24"
          :width="24"
        />
 
        <span
          v-else-if="updatedTypeWithColorMatch == 'error'"
          class="w-6 h-6 bg-error-500 text-error-50 flex justify-center items-center rounded-full"
        >
          <IconClose :height="14" :width="14" />
        </span>

        <IconInfo :height="24" :width="24" v-else />
      </span>
 
      <div class="space-y-0.5">
        <h6
          class="font-Poppins font-medium"
          :class="`!text-${updatedTypeWithColorMatch}-500`"
        >
          Password Changed successfully
        </h6>

        <p class="text-sm font-Poppins text-grey-500 leading-[160%]">
          You can now login to your account with your new password
        </p>
      </div>

      <span
        class="absolute text-grey-300 p-1 rounded-tr-md cursor-pointer top-0 right-0"
        @click="close"
      >
        <IconClose :height="12" :width="12" />
      </span>
    </div> -->

    <p :class="`text-${updatedTypeWithColorMatch}-500 mt-2`">
      {{ message }}
    </p>

    <div
      :class="`absolute top-0 left-0 w-full h-1 bg-${updatedTypeWithColorMatch}-500`"
      :style="{ width: `${progressBarWidth}%` }"
    ></div>

    <span class="absolute cursor-pointer top-0 right-0 p-2.5" @click="hide">
      <IconClose :height="12" :width="12" />
    </span>
  </div>
</template>

<script setup lang="ts">
  import { useCustomStore } from "~/store/custom"
  const { toastObject, hideToast } = useCustomStore()

  const progressBarWidth: Ref<number> = ref(0)

  //
  const message = computed(() => useCustomStore().toastObject?.message)
  const type = computed(() => useCustomStore().toastObject?.type)
  const duration = computed(() => useCustomStore().toastObject?.duration)
  const showToast = computed(() => {
    if (useCustomStore().showToast) startCountdown()
    // return value regardless
    return useCustomStore().showToast
  })

  const updatedTypeWithColorMatch = computed(() => {
    if (type.value == "info") return "secondary"
    return type.value
  })

  //
  const startCountdown = () => {
    const timer = 10
    let remainder = duration.value / timer

    const countdownInterval = setInterval(() => {
      // get the percentage for every count down
      progressBarWidth.value = (remainder / (duration.value / timer)) * 100
      remainder--

      if (remainder < 0) clearInterval(countdownInterval)
    }, timer)
  }

  const hide = () => {
    hideToast()
  }
</script>

<style scoped></style>
