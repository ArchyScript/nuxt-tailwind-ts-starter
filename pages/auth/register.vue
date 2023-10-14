<template>
  <div class="bg-white rounded box-shadow space-y-8 p-8 w-[36.5rem] mx-auto">
    <header class="space-y-2">
      <h3
        class="text-center leading-7 text-[1.75rem] font-semibold text-grey-600"
      >
        Create account
      </h3>
      <p class="text-center text-sm leading-[160%] text-grey-400 leading-6">
        Fill up the form to register
      </p>
    </header>

    <form @submit.prevent="registerFinacier" class="text-sm">
      <div class="mb-4 space-y-2">
        <label for="email" class="block mb-2 leading-6 text-grey-500">
          Email Address
        </label>

        <div class="relative bg-input-bg rounded">
          <span class="icon icon-left !text-grey-300">
            <IconEmail />
          </span>

          <input
            id="email"
            v-model="payload.email"
            @blur="v$.email.$touch()"
            :class="v$.email.$dirty && (v$.email.$invalid ? 'error' : 'valid')"
            class="input-field !pl-12 pr-4"
            type="email"
            placeholder="example@gmail.com"
          />
        </div>

        <p class="text-red-500 text-xs">
          {{ v$.email?.$errors[0]?.$message }}
        </p>
      </div>

      <div class="mb-4 space-y-2">
        <label for="password" class="block leading-6 text-grey-500">
          Password
        </label>

        <div class="relative bg-input-bg rounded">
          <span class="icon icon-left">
            <IconLock />
          </span>

          <input
            id="password"
            class="input-field !px-12"
            placeholder="password"
            @blur="v$.password.$touch()"
            :type="showPassword ? 'text' : 'password'"
            v-model="payload.password"
            :class="
              v$.password.$dirty && (v$.password.$invalid ? 'error' : 'valid')
            "
          />

          <span class="icon icon-right" @click="showPassword = !showPassword">
            <IconEyes :title="showPassword ? 'open' : 'close'" />
          </span>
        </div>

        <p class="text-red-500 text-xs">
          {{ v$.password?.$errors[0]?.$message }}
        </p>
      </div>

      <div class="block w-full pt-2 pb-4">
        <Button
          type="submit"
          text="Create account"
          :disabled="fieldHasError"
          :loading="loading"
        />
      </div>

      <div class="flex justify-center items-center space-x-2">
        <span class="text-center text-grey-400 leading-6">
          Already have an account?
        </span>

        <nuxt-link
          to="/auth/login"
          class="text-primary-500 font-medium leading-6 p-2 font-Poppins"
        >
          Log in
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { RegisterPayloadType } from "~/types/auth"
  import { useVuelidate } from "@vuelidate/core"
  import { useAuthStore } from "~/store/authentication"
  import {
    required,
    email,
    minLength,
    maxLength,
    helpers,
  } from "@vuelidate/validators"

  definePageMeta({ layout: "auth" })
  const { $toast } = useNuxtApp()

  const { register } = useAuthApi()
  const { setUnVerifiedUserEmail } = useAuthStore()
  const router = useRouter()

  const showPassword: Ref<boolean> = ref(false)
  const loading: Ref<boolean> = ref(false)
  const payload: Ref<any> = ref({ email: "", password: "" })

  const fieldHasError = computed(() => v$.value.$error)

  const validationRules = computed(() => {
    return {
      email: {
        required: helpers.withMessage("email is required", required),
        email: helpers.withMessage("Invalid email format", email),
      },
      password: {
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
    }
  })

  const v$ = useVuelidate(validationRules, payload.value)

  //
  const registerFinacier = async () => {
    v$.value.$touch()
    if (fieldHasError.value) return
    loading.value = true

    const response = await register(payload.value)
    const { data, error } = response
    loading.value = false
    if (error) return $toast("show", { type: "error", message: error.message })

    //
    setUnVerifiedUserEmail(payload.value.email)
    router.push("/auth/verify-account")
  }
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
