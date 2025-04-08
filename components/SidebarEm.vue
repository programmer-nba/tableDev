<template>

  <aside class="fixed top-0 left-0 h-full w-64 bg-gray-700 text-white p-5">
    <div class="flex justify-center text-3xl">
      <p class="text-green-500 font-bold">Table</p>
      <p class="">Dev</p>
    </div>
    <div class="mt-5">
      <ul>
        <li>
          <RouterLink to="/dashboard" class="flex items-center gap-2 py-3 px-4 hover:bg-gray-700 rounded">
            <Home class="w-5 h-5" />
            หน้าแรก
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/projects" class="flex items-center gap-2 py-3 px-4 hover:bg-gray-700 rounded">
            <Folder class="w-5 h-5" />
            โปรเจค
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/profile" class="flex items-center gap-2 py-3 px-4 hover:bg-gray-700 rounded">
            <UserRoundPen class="w-5 h-5" />
            โปรไฟล์
          </RouterLink>
        </li>
        <li>
          <a @click="authStore.logout()" href="#" class="flex items-center gap-2 py-3 px-4 hover:bg-gray-700 rounded">
            <LogOut class="w-5 h-5" />
            ออกจากระบบ
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { Home, Users, Folder, LogOut, FileClock, UserRoundPen } from 'lucide-vue-next'
import { useAuthStore } from '#imports';

const authStore = useAuthStore()
</script>

<style scoped></style>
