<template>
  <form @submit.prevent="hanndleEmailAuth">
    <div class="space-y-8 px-2" >
      <div class="space-y-6">
        <header class="space-y-2"> 
          <h4 class="text-lg text-black font-semibold font-Poppins">Email Authentication</h4>
          <p class="text-sm text-grey-400 leading-[160%] font-Poppins w-4/5">Follow the guide below to set up Email 2FA for additional layer of security.</p>
        </header>
           
        <div class="space-y-2">
          <label class="text-sm leading-[160%] text-grey-400" for="email">Enter email address </label>

          <div class="flex items-center space-x-4"> 
            <div class="relative bg-input-bg rounded flex-1">
              <span class="icon icon-left !text-grey-300">
                <IconEmail />
              </span>

              <input
                id="email" 
                class="bg-transparent focus:bg-transparent focus:ring-primary-400 focus:ring-1 w-full flex-1 rounded leading-5 block text-sm py-3.5  outline-0 border-0 !pl-12 pr-4"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>

            <Button  
              text="Send code"
              customClass="!py-4 !px-11 !w-fit flex" 
              :hasBorder="true"
              :loading="loading" 
            /> 
          </div>
        </div>   
        
        <div class="space-y-3">
          <p class="text-sm leading-[160%] text-grey-400">Enter the token sent to your email </p>

          <div class="flex justify-center items-center">
            <PinCode @pincode="getPinCode"/>
          </div>
        </div> 
      </div> 
   
      <Button
        type="submit"
        text="Enable 2FA"
        customClass="!py-4 !px-11" 
        :loading="loading"
      /> 
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

  const hanndleEmailAuth = () => { 
    loading.value =  true 
    setTimeout(() => {
      loading.value =  false
      emit('done')
    }, 500);
  }
</script>

<style scoped></style>
