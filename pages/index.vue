<template>
  <div>

  </div>
</template>

<script setup>

const router = useRouter()
const route = useRoute()

onMounted(() => {
  const token = localStorage.getItem('token')

  console.log('token' , token )

  if (!token && route.path !== '/login') {
    router.push('/login')
  } else if (token && route.path === '/login') {
    router.push('/dashboard')
  } else if (token && route.path === '/') {
    router.push('/dashboard')
  }
})
</script>

<style>

</style>