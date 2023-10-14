<template>
  <form class="space-y-4" @submit.prevent="changeFinancierPassword">
    <h6
      class="text-sm font-medium text-grey-300 py-3 border-b-[1.5px] border-ui-bg"
    >
      Choose a new password, something easy to remember.
    </h6>

    <div class="flex-col space-y-2">
      <label class="text-grey-500 leading-[160%] text-sm" for="password"
        >Old Password</label
      >

      <div class="relative bg-input-bg rounded">
        <input
          id="password"
          v-model="resetPasswordPayload.old_password"
          :type="showPassword ? 'text' : 'password'"
          class="input-field !pr-12 !pl-4"
          placeholder="password"
          autocomplete="current-password"
          @blur="v$.old_password.$touch()"
          :class="
            v$.old_password.$dirty &&
            (v$.old_password.$invalid ? 'error' : 'valid')
          "
        />

        <span class="icon icon-right" @click="showPassword = !showPassword">
          <IconEyes :title="showPassword ? 'open' : 'close'" />
        </span>
      </div>
    </div>

    <div class="flex-col space-y-2">
      <label class="text-grey-500 leading-[160%] text-sm" for="new_password">
        New Password
      </label>

      <div class="relative bg-input-bg rounded">
        <input
          id="new_password"
          v-paste-restrict
          v-model="resetPasswordPayload.new_password"
          :type="showPassword ? 'text' : 'password'"
          class="input-field !pr-12 !pl-4"
          placeholder="password"
          autocomplete="current-password"
          @blur="v$.new_password.$touch()"
          :class="
            v$.new_password.$dirty &&
            (v$.new_password.$invalid ? 'error' : 'valid')
          "
        />

        <span class="icon icon-right" @click="showPassword = !showPassword">
          <IconEyes :title="showPassword ? 'open' : 'close'" />
        </span>
      </div>
    </div>

    <div class="flex-col space-y-2">
      <label
        class="text-grey-500 leading-[160%] text-sm"
        for="confirm_password"
      >
        Confirm Password
      </label>

      <div class="relative bg-input-bg rounded">
        <input
          id="confirm_password"
          v-paste-restrict
          v-model="resetPasswordPayload.confirm_password"
          :type="showPassword ? 'text' : 'password'"
          class="input-field !pr-12 !pl-4"
          placeholder="password"
          autocomplete="current-password"
          @blur="v$.confirm_password.$touch()"
          :class="
            v$.confirm_password.$dirty &&
            (v$.confirm_password.$invalid ? 'error' : 'valid')
          "
        />

        <span class="icon icon-right" @click="showPassword = !showPassword">
          <IconEyes :title="showPassword ? 'open' : 'close'" />
        </span>
      </div>
    </div>

    <div class="flex w-full justify-end pt-6">
      <Button
        text="Save"
        type="submit"
        :disabled="isFieldValid"
        :loading="loading"
        customClass="!py-4 !px-11 !w-fit   !leading-[160%]"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
  import { pasteHandler, dropHandler } from "~/utils"
  import { useVuelidate } from "@vuelidate/core"
  import {
    required,
    minLength,
    maxLength,
    helpers,
  } from "@vuelidate/validators"

  const { $toast } = useNuxtApp()
  const { changePassowrd } = useAuthApi()
  const router = useRouter()

  const loading = ref(false)
  const showPassword: Ref<boolean> = ref(false)
  const resetPasswordPayload = ref({
    old_password: "",
    new_password: "",
    confirm_password: "",
  })

  const isFieldValid = computed(() => v$.value.$error)
  const validationRules = computed(() => {
    return {
      old_password: {
        required: helpers.withMessage("Password is required", required),
      },
      new_password: {
        required: helpers.withMessage("Password is required", required),
        minLength: helpers.withMessage(
          ({ $params }) =>
            `Password is too short (min ${$params.min} characters)`,
          minLength(6)
        ),
        maxLength: helpers.withMessage(
          ({ $params }) =>
            `Password is too long (max ${$params.max} characters)`,
          maxLength(64)
        ),
      },
      confirm_password: {
        required,
        sameAsPassword: helpers.withMessage(
          "Passwords do not match",
          (value) => value === resetPasswordPayload.value.new_password
        ),
      },
    }
  })

  // Validation
  const v$ = useVuelidate(validationRules, resetPasswordPayload.value)

  const changeFinancierPassword = async () => {
    v$.value.$touch()
    if (!isFieldValid) return

    loading.value = true
    const payload = {
      old_password: resetPasswordPayload.value.old_password,
      password: resetPasswordPayload.value.new_password,
    }
    const response = await changePassowrd(payload)
    const { data, error } = response

    loading.value = false

    localStorage.removeItem("authToken")
    if (error) return $toast("show", { type: "error", message: error.message })
    $toast("show", {
      type: "success",
      message: data?.message || "Password updated",
    })

    setTimeout(
      () =>
        $toast("show", {
          type: "success",
          message: "Redirecting to login page",
        }),
      3000
    )

    setTimeout(() => router.push("/auth/login"), 1000)
  }

  onMounted(() => {
    const confirmPasswordfield = document.getElementById("confirm_password")
    const newPasswordfield = document.getElementById("new_password")
    if (confirmPasswordfield) {
      confirmPasswordfield.addEventListener("paste", pasteHandler)
      confirmPasswordfield.addEventListener("drop", dropHandler)
    }
    if (newPasswordfield) {
      newPasswordfield.addEventListener("paste", pasteHandler)
      newPasswordfield.addEventListener("drop", dropHandler)
    }
  })
</script>

<style scoped>
  .input-field {
    @apply bg-transparent focus:bg-transparent ring-1 ring-primary-400 focus:ring-primary-400 focus:ring-1 w-full flex-1 rounded leading-5 block text-sm py-3.5 outline-0 border-0;
  }
  .input-field.valid {
    @apply ring-primary-400;
  }
  .input-field.error {
    @apply ring-2 !ring-error-500;
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
