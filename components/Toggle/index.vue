<template>
  <div>
    <span
      :class="`inline-block relative w-[50px] h-[23px]  rounded-full focus:outline-none 
      ${disabled ? '!cursor-not-allowed' : 'cursor-pointer'} `"
      role="checkbox"
      tabindex="0"
      @keydown.space.prevent="toggle"
      @click="toggle"
      :aria-checked="value.toString()"
    >
      <span
        class="toggle-background absolute rounded-full h-8 w-16"
        :class="value ? 'bg-primary-500' : 'bg-primary-50'"
      />
      <span
        class="toggle-indicator absolute h-6 w-6 border left-[5px] -bottom-[5px] shadow-md rounded-full"
        :class="value ? 'bg-white border-white' : 'bg-primary-500 border-primary-bg-ui-bg'"
        :style="value ? 'transform: translateX(28px);' : 'transform: translateX(0px);'"
      />
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['toggle']);
  const toggle = () => {
    if (props.disabled) return;
    emit('toggle', !props.value);
  };
</script>

<style scoped>
  .toggle-background {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.4s ease;
  }

  .toggle-indicator {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease;
  }
</style>
