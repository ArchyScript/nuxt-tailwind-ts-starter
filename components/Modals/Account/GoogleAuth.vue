<template>
  <form @submit.prevent="hanndleGoogleAuth">
    <div class="space-y-8  px-2" >
      <header class="space-y-2"> 
        <h4 class="text-lg text-black font-semibold font-Poppins">Google Authentication</h4>
        <p class="text-sm leading-[160%] text-grey-400  font-Poppins">Follow the guide below to set up Google authenticator for additional layer of security. </p>
      </header>
        
      <div class="space-y-6">
        <div class="space-y-4"> 
          <div class="space-y-2 flex-col flex justify-center items-center">
            <h6 class="text-xs leading-[160%] text-grey-400"> 
              Your will need a 
              <span class="text-primary-500">Google Authenticator app </span>
              complete this process
            </h6>

            <div class="space-y-2 py-2 px-5">
              <h6 class="text-sm font-semibold text-grey-400 text-center">Scan the QR code into your app</h6>

              <QRCode text="Qr code link or value" />
            </div>
          </div>

          <div class="space-y-2">
            <p class="text-xs leading-[160%] text-grey-400">If you have any problem with scanning the QR code, enter this code manually into the app </p>

            <div class="bg-input-bg py-3 px-4 truncate flex items-center space-x-2">
              <span class="flex-1 truncate text-sm leading-[160%]">TEGHJKLLJHJNM</span>
              <Copy text="Test copy text" colorVariant="grey"/>
            </div>
          </div>
        </div>
        
        <div class="space-y-3">
          <p class="text-sm leading-[160%] text-grey-400">Verification code from app: </p>

          <div class="flex justify-center items-center">
            <PinCode @pincode="getPinCode"/>
          </div>
        </div>
      </div>
  
      <div> 
        <Button
          type="submit"
          text="Enable 2FA"
          customClass="!py-4 !px-11" 
          :loading="loading"
        />
      </div> 
    </div>
  </form>
</template>

<script setup lang="ts">   
  const emit = defineEmits(['done']);  

  const fileSelected: Ref<any> = ref(null)
  const loading = ref(false);  

  const getPinCode = (code: string) => {
    console.log("code:::", code); 
  }

  const hanndleGoogleAuth = () => { 
    loading.value =  true 
    setTimeout(() => {
      loading.value =  false
      emit('done')
    }, 500);
  }
</script>

<style scoped></style>
