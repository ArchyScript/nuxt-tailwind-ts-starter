import { defineStore } from 'pinia';
import { ToastObjectType } from '~/types/custom';

export const useCustomStore = defineStore('customStore', () => {
  // state
  const toastObject: Ref<ToastObjectType> = ref({});
  const showToast: Ref<boolean> = ref(false);
  const isLoading: Ref<boolean> = ref(true);

  // actions
  const getToastObjectValues = (action: string, toastObjectValues: ToastObjectType) => {
    showToast.value = action == 'show' ? true : false;
    toastObject.value = toastObjectValues;

    setTimeout(() => {
      showToast.value = false;
    }, toastObjectValues.duration);
  };

  const hideToast = () => {
    showToast.value = false;
  };

  const startLoading = () => (isLoading.value = true);
  const stopLoading = () => (isLoading.value = false);

  return {
    showToast,
    toastObject,
    getToastObjectValues,
    hideToast,
    isLoading,
    stopLoading,
    startLoading,
  };
});
