<template>
  <LayoutMain>
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex flex-col items-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">รายการปิดโปรเจค</h1>
        <div class="h-1 w-32 bg-green-500 rounded"></div>
      </div>

      <!-- Stats cards -->
      <div class="grid grid-cols-1 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">จำนวนโปรเจคที่ปิด</p>
              <p class="text-xl font-bold">{{ projects.length }} โปรเจค</p>
            </div>
          </div>
        </div>
        
        <!-- <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">`
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">อัพเดทล่าสุด</p>
              <p class="text-xl font-bold">{{ new Date().toLocaleDateString('th-TH') }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">สถานะ</p>
              <p class="text-xl font-bold text-green-600">ปิดงานแล้ว</p>
            </div>
          </div>
        </div> -->
      </div>

      <!-- Search and filter -->
      <div class="flex flex-col md:flex-row md:justify-between mb-6">
        <div class="mb-4 md:mb-0">
          <div class="relative">
            <input
              type="text"
              v-model="searchTerm"
              placeholder="ค้นหาโปรเจค..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <!-- <div class="flex gap-4">
          <button @click="printReport" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            พิมพ์รายงาน
          </button>
          <button @click="exportToExcel" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            ส่งออก Excel
          </button>
        </div> -->
      </div>

      <!-- Projects table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th @click="sortBy('projectId')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  <div class="flex items-center">
                    เลขโปรเจกต์
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th @click="sortBy('name')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  <div class="flex items-center">
                    ชื่อโปรเจกต์
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่เริ่ม - วันที่สิ้นสุด</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="project in filteredProjects" :key="project.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ project.projectId }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{ project.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{ project.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ formatDate(project.startDate) }} - {{ formatDate(project.endDate) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="viewDetails(project)" class="text-blue-600 hover:text-blue-900 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <!-- <button @click="generateReport(project)" class="text-green-600 hover:text-green-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button> -->
                </td>
              </tr>
              <!-- Empty state -->
              <tr v-if="filteredProjects.length === 0">
                <td colspan="5" class="px-6 py-12 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="mt-2 text-gray-500">ไม่พบโปรเจคที่ปิดงานแล้ว</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                แสดง <span class="font-medium">{{ filteredProjects.length > 0 ? 1 : 0 }}</span> ถึง <span class="font-medium">{{ filteredProjects.length }}</span> จากทั้งหมด <span class="font-medium">{{ filteredProjects.length }}</span> รายการ
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</a>
                <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </a>
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
import Swal from 'sweetalert2';
import axios from 'axios';
import LayoutMain from '~/layouts/LayoutMain.vue';

const projects = ref([]);
const searchTerm = ref('');
const sortKey = ref('projectId');
const sortDirection = ref('asc');

const filteredProjects = computed(() => {
  if (!searchTerm.value) return projects.value;
  
  const term = searchTerm.value.toLowerCase();
  return projects.value.filter(project => 
    project.projectId.toLowerCase().includes(term) || 
    project.name.toLowerCase().includes(term)
  );
});

const fetchProjects = async () => {
  try {
    const response = await axios.get('/api/projects');
    projects.value = response.data.data.filter(project => project.status === 'ปิดงาน');
    
    sortProjects();
  } catch (err) {
    console.error('Error fetching Projects:', err);
    showError('ไม่สามารถดึงข้อมูลโปรเจคได้');
  }
};

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
  
  sortProjects();
};

const sortProjects = () => {
  projects.value.sort((a, b) => {
    let valueA = a[sortKey.value];
    let valueB = b[sortKey.value];
    
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    if (valueA < valueB) return sortDirection.value === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const viewDetails = (project) => {
  Swal.fire({
    title: 'รายละเอียดโปรเจค',
    html: `
      <div class="text-left">
        <p><strong>เลขโปรเจกต์:</strong> ${project.projectId}</p>
        <p><strong>ชื่อโปรเจกต์:</strong> ${project.name}</p>
        <p><strong>สถานะ:</strong> ${project.status}</p>
        <p><strong>วันที่เริ่ม:</strong> ${formatDate(project.startDate)}</p>
        <p><strong>วันที่สิ้นสุด:</strong> ${formatDate(project.endDate)}</p>
      </div>
    `,
    confirmButtonColor: '#10B981',
    confirmButtonText: 'ปิด'
  });
};


const showError = (message) => {
  Swal.fire({
    title: 'เกิดข้อผิดพลาด',
    text: message,
    icon: 'error',
    confirmButtonColor: '#EF4444',
    confirmButtonText: 'ตกลง'
  });
};

onMounted(async () => {
  await fetchProjects();
  console.log('projects : ', projects.value);
});
</script>

<style>
.table-container {
  overflow-x: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Hover effect on table rows */
tr:hover td {
  background-color: rgba(16, 185, 129, 0.05);
  transition: background-color 0.2s ease;
}
</style>