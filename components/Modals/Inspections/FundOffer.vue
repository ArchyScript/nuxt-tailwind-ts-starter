<template>
  <form @submit.prevent="fundRequest">
    <div class="space-y-6">
      <h4 class="text-lg text-black font-semibold">Fund Offer</h4>

      <div class="space-y-4">
        <div class="flex bg-primary-50 py-2.5 px-2 space-x-3 rounded">
          <span class="py-0.5">
            <IconInfo class="text-primary-500" :width="21.5" :height="21.5" />
          </span>

          <div class="flex-1 space-y-0.5">
            <p class="text-sm text-grey-500 font-Montserrat">
              To ensure a secure and successful trade, your funds will be held in escrow or a
              designated crypto address and will only be released to the seller upon completion of
              the trade
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <label for="passport_number" class="block text-sm leading-6 text-grey-500">
            amount to be paid
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <span class="icon icon-left !text-grey-300">
              <IconUser />
            </span>

            <input
              id="firstname"
              type="text"
              class="input-field !pl-12 pr-4"
              placeholder="enter first name"
            />
          </div>
        </div>

        <div class="space-y-4">
          <label for="funding_method" class="block text-sm leading-6 text-grey-500">
            Select your preferred funding method?
          </label>

          <div class="w-4/5 flex items-center">
            <el-radio-group v-model="payload.funding_method" class="!w-full">
              <el-radio label="fiat" border class="flex-1 !h-11 !px-3">Fiat</el-radio>
              <el-radio label="crypto" border class="flex-1 !h-11 !px-3">Crypto</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="flex-1 space-y-2">
          <label for="passport_number" class="block text-sm leading-6 text-grey-500">
            Send the required crypto value to the address provided below
          </label>

          <div class="grid grid-cols-5 space-x-2 flex">
            <div class="col-span-2 space-y-2">
              <div class="pl-1">
                <QRCode text="Qr code link or value" />
              </div>

              <p class="text-[10px]">
                <span>Use your Cypto app to scan this QR code,</span>
                <a href="#" class="underline text-primary-500 px-1">Download the app here</a>
                <span>if you don’t already have it.</span>
              </p>
            </div>

            <div class="col-span-3 space-y-4">
              <div class="space-y-2">
                <label for="passport_number" class="block text-xs leading-6 text-grey-300">
                  Network
                </label>

                <div class="relative bg-input-bg w-full rounded">
                  <input
                    id="firstname"
                    type="text"
                    class="input-field px-4"
                    placeholder="Binace Smart Chain (BEP 20)"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label for="passport_number" class="block text-xs leading-6 text-grey-300">
                  Wallet address
                </label>

                <div class="flex items-center space-x-2 px-4 bg-input-bg w-full rounded truncate">
                  <p class="text-sm input-field !text-grey-500 truncate font-Montserrat leading-5">
                    To ensure a secure and successful trade, your funds will be held in escrow or a
                    de
                  </p>

                  <Copy colorVariant="grey" text="walletAddress" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex space-x-2 justify-center items-center">
          <Checkbox :value="isChecked" @checked="(event) => (isChecked = event)" />

          <p
            class="text-sm text-grey-500 leading-[160%] select-none cursor-pointer flex-1"
            @click="isChecked = !isChecked"
          >
            I have made sent 20,000 USD to the wallet address provided
          </p>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          text="Save"
          customClass="!py-3 !px-10 !text-white !font-medium !leading-[160%] w-full"
          :loading="loading"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
  const { $toast } = useNuxtApp();

  const isChecked: Ref<boolean> = ref(false);
  const loading = ref(false);
  const payload = ref({
    funding_method: '',
    proof_of_funding: '',
  });

  //
  const emit = defineEmits(['done']);

  const fundRequest = async () => {
    loading.value = true;
    setTimeout(async () => {
      loading.value = false;
      emit('done');
    }, 3000);
  };
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
