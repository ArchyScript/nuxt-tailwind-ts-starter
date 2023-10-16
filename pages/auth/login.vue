<template>
  <div class="bg-white rounded box-shadow space-y-8 p-8 w-[36.5rem] mx-auto">
    <form @submit.prevent="loginFinacier" class="text-sm">Login</form>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from "~/store/authentication"
  import { useVuelidate } from "@vuelidate/core"
  import {
    required,
    email,
    minLength,
    maxLength,
    helpers,
  } from "@vuelidate/validators"

  //
  definePageMeta({ layout: "auth" })

  const router = useRouter()
  const { $toast } = useNuxtApp()
  const { login } = useAuthApi()

  const showPassword: Ref<boolean> = ref(false)
  const loading: Ref<boolean> = ref(false)
  const payload: Ref<any> = ref({
    email: "exmple@hgmail.com",
    password: "Example.com",
  })

  // computed
  const fieldHasError = computed(() => v$.value.$error)

  // rules
  const validationRules = computed(() => {
    return {
      email: {
        required: helpers.withMessage("E-mail is required", required),
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

  // Validation
  const v$ = useVuelidate(validationRules, payload.value)

  // functions
  const loginFinacier = async () => {
    v$.value.$touch()
    if (fieldHasError.value) return

    loading.value = true
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
