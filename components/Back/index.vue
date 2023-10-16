<template>
  <div
    class="flex items-center space-x-2 px-0.5 w-fit cursor-pointer"
    @click="goBack"
  >
    <span class="font-normal text-grey-600 text-sm leading-5">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      default: "Go back",
    },
    routerLink: {
      type: String,
      default: "",
    },
  })

  const router = useRouter()

  const goBack = () => {
    if (props.routerLink && props.routerLink.length > 1)
      return router.push(props.routerLink)

    router.go(-1)
  }
</script>
