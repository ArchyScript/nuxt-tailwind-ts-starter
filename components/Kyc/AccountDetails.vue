<template>
    <div class="space-y-8">  
        <h4 class="text-center text-grey-500 text-xl font-medium leading-6">
        Account Details
        </h4>

        <form class="mt-8 space-y-4">
          <div class=" flex items-center space-x-4">
             <div class="flex-1">
                <label for="accountNumber" class="block mb-1 text-sm leading-6 text-grey-500">
                    Account number
                </label>

                <div class="relative bg-input-bg w-full rounded">
                    <input
                        id="accountNumber"
                        type="text"
                        class="input-field px-3"
                        placeholder="enter account number"
                        v-model.trim="kycPayload.first_name"
                    />
                </div>
            </div>
            
            <div class="flex-1">
                <label for="accountNumber" class="block mb-1 text-sm leading-6 text-grey-500">
                    Account number
                </label>

                <div class="relative bg-input-bg w-full rounded">
                    <input
                    id="accountNumber"
                    type="text"
                    class="input-field px-3"
                    placeholder="enter account number"
                        v-model.trim="kycPayload.first_name"
                    />
                </div>
            </div> 
          </div> 

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
        </form>

        
        <div class="flex justify-between items-center space-x-4 mt-8" >
          <Button
            text="Back"
            class="!w-auto !px-8"
            :hasBorder="true"
            @click="goBack"
          />

          <Button
            text="Submit KYC"
            class="!w-auto !px-8 flex-end !text-white"
            @click="submitKYC"
          />
        </div>
    </div>
</template>


<script setup lang="ts">
  definePageMeta({ layout: 'auth' });

  import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators';
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
    first_name: '',
    last_name: '',
    address: '',
    nationality: '',
    email: '', 
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