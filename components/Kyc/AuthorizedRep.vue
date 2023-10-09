<template>
  <div class="">  
    <div>  
      <Modal
        v-if="activeModal == 'liveness-verification'"
        id="liveness-verification"
        size="md"
        @close="closeModal"
      >
        <LivenessCheck @done="getSelfie" @close="closeModal" />
      </Modal>
    </div>
      
    <!--  -->
    <div class="space-y-8">           
        <h4 class="text-center text-grey-500 text-xl font-medium leading-6">
          Authorized representative / signatories details
        </h4> 

        <form class="space-y-4">
          <div class=" flex items-center space-x-4">
            <div class="flex-1">
              <label for="firstname" class="block mb-2 leading-6 text-grey-500">First Name</label>

              <div class="relative bg-input-bg w-full rounded">
                <span class="icon icon-left text-grey-300">
                  <IconUser />
                </span>

                <input
                  id="firstname"
                  type="text"
                  class="input-field !pl-12 pr-4"
                  placeholder="enter first name"
                  v-model.trim="kycPayload.first_name"
                />
              </div>
            </div>

            <div class="flex-1">
              <label for="lastname" class="block mb-2 leading-6 text-grey-500">Last Name</label>

              <div class="relative bg-input-bg w-full rounded">
                <span class="icon icon-left text-grey-300">
                  <IconUser />
                </span>

                <input
                  id="lastname"
                  type="text"
                  class="input-field !pl-12 pr-4"
                  placeholder="enter first name"
                  v-model.trim="kycPayload.last_name"
                />
              </div>
            </div>
          </div>

          <div >
            <label for="address" class="block mb-2 leading-6 text-grey-500">Address</label>

            <div class="relative bg-input-bg rounded">
              <span class="icon icon-left text-grey-300">
                <IconLocation />
              </span>

              <input
                type="text"
                id="address"
                class="input-field !pl-12 pr-4"
                placeholder="enter your permanent address"
                v-model="kycPayload.address"
              />
            </div>
          </div>

          <div class=" flex items-center space-x-4">
            <div class="flex-1">
              <label for="nationality" class="block mb-2 leading-6 text-grey-500">
                Nationality {{ nationalityISO2 }}
              </label>

              <div class="relative bg-input-bg w-full pl-8 rounded">
                <span class="icon icon-left text-grey-300">
                  <Avatar
                    :name="`${nationalityISO2}_16`"
                    :isSubFolder="true"
                    subfolderPath="flags"
                  />
                </span>

                <el-select
                  v-model="kycPayload.nationality"
                  class="p-1 !bg-transparent !focus:text-black !w-full"
                  placeholder="Select Country"
                  size="large"
                  remote
                  filterable
                  remote-show-suffix
                  default-first-option
                  :loading="isFilteringCountry"
                  :remote-method="handleCountrySearch"
                  loading-text="Loading Countries"
                  no-match-text="No country match... check spelling"
                  no-data-text="No match"
                >
                  <!-- reserve-keyword  -->
                  <el-option
                    v-for="country in countries"
                    :key="country.name"
                    :label="country.name"
                    :value="country.name"
                    :name="country.value"
                    @click="getCountryCode(country)"
                  />
                </el-select>
              </div>
            </div>

            <div class="flex-1">
              <label for="phone_number" class="block mb-2 leading-6 text-grey-500">
                Phone Number
              </label>

              <el-input
                v-model="kycPayload.phone_number"
                placeholder="90 734 573 07"
                type="tel"
                class="input-with-select bg-input-bg h-[3rem]"
              >
                <template #prepend>
                  <div class="flex space-x-1 items-center">
                    <Avatar
                      :name="`${nationalityISO2}_16`"
                      :isSubFolder="true"
                      subfolderPath="flags"
                    />

                    <p class="text-grey-600 text-sm leading-5">{{ countryPhoneCode }}</p>
                  </div>
                </template>
              </el-input>
            </div>
          </div> 
           
 
          <div class="w-1/2">
            <label class="block mb-2 leading-6 text-grey-500">Email Address</label>

            <div class="relative bg-input-bg rounded">
              <span class="icon icon-left text-grey-200">
                <IconEmail />
              </span>

              <input
                id="email"
                class="input-field !px-12"
                type="email"
                readonly
                placeholder="example@gmail.com"
                :value="kycPayload.email"
                :class="{
                  error: v$.email.$error || v$.email.$dirty,
                  success: !v$.email.$dirty,
                }"
              />
              <span
                class="icon icon-right"
                v-if="!v$.email.$dirty"
                :class="!v$.email.$dirty && 'text-success-500'"
              >
                <IconCheckbox type="square" />
              </span> 
            </div> 
          </div>  

          <div >
            <label class="block mb-2 leading-6 text-grey-500">
              Does the authorized representative hold a power of attorney?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="kycPayload.power_of_attorney" class="!w-full">
                <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4">Yes</el-radio>
                <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group>
            </div>
          </div>

          <div >
            <label class="block mb-2 leading-6 text-grey-500">
              Is the authorized representative/signatory considered a politically exposed
              person(PEP)?
            </label>

            <div class="w-3/5 flex items-center space-x-4">
              <el-radio-group v-model="kycPayload.pep" class="!w-full">
                <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4">Yes</el-radio>
                <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group>
            </div>
          </div>

          <div >
            <h4 class="block mb-2 leading-6 text-grey-500">
              Upload International passport of authorized representative
            </h4>

            <div class="w-3/5">
              <Upload
                uploadId="international_passport"
                :modelValue="kycPayload.international_passport"
                @uploaded="onUploaded"
              />
            </div>
          </div>

          <div >
            <label class="block mb-2 leading-6 text-grey-500">
              Click on the button below to verify liveness
            </label>

            <div class="flex items-center space-x-4">
              <Button
                text="Verify liveness"
                @click="openModal('liveness-verification')"
                :hasIcon="true"
                iconName="camera"
                class="!w-auto !px-8 !bg-secondary-500 "
              />

              <div v-if="kycPayload.selfie" class="flex-1 text-success-500 capitalize">
                Verified
              </div>
            </div>
          </div>
        </form>

        <!--  -->
        <div class="flex justify-end items-center space-x-4"> 
          <Button
            text="Continue"
            class="!w-auto !px-8 flex-end"
            @click="nextStep"
          />
        </div>
    </div>
  </div>
