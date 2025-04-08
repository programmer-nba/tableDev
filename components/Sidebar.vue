<template>
  <aside class="fixed top-0 left-0 h-full w-64 bg-gray-700 text-white p-5">
    <div class="flex justify-center text-3xl">
      <p class="text-green-500 font-bold">Table</p>
      <p class="">Dev</p>
    </div>
    <div class="mt-5">
      <ul>
        <li>
          <RouterLink to="/admin" class="flex items-center gap-2 py-3 px-4 hover:bg-gray-600 duration-200 rounded">
            <Home class="w-5 h-5" />
            หน้าแรก
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/employee" class="flex items-center gap-2 py-3 px-4 hover:bg-gray-600 duration-200 rounded">
            <Users class="w-5 h-5" />
            พนักงาน
          </RouterLink>
        </li>
        <li>
          <div @click="isProjectMenuOpen = !isProjectMenuOpen"
            class="flex justify-between items-center cursor-pointer py-3 px-4 hover:bg-gray-600 rounded">
            <div class="flex items-center gap-2">
              <Folder class="w-5 h-5" />
              <span>โปรเจค</span>
            </div>
            <span>{{ isProjectMenuOpen ? '▾' : '▸' }}</span>
          </div>

          <!-- submenu -->
          <ul v-if="isProjectMenuOpen" class="ml-4 mt-2 space-y-1">
            <li>
              <RouterLink to="/admin/projects" class="block py-2 px-4 hover:bg-gray-600 rounded">ทั้งหมด</RouterLink>
            </li>
            <li>
              <RouterLink to="/admin/projects/close" class="block py-2 px-4 hover:bg-gray-600 rounded">ปิดงาน</RouterLink>
            </li>
          </ul>
        </li>
        <li>
          <RouterLink to="/admin/approve" class="flex items-center gap-2 py-3 px-4 hover:bg-gray-600 duration-200 rounded">
            <FileClock class="w-5 h-5" />
            รอยืนยัน
          </RouterLink>
        </li>
        <li>
          <a @click="authStore.logout()" href="#" class="flex items-center gap-2 py-3 px-4 hover:bg-gray-600 duration-200 rounded">
            <LogOut class="w-5 h-5" />
            ออกจากระบบ
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '#imports'
import { Home, Users, Folder, LogOut, FileClock  , UserRoundPen } from 'lucide-vue-next'

const authStore = useAuthStore()
const isProjectMenuOpen = ref(false)
</script>
