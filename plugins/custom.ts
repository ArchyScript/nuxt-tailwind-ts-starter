import { useCustomStore } from '~/store/custom';
import { ToastObjectType } from '../types/custom';

export default defineNuxtPlugin(() => { 
  const toast = (action: string, params: ToastObjectType) => {
    const { getToastObjectValues } = useCustomStore();

    const { message, duration, title, type } = params;
    const toastDuration = duration ? duration : 1500;

    const toastObject = {
      message,
      title,
      type,
      duration: toastDuration,
    };

    return getToastObjectValues(action, toastObject);
  };

  const loading = () => {
    const { startLoading, stopLoading } = useCustomStore();
    const start = () => startLoading();  
    const stop = () => stopLoading();

    return {
      start,
      stop, 
    };
  };
  //
  return {
    provide: {
      toast,
      loading,
    },
  };
});
