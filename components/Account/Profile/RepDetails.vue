<template>
  <div class="space-y-4">
    <h6
      class="text-sm font-medium text-grey-300 py-3 border-b-[1.5px] border-ui-bg"
    >
      Personal Information
    </h6>

    <!--  -->
    <form
      class="mt-8 grid grid-cols-2 gap-4"
      @submit.prevent="updateKYCDetails"
    >
      <div class="flex-col space-y-2">
        <label class="text-grey-500 leading-[160%] text-sm" for="first_name">
          First name
        </label>

        <div class="relative bg-input-bg rounded">
          <span class="icon icon-left">
            <IconUser />
          </span>

          <input
            id="first_name"
            class="input-field !pl-12 pr-4"
            type="text"
            placeholder="First name"
            v-model.trim="payload.first_name"
          />
        </div>
      </div>

      <div class="flex-col space-y-2">
        <label class="text-grey-500 leading-[160%] text-sm" for="last_name">
          Last name
        </label>

        <div class="relative bg-input-bg rounded">
          <span class="icon icon-left">
            <IconUser />
          </span>

          <input
            id="last_name"
            class="input-field !pl-12 pr-4"
            type="text"
            placeholder="Last name"
            v-model.trim="payload.last_name"
          />
        </div>
      </div>

      <div class="col-span-2 flex-col space-y-2">
        <label class="text-grey-500 leading-[160%] text-sm" for="address">
          Address
        </label>

        <div class="relative bg-input-bg rounded">
          <span class="icon icon-left">
            <IconLocation />
          </span>

          <input
            id="address"
            class="input-field !pl-12 pr-4"
            type="text"
            placeholder="enter address"
            v-model="payload.address"
          />
        </div>
      </div>

      <div class="flex-col space-y-2">
        <label class="text-grey-500 leading-[160%] text-sm" for="nationality">
          Nationality
        </label>

        <div class="relative bg-input-bg w-full pl-8 rounded">
          <span class="icon icon-left text-grey-300">
            <Avatar
              :name="`${customerNationalityISO2}_16`"
              :isSubFolder="true"
              subfolderPath="flags"
            />
          </span>

          <el-select
            v-model="payload.nationality"
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
            <el-option
              v-for="country in countries"
              :key="country.name"
              :label="country.name"
              :value="country.name"
              :name="country.value"
              @click="getCountryCode(country, 'customer')"
            />
          </el-select>
        </div>
      </div>

      <div class="flex-col space-y-2">
        <label class="text-grey-500 leading-[160%] text-sm" for="phone_number">
          Phone Number
        </label>

        <el-input
          v-model="payload.phone_number"
          placeholder="90 123 456 89"
          type="tel"
          class="input-with-select bg-input-bg h-[3rem]"
        >
          <template #prepend>
            <div class="flex space-x-1 items-center">
              <Avatar
                :name="`${customerNationalityISO2}_16`"
                :isSubFolder="true"
                subfolderPath="flags"
              />

              <span class="text-grey-600 text-sm leading-5">
                {{ customerCountryCode }}
              </span>
            </div>
          </template>
        </el-input>
      </div>

      <div class="flex-col space-y-2">
        <label class="text-grey-500 leading-[160%] text-sm" for="email">
          Email
        </label>

        <div class="relative bg-input-bg rounded">
          <span class="icon icon-left">
            <IconEmail />
          </span>

          <input
            id="email"
            class="input-field !px-12"
            readonly
            type="email"
            placeholder="example@gmail.com"
            :value="authUser?.kyc?.email"
          />

          <span class="icon icon-right text-success-500">
            <IconCheckbox type="square" />
          </span>
        </div>
      </div>

      <!-- <div class="flex-col space-y-2">
        <label class="text-grey-500 leading-[160%] text-sm" for="title">
          Title
        </label>

        <div class="relative bg-input-bg w-full rounded">
          <el-select
            v-model="payload.title"
            class="p-1 !bg-transparent !focus:text-black !w-full"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="titleOption in titleOptions"
              :key="titleOption.title"
              :label="titleOption.title"
              :value="titleOption.title"
            />
          </el-select>
        </div>
      </div> -->

      <!--  -->
      <div class="flex col-span-2 justify-end pt-6">
        <Button
          text="Save"
          type="submit"
          :loading="isUpdatingKYC"
          class="!w-auto !px-11"
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
  const countries = ref([])
  const customerCountryCode = ref("")
  const customerNationalityISO2 = ref("")
  const isUpdatingKYC = ref<Boolean>(false)
  const isFilteringCountry = ref<Boolean>(false)
  const titleOptions = ref([
    { title: "Mr." },
    { title: "Mrs." },
    { title: "Miss" },
  ])
  const payload = ref({
    first_name: "",
    last_name: "",
    address: "",
    nationality: "",
    phone_number: "",
    // title: "",
  })

  // computed
  const allCountries: any = computed(() => useConstantsStore().countries)
  const authUser: any = computed(() => authenticatedUser)

  // functions
  const getCountryCode = (selectedCountry: any) => {
    customerCountryCode.value = selectedCountry.phone_code
    customerNationalityISO2.value = selectedCountry.iso2.toLowerCase()
  }

  const updateKYCDetails = async () => {
    isUpdatingKYC.value = true
    const response = await updateKYC(payload.value)
    const { data, error } = response

    isUpdatingKYC.value = false
    if (error) return $toast("show", { type: "error", message: error.message })

    $toast("show", { type: "success", message: data.message })
    emit("updated")
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

  const populatePayload = async () => {
    const { first_name, last_name, address, nationality, title, phone_number } =
      authUser.value?.kyc

    payload.value.first_name = first_name
    payload.value.last_name = last_name
    payload.value.address = address
    payload.value.nationality = nationality
    payload.value.phone_number = phone_number
    // payload.value.title = title

    allCountries.value.forEach((country: any) => {
      if (country.name == payload.value.nationality) {
        customerCountryCode.value = country.phone_code
        customerNationalityISO2.value = country.iso2.toLowerCase()
      }
    })
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
