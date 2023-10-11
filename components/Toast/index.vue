<template>
  <div
    v-show="showToast"
    :class="`z-50 fixed top-2 right-2 w-80 p-4 rounded-sm bg-warning-50`"
  >
    <!-- message -->
    <p :class="`text-${updatedTypeWithColorMatch}-500 mt-2`">
      {{ message }}
    </p>

    <!-- progress bar -->
    <div
      :class="`absolute top-0 left-0 w-full h-1 bg-${updatedTypeWithColorMatch}-500`"
      :style="{ width: `${progressBarWidth}%` }"
    ></div>

    <!-- close btn -->
    <span class="absolute cursor-pointer top-0 right-0 p-2.5" @click="hide">
      <IconClose :height="12" :width="12" />
    </span>
  </div>
</template>

<script setup lang="ts">
  import { useCustomStore } from '~/store/custom';
  const { toastObject, hideToast } = useCustomStore();

  const progressBarWidth: Ref<number> = ref(0);

  //
  const message = computed(() => useCustomStore().toastObject?.message);
  const type = computed(() => useCustomStore().toastObject?.type);
  const duration = computed(() => useCustomStore().toastObject?.duration);
  const showToast = computed(() => {
    if (useCustomStore().showToast) startCountdown();
    // return value regardless
    return useCustomStore().showToast;
  });

  const updatedTypeWithColorMatch = computed(() => {
    if (type.value == 'info') return 'secondary'; 
    return type.value;
  });

  //
  const startCountdown = () => {
    const timer = 10;
    let remainder = duration.value / timer;

    const countdownInterval = setInterval(() => {
      // get the percentage for every count down
      progressBarWidth.value = (remainder / (duration.value / timer)) * 100;
      remainder--;

      if (remainder < 0) clearInterval(countdownInterval);
    }, timer);
  };

  const hide = () => {
    hideToast();
  };
</script>

<style scoped></style>
