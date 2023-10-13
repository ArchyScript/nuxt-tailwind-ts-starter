<template>
  <div class="bg-white rounded box-shadow p-8 w-[49.375rem] mx-auto">
    <div class="text-sm p-1 space-y-8">
      <div class="flex-col space-y-8">
        <p class="text-center text-grey-400 leading-6">
          Hi, {{ kycPayload.email }}! Take some minutes to setup your account,
          kindly complete KYC information below to enable you Fund offers on our
          marketplace.
        </p>

        <div class="w-4/5 !mx-auto">
          <el-steps
            :active="activeStep"
            finish-status="pending"
            class="!w-full !mx-auto"
          >
            <el-step />
            <el-step />
            <el-step />
          </el-steps>
        </div>
      </div>

      <KycAuthorizedRep v-if="activeStep == 1" @done="activeStep++" />
      <KycInspectionAgencies
        v-else-if="activeStep == 2"
        @done="activeStep++"
        @back="activeStep--"
      />
      <KycAccountDetails
        v-else="activeStep == 3"
        @back="activeStep--"
        @done="goToDashboards"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ layout: "auth" })
  import { useAuthStore } from "~/store/authentication"

  const router = useRouter()
  const { setKYCData } = useAuthStore()

  const activeStep: Ref<number> = ref(1)
  const kycPayload: Ref<any> = ref({
    first_name: "",
    last_name: "",
    address: "",
    nationality: "",
    email: "",
    power_of_attorney: "",
    pep: "",
    international_passport: "",
    selfie: "",
    phone_number: "",
    passport_number: "",

    company_name: "",
    company_reg_number: "",
    company_country: "",
    company_address: "",
    aml_appropriate_regulation: "",
    appropriate_prudential_supervision: "",
    certificate_of_incorporation: "",

    company_account_number: "",
    company_account_name: "",
    company_bank: "",
    service_charge: "",

    recaptchaToken: "true",
  })

  // functions
  const goToDashboards = () => {
    localStorage.removeItem("kycData")
    router.push("/dashboards")
  }
  const retoreSession = async () => {
    const kycInStorage = localStorage.getItem("kycData")
    if (!kycInStorage) return setKYCData(kycPayload.value)
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
