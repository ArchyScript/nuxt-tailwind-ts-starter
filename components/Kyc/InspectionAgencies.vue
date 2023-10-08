<template>
    <div class="space-y-8">   
        
          <h4 class="text-center text-grey-500 text-xl font-medium leading-6">
            Inspection Agency details
          </h4>
          

        <form class="mt-8 space-y-4">
          <div class="flex items-center space-x-4">
            <div class="flex-1">
              <label for="company_name" class="block mb-2 leading-6 text-grey-500">
                Company name on the commercial register
              </label>

              <div class="relative bg-input-bg w-full rounded">
                <input
                  id="company_name"
                  type="text"
                  class="input-field px-4"
                  placeholder="Company name"
                  v-model="kycPayload.company_name"
                />
              </div>
            </div>

            <div class="flex-1">
              <label for="reg_number" class="block mb-2 leading-6 text-grey-500">
                Company registration number
              </label>

              <div class="relative bg-input-bg w-full rounded">
                <input
                  id="reg_number"
                  type="text"
                  class="input-field px-4"
                  placeholder="Registration number"
                  v-model="kycPayload.company_reg_number"
                />
              </div>
            </div>
          </div>
 
          <div>
            <label for="address" class="block mb-2 leading-6 text-grey-500">
              Domicile address of the company on the commercial register
            </label>

            <div class="relative bg-input-bg rounded">
              <span class="icon icon-left text-grey-300">
                <IconLocation />
              </span>

              <input
                id="domicile_address"
                v-model="kycPayload.company_address"
                class="input-field !pl-12 pr-4"
                type="text"
                placeholder="enter your company Domicile address"
              />
            </div>
          </div>

          <div>
            <label class="block mb-2 leading-6 text-grey-500">
              Is the company considered a financial intermediary?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="kycPayload.company_financial_intermediary" class="!w-full">
                <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4">Yes</el-radio>
                <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group>
            </div>
          </div>

          <div>
            <label class="block mb-2 leading-6 text-grey-500">
              IIs the company subject to appropriate regulation with respect to combating money
              laundering?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="kycPayload.aml_appropriate_regulation" class="!w-full">
                <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4">Yes</el-radio>
                <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group>
            </div>
          </div> 

          <div>
            <label class="block mb-2 leading-6 text-grey-500">Upload Director`s passport</label>

            <div class="w-3/5">
              <Upload
                uploadId="director_passport"
                :modelValue="kycPayload.director_passport"
                @uploaded="onUploaded"
              />
            </div>
          </div>
        </form>
        
        <div class="flex justify-between items-center space-x-4 mt-8" >
          <Button
            text="Back"
            class="!w-auto !px-8"
            :hasBorder="true"
            @click="goBack"
          />

          <Button
            text="Continue"
            class="!w-auto !px-8 flex-end !text-white"
            @click="nextStep"
          />
        </div>
    </div>
</template>


<script setup lang="ts">
  definePageMeta({ layout: 'auth' });
 
  import { useAuthStore } from '~/store/authentication';

  const { $toast } = useNuxtApp(); 
  const { verifyKYC } = useKYCApi();
  const { authenticatedUser, setKYCData } = useAuthStore();
 
  const emit = defineEmits(["done", "back"])

  const kycPayload: Ref<any> = ref({ 
    company_name: '',
    company_reg_number: '', 
    company_address: '',
    company_financial_intermediary: '',
    aml_appropriate_regulation: '', 
    director_passport: '', 
  });

  // computed
  const authUser = computed(() => authenticatedUser?.profile); 

  //  watch
  watch(kycPayload, (newValue) => {setKYCData(newValue)},
    { deep: true },
  ); 

  // rules here

  //  validation  here

  // functions   
  const onUploaded = ({ image_url }: any) => (kycPayload.value.director_passport = image_url);
  const goBack = async () =>  emit("back")
  const nextStep = async () => {
    const isFormValidated = true 
    if (!isFormValidated) return $toast('show', { type: 'error', message: "Some fields are not validated" }); 

    emit('done')
  };
  
  const retoreSession = async () => {
    const kycInStorage = localStorage.getItem('kycData');
    if (!kycInStorage) return  $toast('show', { type: 'success', message: "KYC data retrieved" }); 

    const deserializedData = JSON.parse(kycInStorage);

    if (Object.keys(deserializedData).length > 0) return kycPayload.value = deserializedData;  
    return setKYCData(kycPayload.value); 
  };

  // lifecycle 
  onBeforeMount(async () => retoreSession());
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