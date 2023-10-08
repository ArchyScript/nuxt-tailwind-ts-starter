<template>
  <div class="bg-white rounded box-shadow p-8 w-[36.5rem] mx-auto">  
    <div class="text-sm p-1">
      <h3
        class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600"
      >
        Verification Successful
      </h3>
      
      <p class="text-center pt-6 px-2 text-grey-400 leading-6">
        Thank you for verifying your email address. You now will be redirected
        to the KYC page for you to complete your registration
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">  
definePageMeta({ layout: "auth" });  
</script> 