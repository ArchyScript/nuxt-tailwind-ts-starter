<template>
  <span class="cursor-pointer">
    <IconCopy :colorVariant="colorVariant" @click="handleCopy" />
  </span>
</template>

<script setup lang="ts">
  import { copyToClipboard } from '~/utils';
  const { $toast } = useNuxtApp();

  const props = defineProps({
    colorVariant: {
      type: String,
      default: 'blue',
    },
    text: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['copy']);

  const handleCopy = () => {
    copyToClipboard(props.text);
    $toast('show', {
      type: 'succeess',
      message: props.text,
    });
    emit('copy', props.text);
  };
</script>
