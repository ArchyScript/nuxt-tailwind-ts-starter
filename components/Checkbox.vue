<template>
  <span @click="handleCheck" class="cursor-pointer">
    <span v-if="value" class="text-primary-500 h-6 w-6 inline-flex justify-center items-center">
      <IconCheckbox :height="24" :width="24" type="square" />
    </span>

    <span v-else class="inline-flex border-2 border-grey-200 h-6 w-6 rounded-md"></span>
  </span>
</template>

<script setup lang="ts">
  const props = defineProps({
    value: {
      type: Boolean,
      default: false,
    },
    colorVariant: {
      type: String,
      default: 'primamry',
    },
    size: {
      type: String,
      default: 'base',
    },
  });

  const emit = defineEmits('checked');

  const handleCheck = () => {
    emit('checked', !props.value);
  };
</script>
