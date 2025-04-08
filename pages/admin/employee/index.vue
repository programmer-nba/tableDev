<template>
  <LayoutMain>
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-center items-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 border-b-4 border-green-500 pb-2">
          พนักงานทั้งหมด
        </h1>
      </div>

      <div class="mt-4 md:mt-0 justify-between mb-4 flex space-x-2">
        <div class="relative">
          <input v-model="searchTerm" type="text" placeholder="ค้นหาพนักงาน"
            class="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          <span class="absolute left-2 top-2.5 text-gray-400">
            🔍
          </span>
        </div>
        <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200">
          + เพิ่มพนักงาน
        </button>
      </div>

      <div class=" gap-6 mb-6">
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center">
            <div class="rounded-full bg-blue-100 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">พนักงานทั้งหมด</p>
              <p class="text-xl font-bold text-gray-800">{{ users.length }}</p>
            </div>
          </div>
        </div>

      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full table-auto">
            <!-- head -->
            <thead>
              <tr class="bg-gray-100 text-gray-700 border-b">
                <th class="px-6 py-4 text-left">UUID</th>
                <th class="px-6 py-4 text-left">รูป</th>
                <th class="px-6 py-4 text-left">ชื่อ</th>
                <th class="px-6 py-4 text-left">ตำแหน่ง</th>
                <th class="px-6 py-4 text-left">แผนก</th>
                <th class="px-6 py-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" class="border-b">
                <td colspan="6" class="px-6 py-10 text-center text-gray-500">
                  <div class="flex justify-center items-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    <span class="ml-2">กำลังโหลดข้อมูล...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="filteredUsers.length === 0" class="border-b">
                <td colspan="6" class="px-6 py-10 text-center text-gray-500">
                  ไม่พบข้อมูลพนักงาน
                </td>
              </tr>
              <tr v-for="user in filteredUsers" :key="user.id"
                class="border-b hover:bg-gray-50 transition duration-150">
                <td class="px-6 py-4 text-sm font-mono text-gray-500">{{ user.uuid }}</td>
                <td class="px-6 py-4">
                  <!-- <div
                    class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden border border-gray-300">
                    {{ user.firstname?.[0]?.toUpperCase() || "?" }}{{ user.lastname?.[0]?.toUpperCase() || "" }}
                  </div> -->
                  <div v-if="user.image">
                    <img :src="user.image" alt="profile-pic" class="w-24 h-24 rounded-md">
                  </div>
                  <div v-else>
                    <p class="text-sm text-red-500">ยังไม่ได้เพิ่มรูป</p>
                  </div>
                </td>
                <td class="px-6 py-4 font-medium">{{ user.firstname }} {{ user.lastname }}</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 text-xs rounded-full" :class="getRoleBadgeClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 text-gray-600">{{ user.department }}</td>
                <td class="px-6 py-4">
                  <div class="flex gap-2 justify-end">
                    <button
                      class="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition duration-200"
                      @click="editUser(user)">
                      แก้ไข
                    </button>
                    <button class="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition duration-200"
                      @click="deleteUser(user.uuid)">
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-6 flex justify-between items-center">
        <div class="text-sm text-gray-600">
          แสดง {{ filteredUsers.length }} จาก {{ users.length }} รายการ
        </div>
        <div class="flex space-x-1">
          <button class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 transition duration-200">
            ก่อนหน้า
          </button>
          <button class="px-3 py-1 bg-green-500 text-white rounded">
            1
          </button>
          <button class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 transition duration-200">
            2
          </button>
          <button class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 transition duration-200">
            3
          </button>
          <button class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 transition duration-200">
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import LayoutMain from '~/layouts/LayoutMain.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const users = ref([]);

const loading = ref(true);
const searchTerm = ref('');
const showDeleteModal = ref(false);
const selectedUser = ref(null);

const filteredUsers = computed(() => {
  if (!searchTerm.value) return users.value;

  const term = searchTerm.value.toLowerCase();
  return users.value.filter(user =>
    user.firstname.toLowerCase().includes(term) ||
    user.lastname.toLowerCase().includes(term) ||
    user.role.toLowerCase().includes(term) ||
    user.department.toLowerCase().includes(term)
  );
});

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await axios.get('/api/users');
    users.value = response.data.data;
  } catch (err) {
    console.error('Error fetching Users:', err);
  } finally {
    loading.value = false;
  }
}


const getRoleBadgeClass = (role) => {
  const roles = {
    'admin': 'bg-purple-100 text-purple-800',
    'หัวหน้าทีม': 'bg-blue-100 text-blue-800',
    'employee': 'bg-green-100 text-green-800',
    'ฝึกงาน': 'bg-yellow-100 text-yellow-800'
  };

  return roles[role] || 'bg-gray-100 text-gray-800';
};

const editUser = (user) => {
  // ลิงค์ไปยังหน้าแก้ไขหรือเปิด modal แก้ไข
  console.log('Editing user:', user);
};

const confirmDelete = (user) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

const deleteUser = async (uuid) => {
  const confirmResult = await Swal.fire({
    title: 'คุณแน่ใจหรือไม่?',
    text: 'คุณต้องการลบผู้ใช้นี้จริง ๆ หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ใช่, ลบเลย',
    cancelButtonText: 'ยกเลิก',
  });

  if (confirmResult.isConfirmed) {
    try {
      Swal.fire({
        title: 'กำลังลบ...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axios.delete(`/api/employees/${uuid}`);

      // users.value = users.value.filter(user => user.uuid !== uuid);

      Swal.fire({
        icon: 'success',
        title: 'ลบสำเร็จ',
        text: 'ผู้ใช้ถูกลบเรียบร้อยแล้ว',
      });

      await fetchUsers()
    } catch (err) {
      console.error('Error deleting user:', err);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถลบผู้ใช้ได้',
      });
    }
  }
};

onMounted(async () => {
  await fetchUsers();
});
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>