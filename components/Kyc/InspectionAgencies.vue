<template>
  <div class="space-y-8">
    <h4 class="text-center text-grey-500 text-xl font-medium leading-6">
      Inspection Agency details
    </h4>

    <form class="space-y-4">
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

      <div class="flex items-center space-x-4">
        <div class="w-1/2">
          <label for="nationality" class="block mb-2 leading-6 text-grey-500">
            Company country
          </label>

          <div class="relative bg-input-bg w-full pl-8 rounded">
            <span class="icon icon-left text-grey-300">
              <Avatar
                :name="`${countryISO2}_16`"
                :isSubFolder="true"
                subfolderPath="flags"
              />
            </span>

            <el-select
              v-model="kycPayload.company_country"
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
          Is the company subject to appropriate prudential supervision?
        </label>

        <div class="w-3/5 flex items-center space-x-0">
          <el-radio-group
            v-model="kycPayload.appropriate_prudential_supervision"
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

      <div>
        <label class="block mb-2 leading-6 text-grey-500">
          IIs the company subject to appropriate regulation with respect to
          combating money laundering?
        </label>

        <div class="w-3/5 flex items-center space-x-0">
          <el-radio-group
            v-model="kycPayload.aml_appropriate_regulation"
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

      <div>
        <label class="block mb-2 leading-6 text-grey-500">
          Upload Director`s passport
        </label>

        <div class="w-3/5">
          <Upload
            uploadId="certificate_of_incorporation"
            :modelValue="kycPayload.certificate_of_incorporation"
            @uploaded="onUploaded"
          />
        </div>
      </div>
    </form>

    <div class="flex justify-between items-center space-x-4">
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
  definePageMeta({ layout: "auth" })

  import { useConstantsStore } from "~/store/constants"
  import { useAuthStore } from "~/store/authentication"

  const { $toast } = useNuxtApp()
  const { setKYCData } = useAuthStore()

  const emit = defineEmits(["done", "back"])

  const isFilteringCountry: Ref<boolean> = ref(false)
  const countries: Ref<any> = ref([])
  const kycPayload: Ref<any> = ref({})
  const countryISO2 = ref("")
  const getCountryCode = (selectedCountry: any) => {
    countryISO2.value = selectedCountry.iso2.toLowerCase()
  }

  const allCountries = computed(() => useConstantsStore().countries)

  //  watch
  watch(
    kycPayload,
    (newValue) => {
      setKYCData(newValue)
    },
    { deep: true }
  )

  // rules here

  //  validation  here

  // functions
  const onUploaded = ({ image_url }: any) => {
    return (kycPayload.value.certificate_of_incorporation = image_url)
  }

  const goBack = async () => emit("back")

  const nextStep = async () => {
    const isFormValidated = true
    if (!isFormValidated)
      return $toast("show", {
        type: "error",
        message: "Some fields are not validated",
      })

    emit("done")
  }

  const handleCountrySearch = (query: string) => {
    if (query) {
      isFilteringCountry.value = true
      setTimeout(() => {
        isFilteringCountry.value = false
        countries.value = allCountries.value.filter((country: any) => {
          return country.name.toLowerCase().includes(query.toLowerCase())
        })
      }, 50)
    } else {
      countries.value = allCountries.value
    }
  }

  const retoreSession = async () => {
    const kycInStorage = localStorage.getItem("kycData")
    if (!kycInStorage) return

    const deserializedData = JSON.parse(kycInStorage)
    if (Object.keys(deserializedData).length > 0) {
      return (kycPayload.value = deserializedData)
    }

    allCountries.value.forEach((country: any) => {
      if (country.name == kycPayload.value.nationality) {
        countryISO2.value = country.iso2.toLowerCase()
      }
    })
  }

  // lifecycle
  onBeforeMount(async () => retoreSession())
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
