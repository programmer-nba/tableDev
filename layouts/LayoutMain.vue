<template>
  <div class="flex">
    <Sidebar />
    <div class="ml-64 w-full">
      <Navbar />
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<style scoped>
</style>
