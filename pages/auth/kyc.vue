<template>
  <div>
    <div> 
      <!-- Modals here -->
      <Modal
        v-if="activeModal == 'kyc-verification'"
        size="sm"
        id="kyc-registeration"
        @close="closeModal"
      >
        <ModalsProcessing v-if="isVerifyingKYC" message="Verifying KYC..." />

        <template v-else>
          <ModalsResponse
            v-if="failedVerificationMessage"
            type="error"
            titleText="KYC Verification Failed"
            :message="failedVerificationMessage"
            btnContinueText="Try again"
            @next="startKycVerification"
            @close="closeModal"
          />

          <ModalsResponse
            v-else
            :message="successVerificationMessage"
            :hasTitle="false"
            @next="gotoDashboard"
          />
        </template>
      </Modal> 
    </div>

    <div class="bg-white rounded box-shadow p-8 w-[49.375rem] mx-auto">
      <div class="text-sm p-1 space-y-8">
        <div class="flex-col space-y-8">
          <p class="text-center text-grey-400 leading-6">
            Hi, {{ kycPayload.email }}! Take some minutes to setup your account, kindly complete KYC
            information below to enable you Fund offers on our marketplace.
          </p>

          <div class="w-4/5 !mx-auto  ">
            <el-steps :active="activeStep" finish-status="pending" class="!w-full  !mx-auto  ">
              <el-step />
              <el-step />
              <el-step />
            </el-steps>
          </div> 
        </div>
 
        <KycAuthorizedRep v-if="activeStep == 1" @done="activeStep++" />
        <KycInspectionAgencies v-else-if="activeStep == 2"  @done="activeStep++" @back="activeStep--"/>
        <KycAccountDetails v-else="activeStep == 3"  @back="activeStep--" /> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ layout: 'auth' });

  import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import { useConstantsStore } from '~/store/constants';
  import { useAuthStore } from '~/store/authentication';

  const { $toast } = useNuxtApp();
  const router = useRouter();
  const { verifyKYC } = useKYCApi();
  const { authenticatedUser, setKYCData } = useAuthStore();

  const activeModal: Ref<string> = ref('');
  const failedVerificationMessage: Ref<any> = ref(null);
  const successVerificationMessage: Ref<any> = ref(null);
  const isVerifyingKYC: Ref<boolean> = ref(false);
  const showLivenessCheck: Ref<boolean> = ref(false);
  const activeStep: Ref<number> = ref(1);
  const isFilteringCountry: Ref<boolean> = ref(false);
  const isUploading: Ref<boolean> = ref(false);
  const countries = ref([]);
  const fileToBeUploaded = ref('');
  const customerCountryCode = ref('');
  const customerNationalityISO2 = ref('');
  const companyCountryISO2 = ref('');
  const kycPayload: Ref<any> = ref({
    first_name: '',
    last_name: '',
    address: '',
    nationality: '',
    email: '',
    phone_number: '',
    min_amount: '',
    max_amount: '',
    power_of_attorney: '',
    pep: '',
    international_passport: '',
    selfie: '',
    payback_days: '',
    interest_rate: 0,
    company_name: '',
    company_reg_number: '',
    company_country: '',
    company_address: '',
    company_financial_intermediary: '',
    aml_appropriate_regulation: '',
    appropriate_prudential_supervision: '',
    investigated_for_money_laundering: '',
    director_passport: '',
    passport_number: '',
    recaptchaToken: 'true',
  });

  // computed
  const authUser = computed(() => authenticatedUser?.profile);
  const allCountries = computed(() => useConstantsStore().countries);

  //  watch
  watch(
    kycPayload,
    (newValue) => {
      setKYCData(newValue);
    },
    { deep: true },
  );  

  // rules
  const authourizedRepRules = {
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
  const finiancialInstistutionRules = computed(() => {
    return {
      first_name: { required },
      last_name: { required },
      address: { required },
      nationality: { required },
      email: { required, email },
      power_of_attorney: { required },
      pep: { required },
      international_passport: { required },
      selfie: { required },
    };
  });

  //  validation
  const vRep$ = useVuelidate(authourizedRepRules, kycPayload.value);
  const finInst$ = useVuelidate(finiancialInstistutionRules, kycPayload.value);

  // functions
  const closeModal = () => (activeModal.value = '');
  const toggleLivenessCheck = () => (showLivenessCheck.value = !showLivenessCheck.value);
  const getCountryCode = (selectedCountry: any, user: string) => {
    customerCountryCode.value = selectedCountry.phone_code;

    if (user == 'customer') customerNationalityISO2.value = selectedCountry.iso2.toLowerCase();
    if (user == 'company') companyCountryISO2.value = selectedCountry.iso2.toLowerCase();
  };
  const onUploaded = ({ image_url, uploadId }: any) => {
    if (uploadId == 'international_passport')
      return (kycPayload.value.international_passport = image_url);
    if (uploadId == 'director_passport') return (kycPayload.value.director_passport = image_url);
  };

  const openModal = (active_modal: string) => {
    activeModal.value = active_modal;
    if (active_modal == 'kyc-verification') {
      isVerifyingKYC.value = true;
    }
  };
  const nextStep = async () => {
    if (activeStep.value < 1) return (activeStep.value = 1);

    startKycVerification();
  };
  const startKycVerification = async () => {
    openModal('kyc-verification');

    const response = await verifyKYC(kycPayload.value);
    const { data, error } = response;

    if (error) return handleError(error.message);
    return handleSuccessfulVerification(
      data?.message ||
        `Your KYC information is being reviewed by some of our experts, we will notify you about its progress shortly.`,
    );
  };
  const getSelfie = (image_url: any) => {
    if (!image_url)
      return $toast('show', { type: 'error', message: `Something happened... Try again.` });

    kycPayload.value.selfie = image_url;
    closeModal();
  };
  const handleError = (message: string) => {
    isVerifyingKYC.value = false;
    failedVerificationMessage.value = message;
  };
  const handleSuccessfulVerification = (message: string) => {
    isVerifyingKYC.value = false;
    failedVerificationMessage.value = null;
    successVerificationMessage.value = message;
  };
  const gotoDashboard = () => {
    localStorage.removeItem('kycData');
    router.push('/dashboards');
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
      // get country code
      allCountries.value.forEach((country: any) => {
        // for customer
        if (country.name == kycPayload.value.nationality) {
          customerCountryCode.value = country.phone_code;
          customerNationalityISO2.value = country.iso2.toLowerCase();
        }
        // for company
        if (country.name == kycPayload.value.company_country) {
          companyCountryISO2.value = country.iso2.toLowerCase();
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
