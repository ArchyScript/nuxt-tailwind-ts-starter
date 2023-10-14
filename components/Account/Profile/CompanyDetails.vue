<template>
  <div class="space-y-4">
    <h6
      class="text-sm font-medium text-grey-300 py-3 border-b-[1.5px] border-ui-bg"
    >
      Company`s Information
    </h6>

    <!--  -->
    <form
      class="mt-8 grid grid-cols-2 gap-4"
      @submit.prevent="updateKYCDetails"
    >
      <div class="flex-col space-y-2">
        <label class="text-grey-500 leading-[160%] text-sm" for="company_name">
          Company name on the commercial register
        </label>

        <div class="relative bg-input-bg rounded">
          <input
            id="company_name"
            v-model="payload.company_name"
            class="input-field !px-4"
            type="text"
            placeholder="Company name"
          />
        </div>
      </div>

      <div class="flex-col space-y-2">
        <label
          class="text-grey-500 leading-[160%] text-sm"
          for="company_reg_number"
        >
          Company registration number
        </label>

        <div class="relative bg-input-bg rounded">
          <input
            id="company_reg_number"
            v-model="payload.company_reg_number"
            class="input-field !px-4"
            type="text"
            placeholder="registration number"
          />
        </div>
      </div>

      <div class="col-span-2 flex-col space-y-2">
        <label
          class="text-grey-500 leading-[160%] text-sm"
          for="company_address"
        >
          Domicile address of the company on the commercial register
        </label>

        <div class="relative bg-input-bg rounded">
          <span class="icon icon-left">
            <IconLocation />
          </span>

          <input
            id="company_address"
            v-model="payload.company_address"
            class="input-field !pl-12 pr-4"
            type="text"
            placeholder="enter your company Domicile address"
          />
        </div>
      </div>

      <div class="col-span-2 flex-col space-y-2">
        <label
          class="text-grey-500 leading-[160%] text-sm"
          for="aml_appropriate_regulation"
        >
          IIs the company subject to appropriate regulation with respect to
          combating money laundering?
        </label>

        <div class="w-3/5 flex items-center space-x-0">
          <el-radio-group
            v-model="payload.aml_appropriate_regulation"
            class="!w-full"
          >
            <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4">
              Yes
            </el-radio>
            <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">
              No
            </el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="col-span-2 flex-col space-y-2">
        <label
          class="text-grey-500 leading-[160%] text-sm"
          for="appropriate_prudential_supervision"
        >
          Is the company subject to appropriate prudential supervision?
        </label>

        <div class="w-3/5 flex items-center space-x-0">
          <el-radio-group
            v-model="payload.appropriate_prudential_supervision"
            class="!w-full"
          >
            <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4">
              Yes
            </el-radio>
            <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">
              No
            </el-radio>
          </el-radio-group>
        </div>
      </div>

      <!--  -->
      <div class="flex col-span-2 justify-end pt-6">
        <Button
          text="Save"
          type="submit"
          :loading="isUpdatingKYC"
          class="!w-auto !px-11 !bg-primary-500 !text-white"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { useConstantsStore } from "~/store/constants"
  import { useAuthStore } from "~/store/authentication"

  const emit = defineEmits(["updated"])

  const { $toast } = useNuxtApp()
  const { updateKYC } = useKYCApi()
  const { authenticatedUser } = useAuthStore()

  //
  const isUpdatingKYC = ref<Boolean>(false)
  const payload = ref({
    company_name: "",
    company_reg_number: "",
    company_address: "",
    aml_appropriate_regulation: "",
    appropriate_prudential_supervision: "",
  })

  const countries = ref([])

  // computed
  const allCountries: any = computed(() => useConstantsStore().countries)
  const authUser: any = computed(() => authenticatedUser)

  // functions
  const updateKYCDetails = async () => {
    isUpdatingKYC.value = true
    const response = await updateKYC(payload.value)
    const { data, error } = response

    isUpdatingKYC.value = false
    if (error) return $toast("show", { type: "error", message: error.message })

    $toast("show", { type: "success", message: data.message })
    emit("updated")
  }

  //
  const populatePayload = async () => {
    const {
      company_name,
      company_reg_number,
      company_address,
      aml_appropriate_regulation,
      appropriate_prudential_supervision,
    } = authUser.value?.kyc

    payload.value.company_name = company_name
    payload.value.company_reg_number = company_reg_number
    payload.value.company_address = company_address
    payload.value.aml_appropriate_regulation = aml_appropriate_regulation
    payload.value.appropriate_prudential_supervision =
      appropriate_prudential_supervision
  }

  onBeforeMount(() => populatePayload())
</script>

<style>
  .input-field {
    @apply bg-transparent focus:bg-transparent focus:ring-primary-400 focus:ring-1 w-full flex-1 rounded leading-5 block text-sm py-3.5 outline-0 border-0;
  }
  .icon {
    @apply absolute top-0 h-full rounded-tl rounded-bl bg-transparent flex justify-center items-center px-[1.125rem];
  }
  .icon.icon-left {
    @apply rounded-tl rounded-bl left-0 text-grey-500;
  }
  .icon.icon-right {
    @apply rounded-tr rounded-br right-0 cursor-pointer;
  }
</style>
