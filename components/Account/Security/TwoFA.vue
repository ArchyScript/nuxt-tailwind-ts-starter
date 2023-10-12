<template>  
    <div>
        <!-- Modals here -->
        <div> 
            <Modal size="mdlg" id="google-auth" v-if="activeModal == 'google-auth'" @close="closeModals">
                <ModalsAccountGoogleAuth @done="closeModals" />
            </Modal>   
            <Modal size="mdlg" id="email-auth" v-if="activeModal == 'email-auth'" @close="closeModals">
                <ModalsAccountEmailAuth @done="closeModals" />
            </Modal>   
            <Modal size="mdlg" id="email-auth" v-if="activeModal == 'phone-number-auth'" @close="closeModals">
                <ModalsAccountPhoneNumberAuth @done="closeModals" />
            </Modal>      
            <!-- <Modal size="mdlg" id="email-auth" v-if="activeModal == 'security-key-auth'" @close="closeModals">
                <ModalsAccountSecurityKeyAuth @done="closeModals" />
            </Modal>   -->
        </div> 
        
        
        <div class="space-y-6" >
            <h6 class="text-sm font-medium text-grey-300 py-3 border-b-[1.5px] border-ui-bg">
                Setup Two factor verification to increase security
            </h6>

            <div class="space-y-4">
                <CardTwoFA :details="googleAuth" @toggle="handleAuth" />   
                <CardTwoFA :details="emailAuth" @toggle="handleAuth" />   
                <CardTwoFA :details="phoneNumberAuth" @toggle="handleAuth" />   
                <CardTwoFA :details="securityKeyAuth" @toggle="handleAuth" />   
            </div>
        </div> 
    </div> 
</template>

<script setup lang="ts">   
const emit = defineEmits(['done']);

const activeModal = ref('');     
const googleAuth: Ref<any> = ref({
    id: 'google-auth',
    title: 'Google Authenticator',
    description: 'Use the Google Authenticator app to generate one time security codes',  
    bindedNumber: '+23562023237239',
    createdAt: "June 24, 2021",
    isActivated: false,
})
const emailAuth: Ref<any> = ref({
    id: 'email-auth',
    title: 'Email',
    description: 'Use the Email Authenticator app to generate one time security codes',  
    bindedNumber: '+23562023237239',
    createdAt: "June 24, 2021",
    isActivated: true,
})
const phoneNumberAuth: Ref<any> = ref({
    id: 'phone-number-auth',
    title: 'Text message (SMS)',
    description: 'Use the Google Authenticator app to generate one time security codes',  
    bindedNumber: '+23562023237239',
    createdAt: "June 24, 2021",
    isActivated: false,
})
const securityKeyAuth: Ref<any> = ref({
    id: 'security-key-auth',
    title: 'Security key',
    description: 'Use the Google Authenticator app to generate one time security codes',  
    bindedNumber: '+23562023237239',
    createdAt: "June 24, 2021",
    isActivated: false,
})


  
const openModal = (modalId: any) => activeModal.value = modalId; 
const closeModals = () => activeModal.value = '';  

const handleAuth = ({isActivated, id}: any) => { 
    if (isActivated) return console.log("You want to deactivate ", id)

    activeModal.value = id 
}
 
</script>
