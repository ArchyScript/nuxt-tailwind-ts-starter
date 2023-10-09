<template>
  <div v-if="qrCodeUrl" class="w-fit border border-primary-500 rounded-lg">
    <img
      :src="qrCodeUrl"
      alt="QR Code"
      class="h-[170px] max-w-full rounded-lg border border-primary-500`"
    />
  </div>
</template>

<script setup lang="ts">
  import QRCode from 'qrcode';

  const props = defineProps({
    text: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 170,
    },
    height: {
      type: Number,
      default: 170,
    },
  });

  //   const text = ref<string>('');
  const qrCodeUrl = ref<string | null>(null);

  const generateQRCode = async () => {
    if (props.text.trim() !== '') {
      try {
        const qrDataURL = await QRCode.toDataURL(props.text);
        qrCodeUrl.value = qrDataURL;
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    }
  };

  onMounted(() => generateQRCode());
</script>
