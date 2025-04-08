<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useAuthStore } from '#imports';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const route = useRoute()

onMounted(async() => {
  console.log('authStore : ' , authStore.isAuthenticated)
})

onMounted(() => {
  const token = localStorage.getItem('token')

  if (!token && route.path !== '/login') {
    router.push('/login')
  } else if (token && route.path === '/login') {
    router.push('/dashboard')
  }
})
</script>

<style>
* {
  font-family: 'Prompt', sans-serif;
}
</style>
