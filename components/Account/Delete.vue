<template>
  <div>   
    <!-- Modals here -->
    <div>  
    <Modal id="delete-account" v-if="activeModal == 'delete-account'" @close="closeModals">
        <ModalsAccountDelete
            :warnings="deleteWarnings"
            @close="closeModals"
            @deleteAcount="deleteInspectorAccount"
        />
    </Modal>

      <Modal
        v-if="activeModal == 'successful-delete'"
        id="successful-delete" 
        @close="closeModals" 
      >
       <ModalsResponse 
          titleText="account deleted successfully" 
          message="We are sorry to see you go, please note that you can still create a new account and the amazing features we provide."
          btnContinueText="Go to homepage"
          :isBtnOutlined="true"
          @next="goTo"
        />  
      </Modal> 
    </div> 
 
    <CardContainer class="!p-5 rounded-md space-y-2 w-full">
        <h6 class="textx-sm font-medium text-grey-300 py-3 border-b-[1.5px] border-ui-bg">
        Delete my account
        </h6>

        <div class="space-y-1">
            <h5 class="text-grey-500 leading-[160%]">Deleting your account will:</h5>

            <div class="space-y-0.5 pl-2">
                <div
                    class="flex items-center space-x-2"
                    v-for="warning in deleteWarnings"
                    :key="warning.text"
                >
                    <span class="h-1 w-1 bg-grey-400 flex rounded-full"></span>

                    <span class="flex text-grey-400 text-sm leading-[160%] flex-1">
                        {{ warning.text }}
                    </span>
                </div>
            </div>
        </div>

        <div class="flex pt-3">
            <Button
                @click="openModal('delete-account')"
                text="Delete my account"
                class="!w-auto py-3 !px-6 !bg-error-50 !text-error-500"
                :hasIcon="true"
                iconName="trash"
            />
        </div>
    </CardContainer>  
  </div>
</template>

<script setup lang="ts"> 
  const router = useRouter(); 

  //  
  const activeModal = ref('');  
  const showDeleteModal = ref<Boolean>(false); 
  const deleteWarnings = ref([
    { text: 'Delete your account info and transaction history' },
    { text: 'Delete you from all VesselTrust activities' },
    { text: 'Cancel all ongoing trades and contract.' },
  ]);  

  
  const openModal = (modalId: any) => activeModal.value = modalId; 
  const closeModals = () => activeModal.value = ''; 
  const goTo = () =>  router.push('/dashboards')

  // functions 
  const deleteInspectorAccount = async () => {
    console.log("account deleteed") 
    // const { data, error } = response;

    // if (error) return $toast('show', { type: 'error', message: error.message }); 
    openModal('successful-delete')
  }; 
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