</template>


<script setup lang="ts">
  definePageMeta({ layout: 'auth' });

  const emit = defineEmits(["done"])

  import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import { useConstantsStore } from '~/store/constants';
  import { useAuthStore } from '~/store/authentication';

  const { $toast } = useNuxtApp();
  const router = useRouter(); 
  const { authenticatedUser, setKYCData } = useAuthStore();

  const activeModal: Ref<string> = ref(''); 
  const isFilteringCountry: Ref<boolean> = ref(false); 
  const countries = ref([]); 
  const countryPhoneCode = ref('');
  const nationalityISO2 = ref('');
  const kycPayload: Ref<any> = ref({
    first_name: '',
    last_name: '',
    address: '',
    nationality: '',
    email: '',
    phone_number: '', 
    power_of_attorney: '',
    pep: '',
    international_passport: '',
    selfie: '', 
  });

  // computed
  const authUser = computed(() => authenticatedUser?.profile);
  const allCountries = computed(() => useConstantsStore().countries);

  //  watch
  watch(kycPayload, (newValue) => {setKYCData(newValue)},
    { deep: true },
  );  

  // rules
  const rules = {
    first_name: { required },
    last_name: { required },
    address: { required },
    nationality: { required },
    email: { required },
    power_of_attorney: { required },
    pep: { required },
    international_passport: { required },
    selfie: { required },
  }; 

  //  validation
  const v$ = useVuelidate(rules, kycPayload.value);

  // functions
  const closeModal = () => (activeModal.value = ''); 
  const openModal = (active_modal: string) => activeModal.value = active_modal;  
  const onUploaded = ({ image_url }: any) =>  kycPayload.value.international_passport = image_url 
  const getCountryCode = (selectedCountry: any) => {
    countryPhoneCode.value = selectedCountry.phone_code; 
    nationalityISO2.value = selectedCountry.iso2.toLowerCase();
  }; 

  const nextStep = async () => {
    const isFormValidated = true 
    if (!isFormValidated) return $toast('show', { type: 'error', message: "Some fields are not validated" }); 

    emit('done')
  };
   
  const handleCountrySearch = (query: string) => {
    if (query) {
      isFilteringCountry.value = true;
      setTimeout(() => {
        isFilteringCountry.value = false;
        countries.value = allCountries.value.filter((country: any) => {
          return country.name.toLowerCase().includes(query.toLowerCase());
        });
      }, 50);
    } else {
      countries.value = allCountries.value;
    }
  };
  
  const retoreSession = async () => {
    const kycInStorage = localStorage.getItem('kycData');
    if (!kycInStorage) return (kycPayload.value.email = authUser.value?.email);

    const deserializedData = JSON.parse(kycInStorage);

    if (Object.keys(deserializedData).length > 0) {
      kycPayload.value = deserializedData;
      if (authUser.value?.email) kycPayload.value.email = authUser.value.email; 
      allCountries.value.forEach((country: any) => { 
        if (country.name == kycPayload.value.nationality) {
          countryPhoneCode.value = country.phone_code;
          nationalityISO2.value = country.iso2.toLowerCase();
        } 
      });
    } else {
      setKYCData(kycPayload.value);
      if (authUser.value?.email) kycPayload.value.email = authUser.value?.email;
    }
  };

  // lifecycle 
  onBeforeMount(async () => {
    countries.value = allCountries.value;
    retoreSession();
  });
</script>

<style scoped>
  .input-field {
    @apply w-full flex-1 bg-transparent rounded leading-5 block text-sm py-3.5 outline-0 border-0 ring-0  focus:border-0 focus:ring-0 focus:outline-0;
  }
  .input-field.error {
    @apply border border-error-500 text-red-500;
  }
  .input-field.success {
    @apply border border-success-500 bg-success-50;
  }

  .icon {
    @apply absolute top-0 h-full rounded-tl rounded-bl bg-transparent flex justify-center items-center px-[1.125rem];
  }

  .icon.icon-left {
    @apply rounded-tl rounded-bl left-0;
  }

  .icon.icon-right {
    @apply rounded-tr rounded-br right-0 cursor-pointer;
  }
</style>