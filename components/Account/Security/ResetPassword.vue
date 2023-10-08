<template>
    <form
        class="space-y-4"
        @submit.prevent="changeFinancierPassword" 
    >
        <h6 class="text-sm font-medium text-grey-300 py-3 border-b-[1.5px] border-ui-bg">
            Choose a new password, something easy to remember.
        </h6>

        <div class="flex-col space-y-2">
            <label class="text-grey-500 leading-[160%] text-sm" for="password">Old Password</label>

            <div class="relative bg-input-bg rounded">
                <input
                    id="password"
                    v-model="resetPasswordPayload.old_password"
                    :type="showPassword ? 'text' : 'password'"
                    class="input-field !pr-12 !pl-4"
                    placeholder="password"
                    autocomplete="current-password"
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
            />

                <span class="icon icon-right" @click="showPassword = !showPassword">
                    <IconEyes :title="showPassword ? 'open' : 'close'" />
                </span>
            </div>
        </div>

        <div class="flex-col space-y-2">
            <label class="text-grey-500 leading-[160%] text-sm" for="confirm_password">
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
                :loading="loading"
                customClass="!py-4 !px-11 !bg-primary-500   !leading-[160%]"
            /> 
        </div>
    </form> 
</template>

<script setup lang="ts">
  import { pasteHandler, dropHandler } from '~/utils';

  const { $toast } = useNuxtApp();
  const { changePassowrd } = useAuthApi();
  const router = useRouter();

  const loading = ref(false); 
  const showPassword: Ref<boolean> = ref(false);
  const resetPasswordPayload = ref({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });  
    
  const changeFinancierPassword = async () => {
    loading.value = true;
    const payload = {
      old_password: resetPasswordPayload.value.old_password,
      password: resetPasswordPayload.value.new_password,
    };
    const response = await changePassowrd(payload);
    const { data, error } = response;

    loading.value = false;
    if (error) return $toast('show', { type: 'error', message: error.message });
    $toast('show', { type: 'success', message: data?.message || 'Password updated' });

    setTimeout(
      () => $toast('show', { type: 'success', message: 'Redirecting to login page' }),
      5000,
    );
 
    setTimeout(() => router.push('/auth/login'), 2000);
  };

  onMounted(() => {
    const confirmPasswordfield = document.getElementById('confirm_password');
    const newPasswordfield = document.getElementById('new_password');
    if (confirmPasswordfield) {
      confirmPasswordfield.addEventListener('paste', pasteHandler);
      confirmPasswordfield.addEventListener('drop', dropHandler);
    }
    if (newPasswordfield) {
      newPasswordfield.addEventListener('paste', pasteHandler);
      newPasswordfield.addEventListener('drop', dropHandler);
    }
  });
</script>
