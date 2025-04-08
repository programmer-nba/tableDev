<template>
  <LayoutEmMain>
    <div class="max-w-4xl mx-auto p-6">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Header with gradient background -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h1 class="text-2xl font-bold"></h1>
        </div>

        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Profile Image Section -->
            <div class="flex-shrink-0">
              <div class="w-40 h-40 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow">
                <div v-if="users.image" class="w-full h-full">
                  <img :src="users.image" alt="รูปโปรไฟล์" class="w-full h-full object-cover">
                </div>
                <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
                  <RouterLink to="/profile" class="text-blue-500 hover:text-blue-700 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="mt-2 text-sm font-medium">เพิ่มรูป</span>
                  </RouterLink>
                </div>
              </div>
            </div>

            <!-- User Info Section -->
            <div class="flex-grow">
              <div class="space-y-4">
                <div class="border-b pb-3">
                  <h2 class="text-2xl font-bold text-gray-800">{{ users.firstname }} {{ users.lastname }}</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-500">ตำแหน่ง</p>
                      <p class="font-semibold text-gray-800">{{ users.role || 'ไม่ระบุ' }}</p>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-500">แผนก</p>
                      <p class="font-semibold text-gray-800">{{ users.department || 'ไม่ระบุ' }}</p>
                    </div>
                  </div>
                </div>
              </div>


              <!-- <div class="mt-6 flex flex-wrap gap-3">
                <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  แก้ไขข้อมูล
                </button>
                <button class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  รายงาน
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutEmMain>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LayoutEmMain from '~/layouts/LayoutEmMain.vue';
import axios from 'axios';

const user = ref(null);
const users = ref({});

const fetchUsers = async () => {
  try {
    const response = await axios.get(`/api/employees/${user.value.uuid}`);
    users.value = response.data.data;
    console.log('ข้อมูลพนักงาน:', users.value);
  } catch (err) {
    console.error('Error fetching employee data:', err);
  }
};

onMounted(async() => {
  if (process.client) {
    user.value = JSON.parse(localStorage.getItem('user'));
  }
  
  await fetchUsers();
}); 
</script>