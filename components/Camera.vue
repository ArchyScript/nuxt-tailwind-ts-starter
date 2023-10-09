<template>
  <div class="text-center">
    <ModalsProcessing v-if="isValidating" message="Validating picture..." />

    <div v-else>
      <ModalsResponse
        v-if="validationErrorMessage"
        type="error"
        titleText="Verification Error"
        title="Your identity verification failed"
        :message="validationErrorMessage"
        btnContinueText="Try again"
        @next="restartVerificationProcess"
        @close="onClose"
      />

      <div v-else class="space-y-0.5">
        <p class="text-grey-500 font-normal text-center py-2">
          Take a clear photograph of yourself
        </p>

        <div class="camera" v-if="!dataImageUrl">
          <video id="video" ref="videoElement" class="!w-full" autoplay>
            Video stream not available.
          </video>
        </div>

        <div class="output py-2" v-else>
          <img :src="dataImageUrl" alt="your dataImageUrl" />
        </div>

        <p class="text-sm text-grey-500 leading-5 text-left py-2">
          Note: Stay close enough to the camera to ensure your face covers a larger portion of the
          camera
        </p>

        <div>
          <div v-if="!dataImageUrl" class="flex items-center justify-center">
            <Button
              @click="takePicture"
              text="Snap"
              customClass="!py-4 !px-10 !text-white !font-medium !leading-[160%] !w-fit"
              class="btn-shadow"
            />
          </div>

          <div v-else class="flex items-center justify-center space-x-6 w-[80%] mx-auto pb-2">
            <Button
              @click="retakePhoto"
              text="Retake"
              :hasBorder="true"
              customClass="!py-3 !px-10 !bg-white !font-medium !leading-[160%]"
            />

            <Button
              customClass="!py-4 !px-10 !text-white !font-medium !leading-[160%]"
              class="btn-shadow"
              @click="validatePicture"
              text="Verify"
            />
          </div>
        </div>
      </div>

      <canvas id="canvas" ref="canvasElement" width="360" height="240"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
  const isValidating: Ref<boolean> = ref(false);
  const validationErrorMessage: Ref<string> = ref('');
  const dataImageUrl: Ref<string> = ref('');
  const videoElement: Ref<HTMLVideoElement | null> = ref(null);
  const videoStream: Ref<MediaStream | null> = ref(null);
  const canvasElement: Ref<HTMLCanvasElement | null> = ref(null);

  //  watch
  watch(dataImageUrl, (newValue) => {
    if (newValue) {
      stop();
    }
  });

  // Emit
  const emit = defineEmits(['validate', 'close']);

  const onClose = async () => emit('close');
  const onValidate = async () => {
    isValidating.value = false;
    stop();

    emit('validate', dataImageUrl.value);
  };

  // functions
  const takePicture = (): void => {
    if (canvasElement.value && videoElement.value) {
      const context = canvasElement.value.getContext('2d');

      if (context) {
        context.imageSmoothingEnabled = false;
        const { width, height } = canvasElement.value;

        if (width && height) {
          context.fillRect(0, 0, width, height);
          context.drawImage(videoElement.value, 0, 0, width, height);

          const longImageDataString: string = canvasElement.value.toDataURL('image/png');
          dataImageUrl.value = longImageDataString;
        } else {
          retakePhoto();
        }
      }
    }
  };
  const validatePicture = async (): Promise<void> => {
    handleError('');
    isValidating.value = true;

    if (!dataImageUrl.value.length)
      return handleError('Please take a clear picture of your face to proceed');
    onValidate();
  };
  const startup = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream: any) => {
        videoStream.value = stream;
        if (videoElement.value) {
          videoElement.value.srcObject = stream;
          videoElement.value.play();
          videoStream.value = stream;
        }
      })
      .catch((err) => {
        handleError('Give access to the site to use your camera');
      });
  };
  const stop = (): void => {
    try {
      if (videoElement.value) {
        videoElement.value.pause();
        videoElement.value.srcObject = null;
      }

      if (videoStream.value) {
        const tracks = videoStream.value.getTracks();
        tracks[0].stop();
      }
    } catch (e) {
      handleError('Error: camera could not be stopped at this time');
    }
  };
  const retakePhoto = () => {
    if (canvasElement.value) {
      const context = canvasElement.value.getContext('2d');

      if (context) {
        context.imageSmoothingEnabled = false;
        context.fillStyle = '#AAA';
        context.fillRect(0, 0, canvasElement.value.width, canvasElement.value.height);

        dataImageUrl.value = '';
        startup();
      }
    }
  };
  const handleError = (message: string) => {
    isValidating.value = false;
    validationErrorMessage.value = message;
  };
  const restartVerificationProcess = () => {
    isValidating.value = false;
    validationErrorMessage.value = '';
    retakePhoto();
  };

  // Hooks
  onErrorCaptured((error: Error) => {
    handleError(error.message);
    return true;
  });

  // lifecycle
  onMounted(() => startup());
  onBeforeUnmount(() => stop());
</script>

<style scoped>
  .output img,
  #canvas,
  #video {
    padding: 10px;
    width: 360px;
    height: 240px;
  }

  #canvas {
    display: none;
  }

  .camera,
  .output {
    width: 360px;
    display: inline-block;
  }
</style>
