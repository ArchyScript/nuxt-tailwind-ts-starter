<template>
  <div>
    <ModalsProcessing
      v-if="isVerifyingOrUploading"
      :message="verifyingOrUploadingMessage"
    />

    <div v-else>
      <LivenessVerificationCamera
        v-if="showCamera"
        @validate="verifyPicture"
        @close="closeModal"
      />

      <!--  -->
      <template v-else>
        <ModalsResponse
          v-if="failedVerificationMessage"
          type="error"
          :titleText="failedVerificationTitle"
          :message="failedVerificationMessage"
          btnContinueText="Try again"
          @next="restartVerificationProcess"
          @close="showCamera = true"
        />

        <ModalsResponse
          v-else
          message="Your identity has been verified"
          :hasTitle="false"
          @next="onUploaded"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { uploadFile, livenessCheck } = useCommonApi()
  import { dataImageURLtoFile } from "~/utils/upload"

  const props = defineProps({
    showLiveness: {
      type: Boolean,
      default: false,
    },
  })

  //
  const isVerifyingOrUploading: Ref<boolean> = ref(false)
  const failedVerificationTitle: Ref<string> = ref("")
  const failedVerificationMessage: Ref<any> = ref(null)
  const verifyingOrUploadingMessage: Ref<string> = ref("")
  const imageUrl: Ref<string> = ref("")
  const dataImageUrl: Ref<string> = ref("")
  const showCamera: Ref<boolean> = ref(true)

  // Emit
  const emit = defineEmits(["close", "done"])
  const closeModal = async () => emit("close")
  const onUploaded = () => emit("done", imageUrl.value)

  //   Funtions
  const verifyPicture = async (data_image_url: string) => {
    dataImageUrl.value = data_image_url
    handleVerifyingOrUploading("Verifying Picture liveness...")

    // const response = await  livenessCheck({file_url: "data_image_url"})
    // const { data, error } = response

    // if (error) return handleError("Verification Error", error.message)

    // handleVerifyingOrUploading("Pictrue verified. Please wait...")

    const imageFile = dataImageURLtoFile(data_image_url)
    if (!imageFile)
      return handleError("", "something went wrong... please try again")

    uploadSelfie(imageFile)
  }
  const uploadSelfie = async (file: any) => {
    handleVerifyingOrUploading("Uploading picture...")
    // const formData = new FormData()
    // formData.append("doc", file)

    // const response = await uploadFile(formData)
    // const { data, error } = response

    // if (error) return handleError("Upload Error", error.message)
    // imageUrl.value = data.file_url

    // handleSuccess()

    setTimeout(() => {
      imageUrl.value =
        "https://res.cloudinary.com/vesseltrust/image/upload/v1692274839/pjdnkiqtqph9zlmy3jtw.png"
      handleSuccess()
    }, 500)
  }
  const handleSuccess = () => {
    isVerifyingOrUploading.value = false
    showCamera.value = false
    failedVerificationMessage.value = ""
    failedVerificationTitle.value = ""
    verifyingOrUploadingMessage.value = ""
  }
  const handleVerifyingOrUploading = (message: string) => {
    isVerifyingOrUploading.value = true
    verifyingOrUploadingMessage.value = message
    failedVerificationMessage.value = ""
  }
  const handleError = (title: string, message: string) => {
    isVerifyingOrUploading.value = false
    showCamera.value = false
    failedVerificationTitle.value = title || "Verification Error"
    failedVerificationMessage.value = message
    verifyingOrUploadingMessage.value = ""
  }
  const restartVerificationProcess = () => {
    verifyPicture(dataImageUrl.value)
  }
</script>

<style scoped>
  p {
    font-weight: var(--font-medium);
  }

  small {
    font-size: 90%;
  }
</style>
