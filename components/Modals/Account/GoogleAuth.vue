<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4 p-0.5">
      <div class="flex-1">
        <label for="accountName" class="block mb-1 text-sm leading-6 text-grey-500">
          Name of the account
        </label>

        <div class="relative bg-input-bg w-full rounded">
          <input
            id="accountName"
            type="text"
            class="input-field px-3"
            placeholder="enter name of the bank account"
            v-model.trim="payload.accountName"
          />
        </div>
      </div>

      <div class="mb-4 flex items-center space-x-4">
        <div class="flex-1">
          <label for="accountNumber" class="block mb-1 text-sm leading-6 text-grey-500">
            Account number
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <input
              id="accountNumber"
              type="text"
              class="input-field px-3"
              placeholder="enter account number"
              v-model.trim="payload.accountNumber"
            />
          </div>
        </div>

        <div class="flex-1">
          <label for="bankName" class="block mb-1 text-sm leading-6 text-grey-500">Bank name</label>

          <div class="relative bg-input-bg w-full rounded">
            <input
              id="bankName"
              type="text"
              class="input-field px-3"
              placeholder="enter bank name"
              v-model.trim="payload.bankName"
            />
          </div>
        </div>
      </div>

      <div class="mb-4 flex items-center space-x-4">
        <div class="flex-1">
          <label for="officerPhone" class="block mb-1 text-sm leading-6 text-grey-500">
            Officer phone number
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <span class="icon icon-left text-grey-300">
              <IconPhone />
            </span>

            <input
              id="officerPhone"
              type="text"
              class="input-field !pl-10 pr-3"
              placeholder="enter officer phone number"
              v-model.trim="payload.officerPhone"
            />
          </div>
        </div>

        <div class="flex-1">
          <label for="officerEmail" class="block mb-1 text-sm leading-6 text-grey-500">
            Officer email address
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <span class="icon icon-left !text-grey-200">
              <IconEmail />
            </span>

            <input
              id="officerEmail"
              type="text"
              class="input-field !pl-10 pr-3"
              placeholder="enter officer email address"
              v-model.trim="payload.officerEmail"
            />
          </div>
        </div>
      </div>

      <div class="mb-4 flex items-center space-x-4">
        <div class="flex-1">
          <label for="officerName" class="block mb-1 text-sm leading-6 text-grey-500">
            Bank officer name
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <input
              id="officerName"
              type="text"
              class="input-field px-3"
              placeholder="enter bank officer name"
              v-model.trim="payload.officerName"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <label for="bankSortCode" class="block mb-1 text-sm leading-6 text-grey-500">
            Bank sort code / swift code
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <input
              id="bankSortCode"
              type="text"
              class="input-field px-3"
              placeholder="sort code or swift code"
              v-model.trim="payload.bankSortCode"
            />
          </div>
        </div>
      </div>

      <div class="py-3">
        <Button
          type="submit"
          :text="isUpdate ? 'Update' : 'Save'"
          customClass="!py-3 !px-10 !text-white !font-medium !leading-[160%] w-full"
          :loading="loading"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
  const { addNewAccount, updateBankAccount } = useUserApi();
  const { $toast } = useNuxtApp();

  const props = defineProps({
    isUpdate: {
      type: Boolean,
      default: false,
    },
    acountInfo: {
      type: Object,
      default: {},
    },
  });

  const loading = ref(false);
  const payload = ref({
    officerName: '',
    officerPhone: '',
    officerEmail: '',
    bankName: '',
    bankSortCode: '',
    accountName: '',
    accountNumber: '',
  });

  //
  const emit = defineEmits(['done']);

  const handleRequestType = () => {
    if (!props.isUpdate) return;

    payload.value.officerName = props.acountInfo?.accountOfficer?.full_name;
    payload.value.officerPhone = props.acountInfo?.accountOfficer?.phone_number;
    payload.value.officerEmail = props.acountInfo?.accountOfficer?.email;
    payload.value.bankSortCode = props.acountInfo?.swift_code;
    payload.value.bankName = props.acountInfo?.bank_name;
    payload.value.accountName = props.acountInfo?.account_name;
    payload.value.accountNumber = props.acountInfo?.account_number;
  };
  const handleSubmit = () => {
    if (props.isUpdate) return updateBankAccountInfo();

    return addNewBankAccount();
  };

  const addNewBankAccount = async () => {
    loading.value = true;

    const response = await addNewAccount(payload.value);
    const { data, error } = response;
    loading.value = false;

    if (error) return $toast('show', { type: 'error', message: error?.message });

    $toast('show', { type: 'success', message: data.message || 'New bank details added' });

    emit('done');
  };

  const updateBankAccountInfo = async () => {
    loading.value = true;
    const response = await updateBankAccount(props.acountInfo?.accountId, payload.value);
    const { data, error } = response;
    loading.value = false;

    if (error) return $toast('show', { type: 'error', message: error?.message });

    $toast('show', { type: 'success', message: data.message || 'New bank details added' });

    emit('done');
  };

  onBeforeMount(() => {
    handleRequestType();
  });
</script>

<style scoped>
  .input-field {
    @apply w-full flex-1 bg-transparent rounded leading-5 block text-sm py-3 outline-0 border-0 ring-0  focus:border-0 focus:ring-0 focus:outline-0;
  }
  .input-field.error {
    @apply border border-error-500 text-red-500;
  }
  .input-field.success {
    @apply border border-success-500 bg-success-50;
  }
  .icon {
    @apply absolute top-0 h-full rounded-tl rounded-bl bg-transparent flex justify-center items-center pr-[1rem];
  }
  .icon.icon-left {
    @apply rounded-tl rounded-bl left-0;
  }
  .icon.icon-right {
    @apply rounded-tr rounded-br right-0 cursor-pointer;
  }
</style>
