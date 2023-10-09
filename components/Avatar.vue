<template>
  <span :class="class">
    <!-- if avatar have an image url -->
    <img v-show="hasFullImageUrl" :src="fullImageUrl" :alt="alt" class="w-full h-full" />

    <!-- if avatar does not have an image url -->
    <img v-show="!hasFullImageUrl" :src="imageUrl" :alt="alt" class="w-full h-full" />
  </span>
</template>

<script setup lang="ts">
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    hasFullImageUrl: {
      type: Boolean,
      default: false,
    },
    fullImageUrl: {
      type: String,
      default: '',
    },
    fileType: {
      type: String,
      default: 'png',
    },
    alt: {
      type: String,
      default: '',
    },
    isSubFolder: {
      type: Boolean,
      default: false,
    },
    subfolderPath: {
      type: String,
    },
    class: {
      type: String,
    },
  });

  const imageUrl = computed(() => {
    return props.isSubFolder
      ? `/images/${props.subfolderPath}/${props.name}.${props.fileType}`
      : `/images/${props.name}.${props.fileType}`;
  });
</script>
