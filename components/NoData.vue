import { default } from '../Icon/Filter.vue';
<template>
  <div class="flex-col flex items-center space-y-1 p-20">
    <IconNoData :type="type" :height="iconHeight" :width="iconWidth" />

    <div v-if="!hasBtn" class="space-y-2">
      <h6
        class="font-medium text-sm leading-5 cursor-pointer text-center text-grey-300"
        :class="class"
      >
        {{ title }}
      </h6>

      <h6
        v-if="hasDetailsText"
        class="font-medium text-sm leading-5 cursor-pointer text-center text-grey-100"
        :class="class"
      >
        {{ detailText }}
      </h6>
    </div>

    <div v-else class="space-y-2">
      <h4 class="text-lg font-medium cursor-pointer !text-center text-grey-300">
        {{ title }}
      </h4>

      <p class="cursor-pointer text-center text-grey-100">
        {{ detailText }}
      </p>

      <div class="w-fit mx-auto pt-4">
        <Button
          :text="btnText" 
          textSize="sm"
          class="!py-3 !px-6"
          :routeLink="routeLink"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: 'No data',
    },
    hasDetailsText: {
      type: Boolean,
      default: false,
    },
    detailText: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'generic',
    },
    iconHeight: {
      type: Number,
    },
    iconWidth: {
      type: Number,
    },
    class: {
      type: String,
    },
    hasBtn: {
      type: Boolean,
      default: false,
    },
    btnText: {
      type: String,
      default: 'View More',
    },
    routeLink: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="scss" scoped></style>
