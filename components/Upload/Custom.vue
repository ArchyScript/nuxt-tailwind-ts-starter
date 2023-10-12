<template>
    <div class="space-y-4"> 
        <form> 
            <el-upload
                class="upload-demo"
                drag
                action="#"
                :class="!fileSelected && 'mt-4'"
                :on-change="handleChange"
                :data="fileSelected"
                :on-progress="onProgress"
                :before-upload="beforeAvatarUpload"
                :mulitple="true"
            >
                <div class="flex justify-center items-center rotate-90"> 
                    <IconLogout :height="24" :width="24"  />
                </div>

                <div class="my-2 text-xs font-semibold">
                    Drag & Drop or <span class="text-primary-500"> Choose file  </span>
                    to upload
                </div>

                <div class="text-gray-500 text-xs font-medium">.pdf, .docx,</div>
            </el-upload>
        </form>
 
        <section class="p-4 space-y-2 bg-input-bg" v-if="fileSelected">
            <div class="flex items-center space-x-1.5">
                <div class="text-grey-500">
                    <IconFile fileType="type-2" :height="32" :width="32" />
                </div>

                <div class="flex-1 flex-col space-y-1 truncate">
                    <h6 class="truncate text-sm font-medium leading-[160%]"> Name <!-- {{ "selectedFile.name" }} --> </h6>

                    <p class="text-xs space-x-2 text-grey-300 font-medium">
                        <span> {{ formatBytes(300000) }} </span>
                        <span> | </span>
                        <span> 4 seconds left </span>
                    </p>
                </div> 
            
                <div class="flex flex-col space-y-1"> 
                    <span class="text-grey-300 p-[3.2px] cursor-pointer" @click="clear">
                        <IconClose  :height="12" :width="12"/>
                    </span>

                    <span class="inline-block text-[10px] leading-[160%] font-semibold text-grey-300">
                        <!-- {{formatBytes(selectedFile?.total)}} --> 50%
                    </span>
                </div>
            </div>

            <!-- Progres bar --> 
            <div class="h-2 w-full bg-ui-bg rounded-[60px]"> 
                <p class="h-full bg-success-500 w-2/5 rounded-[60px]"> </p>
                <!-- :style="`width: ${formatBytes(selectedFile.percent)%};`" -->
            </div>
        </section> 
    </div>
</template>

<script setup lang="ts">  
const props = defineProps({
    uploadId: {
        type: String,
        default: '',
    }
})
 
const fileSelected: Ref<any> = ref(null) 

const selectedFile: Ref<any> = ref({
    name: "",
    speed: 0,
    percent: 0,
    loaded: 0,
    total: 0,
})  

const emit = defineEmits(['done', 'cleared']);

const clear = () => {
  emit('cleared');

  fileSelected.value = null; 

  selectedFile.value.name = "";
  selectedFile.value.speed = 0;
  selectedFile.value.percent =  0;
  selectedFile.value.loaded = 0;
  selectedFile.value.total =  0;  
}

const  handleChange = (event: any) => {
    fileSelected.value = event;
    selectedFile.value.name = event.name;
}

const beforeAvatarUpload = (rawFile: any) => { 
    return true;
}

const formatBytes = (bytes: any) => { 
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const sizeIndex = Math.floor(Math.log(bytes) / Math.log(1024));

    return (
    parseFloat((bytes / Math.pow(1024, sizeIndex)).toFixed(1)) +
    " " +
    sizes[sizeIndex]
    );
}
 
const onProgress = (event: any) => {  
  const { loaded, total, percent } = event;
  selectedFile.value.loaded = loaded;
  selectedFile.value.total = total;
  selectedFile.value.percent = percent;

  console.log('event:::', event)
 
  // if (percent == 100) 

  emit("done", fileSelected.value);
}
</script>

<style scoped></style>
