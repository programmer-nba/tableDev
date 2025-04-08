<template>
  <LayoutMain>
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header section with improved styling -->
      <div class="flex flex-col items-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 pb-2">รายการรอยืนยัน</h1>
        <div class="w-24 h-1 bg-green-500 rounded-full mt-2"></div>
        <p class="text-gray-600 mt-4">รายการผู้ใช้งานที่รอการยืนยันในระบบ</p>
      </div>

      <!-- Card container for table -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <!-- Search and filter options -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div class="w-full md:w-64">
            <div class="relative">
              <input type="text" v-model="searchTerm" placeholder="ค้นหาผู้ใช้..."
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10" />
              <span class="absolute right-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>

          <div class="flex gap-4">
            <select v-model="filterDepartment"
              class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">แผนกทั้งหมด</option>
              <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
            </select>

            <button @click="fetchUsers"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              รีเฟรช
            </button>
          </div>
        </div>


        <div class=" gap-6 mb-6">
          <!-- <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center">
            <div class="rounded-full bg-blue-100 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">ผู้ใช้ทั้งหมด</p>
              <p class="text-xl font-bold text-gray-800">{{ users.length }}</p>
            </div>
          </div> -->

          <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-center">
            <div class="rounded-full bg-yellow-100 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">รอดำเนินการ</p>
              <p class="text-xl font-bold text-gray-800">{{ pendingCount }}</p>
            </div>
          </div>

          <!-- <div class="bg-green-50 p-4 rounded-lg border border-green-100 flex items-center">
            <div class="rounded-full bg-green-100 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">ยืนยันแล้ว</p>
              <p class="text-xl font-bold text-gray-800">{{ approvedCount }}</p>
            </div>
          </div> -->
        </div>

        <!-- Table with improved styling -->
        <div class="overflow-x-auto rounded-lg border border-gray-200">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  UUID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ชื่อ</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ตำแหน่ง</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  แผนก</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สถานะ</th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การจัดการ</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="filteredUsers.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p class="text-lg font-medium">ไม่พบข้อมูลผู้ใช้</p>
                  <p class="mt-1">ยังไม่มีรายการที่รอการยืนยันหรือตรงตามเงื่อนไขการค้นหา</p>
                </td>
              </tr>
              <tr v-for="user in filteredUsers" :key="user.uuid" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{{ user.uuid.substring(0, 8)
                  }}...</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div
                        class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
                        {{ getInitials(user.firstname, user.lastname) }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.firstname }} {{ user.lastname }}</div>
                      <div class="text-sm text-gray-500">{{ user.email || 'ไม่ระบุอีเมล' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ user.department }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(user.status)">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end gap-2">
                    <button @click="approveUser(user.uuid)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      ยืนยัน
                    </button>
                    <button @click="deleteUser(user.uuid)"
                      class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination controls -->
        <div class="mt-6 flex items-center justify-between border-t border-gray-200 bg-white pt-4">
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                แสดง <span class="font-medium">{{ filteredUsers.length > 0 ? 1 : 0 }}</span>
                ถึง <span class="font-medium">{{ filteredUsers.length }}</span>
                จาก <span class="font-medium">{{ filteredUsers.length }}</span> รายการ
              </p>
            </div>
            <div>
              <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
                <button
                  class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 bg-green-50">1</button>
                <button
                  class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
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
const searchTerm = ref('');
const filterDepartment = ref('');
const departments = ref([]);

// Get filtered users based on search and department filter
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const nameMatch = `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.uuid.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.value.toLowerCase());

    const deptMatch = filterDepartment.value === '' || user.department === filterDepartment.value;

    return nameMatch && deptMatch;
  });
});

// Count statistics
const pendingCount = computed(() => {
  return users.value.filter(user => user.status === 'รอยืนยัน').length;
});

const approvedCount = computed(() => {
  return users.value.filter(user => user.status === 'ยืนยันแล้ว').length;
});


const getInitials = (firstname, lastname) => {
  return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
};

const getStatusClass = (status) => {
  if (status === 'รอยืนยัน') {
    return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800';
  } else if (status === 'ยืนยันแล้ว') {
    return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800';
  } else {
    return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800';
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/employees/approve');
    users.value = response.data.data;
    const uniqueDepartments = [...new Set(users.value.map(user => user.department))];
    departments.value = uniqueDepartments;
  } catch (err) {
    console.error('Error fetching Users:', err);
  }
};

const approveUser = async (uuid) => {
  const confirmResult = await Swal.fire({
    title: 'คุณแน่ใจหรือไม่?',
    text: 'คุณต้องการอนุมัติพนักงานคนนี้ใช่หรือไม่?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'ใช่, อนุมัติเลย',
    cancelButtonText: 'ยกเลิก',
  });

  if (confirmResult.isConfirmed) {
    try {
      Swal.fire({
        title: 'กำลังอนุมัติ...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axios.post(`/api/employees/approve/${uuid}`);

      // const userIndex = users.value.findIndex(user => user.uuid === uuid);
      // if (userIndex !== -1) {
      //   users.value[userIndex].status = 'ยืนยันแล้ว';
      // }

      Swal.fire({
        icon: 'success',
        title: 'อนุมัติสำเร็จ',
        text: 'พนักงานได้รับการอนุมัติเรียบร้อยแล้ว',
      });

      await fetchUsers()
    } catch (err) {
      console.error('Error approving user:', err);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถอนุมัติพนักงานได้',
      });
    }
  }
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
.table {
  @apply w-full text-sm text-left text-gray-500;
}

.table thead {
  @apply text-xs text-gray-700 uppercase bg-gray-50;
}

.table th,
.table td {
  @apply px-6 py-3;
}
button,
.rounded-lg,
.rounded-full {
  @apply transition duration-300 ease-in-out;
}

button:hover {
  @apply transform scale-105;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.table tbody tr {
  animation: fadeIn 0.3s ease-in-out;
}
</style>