import { defineStore } from 'pinia';
import { countries as allCountries } from '../utils/constants';

export const useConstantsStore = defineStore('constantsStore', () => {
  // state
  const countries: Ref<any> = ref(allCountries);

  return {
    countries,
  };
});
