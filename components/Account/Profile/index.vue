<template>
  <div class="grid grid-cols-3 gap-x-8">
    <section class="col-span-2 space-y-6 items-center mb-16">
      <CardContainer class="!p-5 rounded-md !pr-8 space-y-4 w-full">
        <div class="flex items-center !bg-primary-50 rounded-md">
          <h6
            v-for="(tab, index) in tabs"
            :key="`${tab.id}_${index}`"
            class="text-sm flex-1 text-center capitalize select-none font-medium px-6 py-3 rounded-md cursor-pointer"
            :class="
              activeTabId == tab.id
                ? '!bg-primary-500 !text-white'
                : '!text-primary-500 !bg-primary-50'
            "
            @click="toggleActiveTab(tab.id)"
          >
            {{ tab?.title }}
          </h6>
        </div>

        <AccountProfileRepDetails
          v-if="activeTabId == 'rep_details'"
          :details="authUser.value?.kyc"
          @updated="fetchAuthUser"
        />
        <AccountProfileCompanyDetails
          v-else
          :details="authUser.value?.kyc"
          @updated="fetchAuthUser"
        />
      </CardContainer>

      <!-- delete section -->
      <AccountDelete />
    </section>

    <section class="space-y-6">
      <CardContainer class="!p-5 rounded-md space-y-2 w-full">
        <h6
          class="textx-sm font-medium text-grey-300 py-3 border-b-[1.5px] border-ui-bg"
        >
          KYC status
        </h6>

        <div
          class="flex items-center px-6 py-3 rounded-md space-x-2"
          :class="
            authUser?.profile?.isKYC
              ? 'text-success-500 bg-success-50'
              : 'text-error-500 bg-error-50'
          "
        >
          <IconCheckbox type="square" />

          <span
            class="font-medium leading-[160%] flex-1 flex text-sm"
            :class="`${
              authUser?.profile?.isKYC ? '!text-success-500' : '!text-error-500'
            } `"
          >
            {{
              authUser?.profile?.isKYC
                ? "Verified account"
                : "Account not Verified"
            }}
          </span>
        </div>
      </CardContainer>

      <CardContainer class="!p-5 rounded-md space-y-3 w-full">
        <h6
          class="textx-sm font-medium text-grey-300 py-3 border-b-[1.5px] border-ui-bg"
        >
          Company`s Logo
        </h6>

        <!--  -->
        <div class="flex items-center rounded-md space-x-6">
          <div
            class="h-[6rem] w-[6rem] relative ring-[1.6px] ring-primary-400 rounded-full"
          >
            <img
              :src="authUser?.profile?.companyLogo"
              class="h-full w-full bg-primary-50 rounded-full"
            />

            <span
              class="absolute bottom-0 cursor-pointer right-0 bg-primary-50 text-primary-500 rounded-full rounded-full p-1"
              @click="fileInput.click()"
              title="Edit Company's logo"
            >
              <IconCamera :height="24" :width="24" />
            </span>
          </div>

          <div class="flex-1 space-y-4">
            <h6
              class="text-sm font-medium text-grey-500 !leading-[160%] flex-1"
            >
              Edit company`s logo
            </h6>

            <div class="flex items-center space-x-1">
              <Button
                text="Delete"
                customClass="!text-error-500 !py-2 !px-4  !bg-white !font-medium !leading-[160%]  flex-1"
              />

              <label for="upload_file" class="flex-1">
                <Button
                  text="Update"
                  :hasBorder="true"
                  customClass="!py-2 !px-4   !font-medium  !ring-secondary-500 !text-secondary-500 !leading-[160%] w-full"
                  title="Edit Company's logo"
                  @click="fileInput.click()"
                />
              </label>

              <input
                ref="fileInput"
                id="upload_file"
                type="file"
                class="hidden"
                @change="handleUpload"
              />
            </div>
          </div>
        </div>
      </CardContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from "~/store/authentication"
  import { beforeFileUpload } from "~/utils/upload"

  const router = useRouter()
  const { $toast, $loading } = useNuxtApp()
  const { uploadFile } = useCommonApi()
  const { getAuthenticatedUser, setAuthUser, setAuthToken } = useAuthStore()
  const { getUserProfile, updateKYC } = useKYCApi()

  //
  const fileInput: Ref<HTMLInputElement | null> = ref(null)
  const activeTabId = ref("rep_details")
  const tabs = ref([
    { title: "Representative details", id: "rep_details" },
    { title: "Contracting party / company details", id: "company_details" },
  ])
  const companyPayloadLogo = ref({ logo: "" })

  // computed
  const authUser: any = ref({})

  // functions
  const toggleActiveTab = (tabId: string) => (activeTabId.value = tabId)

  //
  const populatePayload = async () => {
    if (Object.keys(authUser.value).length < 1) await getAuthenticatedUser()
    if (!authUser.value) return
  }

  const fetchAuthUser = async () => {
    $loading().start()
    const response = await getUserProfile()
    const { data, error } = response

    $loading().stop()
    if (error) return $toast("show", { type: "error", message: error?.message })
    $toast("show", {
      type: "success",
      message: data.message || "User profile retrieved",
    })

    authUser.value = data
    const { profile } = data

    setAuthToken(profile.authToken)
    setAuthUser(data)

    populatePayload()
  }
  const handleUpload = async (event: Event | any) => {
    const file = event.target.files[0]

    if (!file)
      return $toast("show", { type: "warning", message: "No file selected" })
    const errorMessage = beforeFileUpload(file, "image")
    if (errorMessage)
      return $toast("show", { type: "error", message: errorMessage })
    await upload(file)
  }

  const upload = async (file: any) => {
    $loading().start()
    let formData = new FormData()
    formData.append("doc", file)

    const response = await uploadFile(formData)
    const { data, error } = response
    $loading().stop()
    if (error) return $toast("show", { type: "error", message: error.message })

    fileUploaded(data.file_url)
  }

  const fileUploaded = async (image_url: string) => {
    $loading().start()
    companyPayloadLogo.value.logo = image_url

    const response = await updateKYC(companyPayloadLogo.value)
    const { data, error } = response
    $loading().stop()

    if (error) return $toast("show", { type: "error", message: error.message })

    $toast("show", { type: "success", message: data.message })
    await fetchAuthUser()
  }

  //
  onBeforeMount(() => fetchAuthUser())
</script>

<style></style>
