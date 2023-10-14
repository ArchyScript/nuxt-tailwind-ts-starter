<template>
  <div
    class="flex items-center justify-between bg-white sticky top-0 h-16 px-8 z-50"
  >
    <h4 class="text-lg text-grey-500">
      {{ topbarTitle }}
    </h4>

    <div class="flex items-center space-x-6">
      <span
        class="relative flex items-center cursor-pointer space-x-4 text-gray-500"
      >
        <IconNotification />
        <span
          class="absolute flex items-center justify-center text-center -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-error-500 text-[#FCFEFF] text-[8px]"
        >
          1
        </span>
      </span>

      <div>
        <el-dropdown trigger="click">
          <div class="el-dropdown-link flex items-center space-x-3">
            <div class="inline-block rounded-full !h-12 !w-12">
              <img
                v-if="inspectorImageUrl"
                :src="inspectorImageUrl"
                :alt="inspectorFullname"
                class="h-full w-full border border-secondary-500 rounded-full"
              />

              <div
                v-else
                class="h-full w-full text-base font-semibold bg-white text-secondary-500 border border-secondary-500 rounded-full flex justify-center items-center"
              >
                {{ inspectorFullnameInitials }}
              </div>
            </div>

            <span><IconArrow type="caret-down" /></span>
          </div>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                class="!text-grey-300 !font-medium !tracking-wider border-b border-ui-bg hover:bg-grey-50"
                @click="router.push('/account')"
              >
                <div class="flex space-x-4 items-center !py-2.5 px-4">
                  <IconUser />
                  <span class="flex-1 text-sm tracking-wide -mb-0.5 pr-14"
                    >Account</span
                  >
                </div>
              </el-dropdown-item>

              <el-dropdown-item
                class="!text-error-500 !font-medium !tracking-wider hover:bg-error-50"
                @click="logoutUser"
              >
                <div class="flex space-x-4 items-center !py-2.5 px-4">
                  <IconLogout />
                  <span class="flex-1 text-sm tracking-wide -mb-0.5 pr-14"
                    >Logout</span
                  >
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from "~/store/authentication"
  const { authenticatedUser, logout } = useAuthStore()

  const router = useRouter()
  const route = useRoute()
  const { getUserProfile } = useKYCApi()

  const authUser: Ref<any> = ref({})
  const inspectorFullname = computed(() => {
    return `${authUser.value?.kyc?.first_name || ""} ${
      authUser.value?.kyc?.last_name || ""
    }`
  })
  const inspectorFullnameInitials = computed(() => {
    return `${authUser.value?.kyc?.first_name[0]?.toUpperCase() || ""}
    ${authUser.value?.kyc?.last_name[0]?.toUpperCase() || ""}`
  })
  const inspectorImageUrl = computed(() => authUser.value?.kyc?.selfie)

  const topbarTitle = computed(() => {
    const routeFullPath = route.fullPath.split("?")[0]
    if (routeFullPath == "/") return "Loading..."

    const firstSegment = routeFullPath
      ?.split("/")
      .filter((segment) => segment)[0]

    if (firstSegment == "dashboards") return "Dashboard Overview"
    if (firstSegment == "inspections") return "Inspection requests"
    const words = firstSegment.split("-")

    // Capitalize the first letter of each word and join them with a space
    const result = words
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join(" ")

    return result
  })

  const logoutUser = () => logout()
  const fetchAuthUser = async () => {
    const response = await getUserProfile()
    const { data, error } = response
    if (error) return
    authUser.value = data
  }

  onBeforeMount(() => fetchAuthUser())
</script>
