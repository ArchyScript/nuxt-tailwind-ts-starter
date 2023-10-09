<template>
  <div class="space-y-8">  
    <h4 class="text-center text-grey-500 text-xl font-medium  leading-[160%]">
      Account Details
    </h4>

    <form class="space-y-4">
      <div class=" flex items-center space-x-4">
        <div class="flex-1">
          <label for="company_account_number" class="block mb-1 text-sm  leading-[160%] text-grey-500">
            Company account number
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <input
              id="company_account_number"
              type="text"
              class="input-field px-3"
              placeholder="enter account number"
              v-model.trim="kycPayload.company_account_number"
            />
          </div>
        </div>
        
        <div class="flex-1">
          <label for="bank" class="block mb-1 text-sm  leading-[160%] text-grey-500">
            Bank
          </label> 

          <div class="relative bg-input-bg w-full rounded">
            <input
              id="bank"
              type="text"
              class="input-field px-3"
              placeholder="enter preferred bank"
              v-model.trim="kycPayload.bank"
            />
          </div>
           
          <!-- <div class="relative bg-input-bg w-full rounded">
            <el-select
              v-model="payload.fiat.bankAccountId"
              class="p-1 !bg-white !border !border-grey-50 rounded-md !focus:text-black !w-full"
              placeholder="Select bank account"
              size="large"
              remote
              filterable
              remote-show-suffix
              default-first-option
              :loading="isFilteringBankAccounts"
              :remote-method="handleBankAccountSearch"
              loading-text="Loading bank accounts"
              no-match-text="No bank matched... check spelling"
              no-data-text="No match"
            >
              <el-option
                v-for="bankAccount in bankAccounts"
                :key="bankAccount.accountId"
                :label="`${bankAccount?.account_name} - ${bankAccount?.account_number} (${bankAccount?.bank_name})`"
                :value="bankAccount.accountId"
                @click="handleBankSelect(bankAccount)"
              >
                <div
                  class="flex items-center space-x-2 truncate"
                  :title="`${bankAccount?.account_name} - ${bankAccount?.account_number} (${bankAccount?.bank_name})`"
                >
                  <h6 class="text-sm text-grey-500 font-medium uppercase truncate">
                    {{ bankAccount?.account_name }} -
                  </h6>

                  <p class="text-sm text-grey-500 leading-[160%] truncate">
                    {{ bankAccount?.account_number }} ( {{ bankAccount?.bank_name }} )
                  </p>
                </div>
              </el-option>
            </el-select>
          </div> -->
        </div> 
      </div>  
      
      <div class=" flex items-center space-x-4">
        <div class="flex-1">
          <label for="account_name" class="block mb-1 text-sm  leading-[160%] text-grey-500">
            Account name
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <input
              id="account_name"
              type="text"
              class="input-field px-3"
              placeholder="enter account name"
              v-model.trim="kycPayload.account_name"
            />
          </div>
        </div>
        
        <div class="flex-1">
          <label for="service_charges" class="flex items-center space-x-1.5 mb-1 ">
            <span class="text-grey-500 text-sm leading-[160%]">Service charges</span>

            <IconInfo :height="18" :width="18" class="text-grey-200"/>
          </label>

          <div class="flex space-x-2 items-center bg-input-bg w-full rounded  px-3">
            <span class="flex text-sm font-semibold text-grey-300 leading-[160%]">$</span>

            <input
              id="service_charges"
              type="text"
              class="input-field"
              placeholder="enter service charge"
              v-model.trim="kycPayload.service_charges"
            />
          </div>
        </div>
      </div>  
    </form>

    
    <div class="flex justify-between items-center space-x-4" >
      <Button
        text="Back"
        class="!w-auto !px-8"
        :disabled="isVerifyingKYC"
        :hasBorder="true"
        @click="goBack"
      />

      <Button
        text="Submit KYC"
        :loading="isVerifyingKYC"
        class="!w-auto !px-8 flex-end !text-white"
        @click="submitKYC"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
  definePageMeta({ layout: 'auth' }) 

  import { useVuelidate } from '@vuelidate/core'; 
  import { useAuthStore } from '~/store/authentication';

  const { $toast } = useNuxtApp();
  const router = useRouter();
  const { verifyKYC } = useKYCApi();
  const { authenticatedUser, setKYCData } = useAuthStore();

  const emit = defineEmits(["back"])

  const activeModal: Ref<string> = ref('');
  const failedVerificationMessage: Ref<any> = ref(null);
  const successVerificationMessage: Ref<any> = ref(null);
  const isVerifyingKYC: Ref<boolean> = ref(false); 

  const kycPayload: Ref<any> = ref({
    company_account_number: '',
    bank: '',
    account_name: '',
    service_charges: '', 
  });

  // computed
  const authUser = computed(() => authenticatedUser?.profile); 

  //  watch 
  watch(kycPayload, (newValue) => {setKYCData(newValue)},
    { deep: true },
  );  

    // function
  const goBack = async () =>  emit("back")
    const submitKYC = () => {
        console.log('submit kyc')
    } 

  const retoreSession = async () => {
    const kycInStorage = localStorage.getItem('kycData');
    if (!kycInStorage) return  $toast('show', { type: 'success', message: "KYC data retrieved" }); 
    const deserializedData = JSON.parse(kycInStorage);
    if (Object.keys(deserializedData).length > 0) return kycPayload.value = deserializedData;  
    return setKYCData(kycPayload.value); 
  };

  // lifecycle 
  onBeforeMount(async () => { 
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