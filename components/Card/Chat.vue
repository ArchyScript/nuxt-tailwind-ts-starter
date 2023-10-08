<template>
  <div
    class="flex space-x-3 items-center px-[9px] rounded hover:bg-input-bg hover:bg-opacity-50 cursor-pointer"
  >
    <div class="h-9 w-9 rounded-full ring-1 ring-secondary-500">
      <img src="~/public/images/img-1.png" class="w-full h-full rounded-full" />
    </div>

    <div
      class="flex-1 flex-col space-y-2 truncate border-b-[0.8px] border-ui-bg py-3.5 space-y-[5px]"
    >
      <div class="space-x-5 flex items-center truncate">
        <h6 class="flex-1 text-grey-500 truncate">{{ chat.username }}</h6>
        <p class="text-grey-300 capitalize text-[10px] text-sm">{{ chat.date }}</p>
      </div>

      <div class="space-x-2 flex items-center truncate">
        <p class="flex-1 text-sm text-grey-400 truncate leading-[160%]">
          {{ chat.message }}
        </p>

        <span
          v-if="chat.unreadMessages >= 1"
          class="bg-primary-500 text-primary-50 h-5 w-5 capitalize text-[10px] text-sm rounded-full flex justify-center items-center"
        >
          {{ chat.unreadMessages }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    chat: {
      type: Object,
      default: {
        photo_url: '',
        username: '',
        unreadMessages: 0,
        date: ``,
        message: '',
        id: '',
      },
    },
  });
</script>
