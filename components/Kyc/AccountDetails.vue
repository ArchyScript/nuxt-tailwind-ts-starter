<template>
  <div>
    <div>
      <Modal
        v-if="activeModal == 'kyc-verification'"
        :size="isVerifyingKYC || failedVerificationMessage ? 'sm' : 'mdlg'"
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
            titleText="KYC Verification complete"
            message="Your KYC information is being reviewed by some of our experts, we will notify you about its progress shortly."
            btnContinueText="Continue to dashboard"
            @next="done"
          />
        </template>
      </Modal>
    </div>

    <div class="space-y-8">
      <h4 class="text-center text-grey-500 text-xl font-medium leading-[160%]">
        Account Details
      </h4>

      <form class="space-y-4">
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <label
              for="company_account_number"
              class="block mb-1 text-sm leading-[160%] text-grey-500"
            >
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
            <label
              for="company_bank"
              class="block mb-1 text-sm leading-[160%] text-grey-500"
            >
              Bank
            </label>

            <div class="relative bg-input-bg w-full rounded">
              <input
                id="company_bank"
                type="text"
                class="input-field px-3"
                placeholder="enter preferred bank"
                v-model.trim="kycPayload.company_bank"
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

        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <label
              for="company_account_name"
              class="block mb-1 text-sm leading-[160%] text-grey-500"
            >
              Account name
            </label>

            <div class="relative bg-input-bg w-full rounded">
              <input
                id="company_account_name"
                type="text"
                class="input-field px-3"
                placeholder="enter account name"
                v-model.trim="kycPayload.company_account_name"
              />
            </div>
          </div>

          <div class="flex-1">
            <label
              for="service_charge"
              class="flex items-center space-x-1.5 mb-1"
            >
              <span class="text-grey-500 text-sm leading-[160%]">
                Service charges
              </span>

              <IconInfo :height="18" :width="18" class="text-grey-200" />
            </label>

            <div
              class="flex space-x-2 items-center bg-input-bg w-full rounded px-3"
            >
              <span
                class="flex text-sm font-semibold text-grey-300 leading-[160%]"
              >
                $
              </span>

              <input
                id="service_charge"
                type="text"
                class="input-field"
                placeholder="enter service charge"
                v-model.trim="kycPayload.service_charge"
              />
            </div>
          </div>
        </div>
      </form>

      <div class="flex justify-between items-center space-x-4">
        <Button
          text="Back"
          class="!w-auto !px-8"
          :disabled="isVerifyingKYC"
          :hasBorder="true"
          @click="goBack"
        />

        <Button
          text="Submit KYC"
          type="submit"
          :loading="isVerifyingKYC"
          class="!w-auto !px-8 flex-end !text-white"
          @click="startKycVerification"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ layout: "auth" })

  import { useVuelidate } from "@vuelidate/core"
  import { useAuthStore } from "~/store/authentication"

  const { $toast } = useNuxtApp()
  const router = useRouter()
  const { verifyKYC } = useKYCApi()
  const { setKYCData } = useAuthStore()

  const emit = defineEmits(["back", "done"])

  const activeModal: Ref<string> = ref("")
  const failedVerificationMessage: Ref<any> = ref(null)
  const isVerifyingKYC: Ref<boolean> = ref(false)
  const kycPayload: Ref<any> = ref({})

  //  watch
  watch(
    kycPayload,
    (newValue) => {
      setKYCData(newValue)
    },
    { deep: true }
  )

  // function
  const closeModal = () => (activeModal.value = "")
  const goBack = async () => emit("back")
  const done = async () => emit("done")
  const openModal = (active_modal: string) => {
    activeModal.value = active_modal
    if (active_modal == "kyc-verification") isVerifyingKYC.value = true
  }
  const handleError = (message: string) => {
    isVerifyingKYC.value = false
    failedVerificationMessage.value = message
  }
  const handleSuccessfulVerification = () => {
    isVerifyingKYC.value = false
    failedVerificationMessage.value = null
  }
  const startKycVerification = async () => {
    openModal("kyc-verification")

    const response = await verifyKYC(kycPayload.value)
    const { data, error } = response

    if (error) return handleError(error.message)
    handleSuccessfulVerification()
  }

  const retoreSession = async () => {
    const kycInStorage = localStorage.getItem("kycData")
    if (!kycInStorage) return

    const deserializedData = JSON.parse(kycInStorage)
    if (Object.keys(deserializedData).length > 0) {
      return (kycPayload.value = deserializedData)
    }
  }

  // lifecycle
  onBeforeMount(async () => {
    retoreSession()
  })
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
