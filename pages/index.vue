<script setup lang="ts">
  const { $loading } = useNuxtApp()
  const router = useRouter()

  onBeforeMount(() => {
    $loading().stop()
    router.push("/home")
  })
</script>
