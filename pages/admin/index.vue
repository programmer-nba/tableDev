<template>
  <LayoutMain>
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-center mb-8">
        <h1 class="font-bold text-3xl text-gray-800">ADMIN DASHBOARD</h1>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Users Card -->
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Total Users</p>
              <p class="text-3xl font-bold text-gray-800">{{ users.length }}</p>
            </div>
          </div>
        </div>
        
        <!-- Projects Card -->
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Total Projects</p>
              <p class="text-3xl font-bold text-gray-800">{{ projects.length }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Data Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Users Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="bg-blue-500 text-white px-6 py-4">
            <h2 class="text-lg font-semibold">Users</h2>
          </div>
          <div class="p-4">
            <div v-if="users.length === 0" class="text-center py-4 text-gray-500">
              Loading users...
            </div>
            <div v-else class="overflow-x-auto">
              <table class="min-w-full bg-white">
                <thead>
                  <tr>
                    <th class="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">UUID</th>
                    <th class="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">ชื่อ</th>
                    <th class="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">ตำแหน่ง</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users.slice(0, 5)" :key="user.id" class="hover:bg-gray-50">
                    <td class="px-4 py-2 border-b border-gray-200 text-sm">{{ user.uuid }}</td>
                    <td class="px-4 py-2 border-b border-gray-200 text-sm">{{ user.firstname }} {{ user.lastname }}</td>
                    <td class="px-4 py-2 border-b border-gray-200 text-sm">{{ user.department }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="text-right mt-2">
                <RouterLink to="/admin/employee" class="text-blue-500 text-sm font-medium hover:underline">View All Users</RouterLink>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Projects Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="bg-green-500 text-white px-6 py-4">
            <h2 class="text-lg font-semibold">Projects</h2>
          </div>
          <div class="p-4">
            <div v-if="projects.length === 0" class="text-center py-4 text-gray-500">
              Loading projects...
            </div>
            <div v-else class="overflow-x-auto">
              <table class="min-w-full bg-white">
                <thead>
                  <tr>
                    <th class="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">ProjectID</th>
                    <th class="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">ชื่อโปรเจกต์</th>
                    <th class="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="project in projects.slice(0, 5)" :key="project.id" class="hover:bg-gray-50">
                    <td class="px-4 py-2 border-b border-gray-200 text-sm">{{ project.projectId }}</td>
                    <td class="px-4 py-2 border-b border-gray-200 text-sm">{{ project.name }}</td>
                    <td class="px-4 py-2 border-b border-gray-200 text-sm">
                      <span :class="`px-2 py-1 rounded-full text-xs ${project.status === 'เปิดงาน' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`">
                        {{ project.status || 'N/A' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-right mt-2">
                <RouterLink to="/admin/projects" class="text-green-500 text-sm font-medium hover:underline">View All Projects</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>

<script setup>
import LayoutMain from '~/layouts/LayoutMain.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const projects = ref([]);

const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/users');
    users.value = response.data.data;
  } catch (err) {
    console.error('Error fetching Users:', err);
  }
};

const fetchProjects = async () => {
  try {
    const response = await axios.get('/api/projects');
    projects.value = response.data.data;
  } catch (err) {
    console.error('Error fetching Projects:', err);
  }
};

onMounted(async () => {
  await fetchUsers();
  await fetchProjects();
});
</script>