<template>
  <div 
    v-if="qrCodeUrl" 
    class="w-fit border-[0.1px] border-grey-100 rounded-lg"
    :class="`${colorVariant == 'grey' && 'border-grey-100'}`"
  >
    <img
      :src="qrCodeUrl"
      alt="QR Code"
      class="max-w-full rounded-lg border border-primary-500`"
      :class="`${size == 'sm' && 'h-[170px]'} ${size == 'md' && 'h-[263px] w-[233px]'}`"
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
    size: {
      type: String,
      default: 'md',
    }, 
    colorVariant: {
      type: String,
      default: 'grey',
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
