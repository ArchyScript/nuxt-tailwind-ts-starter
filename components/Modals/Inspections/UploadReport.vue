<template>
  <form @submit.prevent="handleUpload">
    <div class="space-y-6">
      <h4 class="text-lg text-black font-semibold">Upload Inspection report</h4>
 
      <!--  -->
      <UploadCustom @done="handleFileSelection" @cleared="fileSelected = null"/> 
 
      <div class="flex justify-between  space-x-6 items-center">
        <Button 
          text="Cancel"
          :hasBorder="true"
          customClass="flex !py-4 !px-11 !text-grey-300 !w-fit  !ring-grey-300" 
          @click="emit('close')"
        />

        <Button
          type="submit"
          text="Upload report"
          customClass="!py-4 !px-11 !w-fit"
          :disabled="!fileSelected"
          :loading="loading"
        />
      </div> 
    </div>
  </form>
</template>

<script setup lang="ts">  
  import { beforeFileUpload } from '~/utils/upload'; 
     
  const emit = defineEmits(['done', 'close']); 

  const { $toast } = useNuxtApp();   
  const { uploadFile } = useCommonApi(); 

  const fileSelected: Ref<any> = ref(null)
  const loading = ref(false); 
  const payload = ref({ method: '' }); 

  const handleFileSelection = (event: any) =>  fileSelected.value = event 

  const handleUpload = async () => {
    loading.value = true;
    const file = fileSelected.value 

    if (!file) {
      loading.value = false;
      return $toast('show', { type: 'warning', message: 'No file selected' });
    }   
    
    const errorMessage = beforeFileUpload(file, 'image');

    if (!errorMessage) {
      loading.value = false;
      return $toast('show', { type: 'error', message: errorMessage }); 
    }   
    await upload(file);
  }; 
  const upload = async (file: any) => {  
    loading.value = true;
    // let formData = new FormData();
    // formData.append('doc', file);

    // const response = await uploadFile(formData);
    // const { data, error } = response; 

    // loading.value = false;
    // if (error) return $toast('show', { type: 'error', message: error.message });

    // uploadInspectionReport(data.file_url); 

    setTimeout(() => {
      uploadInspectionReport(
        'https://res.cloudinary.com/vesseltrust/image/upload/v1692274839/pjdnkiqtqph9zlmy3jtw.png',
      );  
    }, 500);
  };

  const uploadInspectionReport = async (file_url: any) => { 
    // loading.value = true;
    console.log("file_url: ", file_url);
    // upload request to api
    // const response = await fundRequest(props.requestId, payload.value);
    // const { data, error } = response;
    // loading.value = false;
    // if (error) return $toast('show', { type: 'error', message: error?.message });
    // $toast('show', { type: 'success', message: data.message || 'User profile retrieved' }); 
    emit('done');
  } 
</script>

<style scoped></style>
