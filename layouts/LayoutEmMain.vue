<template>
  <div class="flex">
    <SidebarEm />
    <div class="ml-64 w-full">
      <NavbarEm />
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import NavbarEm from '@/components/NavbarEm.vue'
import SidebarEm from '@/components/SidebarEm.vue'
</script>

<style scoped>
</style>
