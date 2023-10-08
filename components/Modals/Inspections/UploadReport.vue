<template>
  <form @submit.prevent="fundFinacierRequest">
    <div class="space-y-6">
      <h4 class="text-lg text-black font-semibold">Fund Request</h4>

      <div class="space-y-4">
        <div class="flex-1 space-y-2">
          <label for="method" class="block text-sm leading-6 text-grey-500">
            Select your preferred funding method?
          </label>

          <div class="w-4/5 flex items-center">
            <el-radio-group v-model="payload.method" class="!w-full">
              <el-radio label="fiat" border class="flex-1 !h-12 !px-3">Fiat</el-radio>
              <el-radio label="crypto" border disabled class="flex-1 !h-12 !px-3">Crypto</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="flex-col space-y-2">
          <label class="text-grey-500 !leading-[160%] text-sm flex-1" for="bankAccountId">
            Select bank
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <el-select
              v-model="payload.fiat.bankAccountId"
              class="p-1 !bg-white !border !border-grey-50 rounded-md !focus:text-black !w-full"
              placeholder="Select bank account"
              size="large"
              remote
              filterable
              remote-show-suffix
              default-first-option
              :loading="isFilteringBankAccounts"
              :remote-method="handleBankAccountSearch"
              loading-text="Loading bank accounts"
              no-match-text="No bank matched... check spelling"
              no-data-text="No match"
            >
              <el-option
                v-for="bankAccount in bankAccounts"
                :key="bankAccount.accountId"
                :label="`${bankAccount?.account_name} - ${bankAccount?.account_number} (${bankAccount?.bank_name})`"
                :value="bankAccount.accountId"
                @click="handleBankSelect(bankAccount)"
              >
                <div
                  class="flex items-center space-x-2 truncate"
                  :title="`${bankAccount?.account_name} - ${bankAccount?.account_number} (${bankAccount?.bank_name})`"
                >
                  <h6 class="text-sm text-grey-500 font-medium uppercase truncate">
                    {{ bankAccount?.account_name }} -
                  </h6>

                  <p class="text-sm text-grey-500 leading-[160%] truncate">
                    {{ bankAccount?.account_number }} ( {{ bankAccount?.bank_name }} )
                  </p>
                </div>
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="space-y-2" v-if="Object.keys(selectedAccount).length > 0">
          <h6 class="text-grey-600 text-sm leading-5">Send funds to the seller account below</h6>

          <div class="space-y-0.5">
            <span class="block text-sm leading-5 text-grey-200">Account number</span>

            <p class="text-lg leading-[160%] text-grey-500">
              {{ selectedAccount?.account_number }}
            </p>
          </div>

          <div class="space-y-0.5">
            <span class="block text-sm leading-5 text-grey-200">Account name</span>
            <p class="text-lg leading-[160%] text-grey-500">
              {{ selectedAccount?.account_name }}
            </p>
          </div>

          <div class="space-y-0.5">
            <span class="block text-sm leading-5 text-grey-200">Bank</span>
            <p class="text-lg leading-[160%] text-grey-500">
              {{ selectedAccount?.bank_name }}
            </p>
          </div>
        </div>

        <!-- upload -->
        <div class="flex-1 space-y-2">
          <div class="flex items-center space-x-2">
            <label class="text-grey-600 text-sm leading-5" for="document_url">
              Upload Proof of funding
            </label>

            <IconInfo class="text-grey-40" />
          </div>

          <Upload
            id="document_url"
            uploadId="document_url"
            size="sm"
            :modelValue="payload.fiat.document_url"
            @uploaded="(event) => (payload.fiat.document_url = event.image_url)"
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          text="Fund Request"
          customClass="!py-3 !px-10 !text-white !font-medium !leading-[160%] w-full"
          :loading="loading"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
  const props = defineProps({
    requestId: {
      type: String,
      required: true,
    },
  });

  const { $loading, $toast } = useNuxtApp();
  const { uploadFile } = useCommonApi();
  const { getUserProfile } = useKYCApi();
  const { fundRequest } = useRequestsApi();

  const isFilteringBankAccounts = ref<Boolean>(false);
  const bankAccounts = ref([]);
  const allBankAccounts: any = ref([]);
  const selectedAccount: any = ref({});
  const loading = ref(false);
  const payload = ref({
    method: '',
    fiat: {
      document_type: 'proof of funding',
      document_url: '',
      bankAccountId: '',
    },
  });

  const handleBankAccountSearch = (query: string) => {
    if (query) {
      isFilteringBankAccounts.value = true;
      setTimeout(() => {
        isFilteringBankAccounts.value = false;
        bankAccounts.value = allBankAccounts.value.filter((country: any) => {
          return (
            country.account_name.toLowerCase().includes(query.toLowerCase()) ||
            country.account_number.toLowerCase().includes(query.toLowerCase()) ||
            country.bank_name.toLowerCase().includes(query.toLowerCase())
          );
        });
      }, 50);
    } else {
      bankAccounts.value = allBankAccounts.value;
    }
  };

  //
  const emit = defineEmits(['done']);

  const handleBankSelect = (bank: any) => (selectedAccount.value = bank);

  const fundFinacierRequest = async () => {
    loading.value = true;
    const response = await fundRequest(props.requestId, payload.value);
    const { data, error } = response;
    loading.value = false;
    if (error) return $toast('show', { type: 'error', message: error?.message });
    $toast('show', { type: 'success', message: data.message || 'User profile retrieved' });

    emit('done');
  };

  const fetchAuthUser = async () => {
    const response = await getUserProfile();
    const { data, error } = response;
    if (error) return $toast('show', { type: 'error', message: error?.message });
    allBankAccounts.value = data?.bank_accounts;
  };

  onBeforeMount(() => {
    fetchAuthUser();
  });
</script>

<style scoped></style>
