<template>
  <LayoutMain>
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex justify-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 border-b-4 border-green-500 pb-2">โปรเจคทั้งหมด</h1>
      </div>

      <div class="mb-6">

        <dialog id="my_modal_3" class="modal">
          <div class="modal-box bg-white rounded-xl shadow-2xl">
            <form method="dialog">
              <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-600 hover:bg-red-100 hover:text-red-500">✕</button>
            </form>
            <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">เพิ่มโปรเจคใหม่</h3>

            <div class="space-y-4">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text font-medium text-gray-700">ชื่อโปรเจค</span>
                </div>
                <input v-model="form.name" type="text" placeholder="ชื่อโปรเจค"
                  class="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-green-500 transition-all" />
              </label>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label class="form-control w-full">
                  <div class="label">
                    <span class="label-text font-medium text-gray-700">วันเริ่ม</span>
                  </div>
                  <input type="date"
                    class="input input-bordered bg-gray-50 focus:bg-white focus:border-green-500 transition-all"
                    v-model="form.startDate" />
                </label>

                <label class="form-control w-full">
                  <div class="label">
                    <span class="label-text font-medium text-gray-700">วันสิ้นสุด</span>
                  </div>
                  <input type="date"
                    class="input input-bordered bg-gray-50 focus:bg-white focus:border-green-500 transition-all"
                    v-model="form.endDate" />
                </label>
              </div>

              <button @click="submitForm"
                class="btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-md mt-6 transition-all">
                ยืนยัน
              </button>
            </div>
          </div>
        </dialog>
      </div>

      <div v-if="projects.length === 0"
        class="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-16 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-lg">ยังไม่มีโปรเจค กดปุ่ม "เพิ่มโปรเจค" เพื่อเริ่มต้นใช้งาน</p>
      </div>

      <div v-for="project in projects" :key="project.id"
        class="bg-white rounded-xl shadow-lg mt-6 overflow-hidden transition-all hover:shadow-xl border border-gray-100">
        <div class="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <h2 class="text-xl font-bold">{{ project.name }}</h2>
              <button @click="toggleCollapse(project)" class="ml-3 p-1 rounded-full hover:bg-white/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        :d="project.isCollapsed ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'" />
                </svg>
              </button>
            </div>
            <div class="text-sm">
              <span v-if="project.startDate && project.endDate">
                {{ formatDate(project.startDate) }} - {{ formatDate(project.endDate) }}
              </span>
            </div>
          </div>
        </div>

        <div v-show="!project.isCollapsed" class="p-4">

          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-700">รายการงาน ({{ project.tasks ? project.tasks.length : 0 }})
            </h3>
            <div class="flex gap-2">
              <button class="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 flex items-center"
                @click="openAddTaskModal(project.id)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                เพิ่ม Task
              </button>

              <div>
                <button class="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 flex items-center"
                  :disabled="!isAllTasksDone(project)"
                  :class="{ 'opacity-50 cursor-not-allowed': !isAllTasksDone(project) }"
                  @click="confirmCloseProject(project.id)">
                  ปิดงาน
                </button>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto bg-gray-50 rounded-lg">
            <table class="table w-full">
              <thead>
                <tr class="bg-gray-100">
                  <th class="w-16 text-center">
                    <!-- <label>
                      <input type="checkbox" class="checkbox checkbox-success" />
                    </label> -->
                  </th>
                  <th class="text-gray-700">รายการ</th>
                  <th class="text-gray-700 w-48 text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!project.tasks || project.tasks.length === 0">
                  <td colspan="3" class="text-center py-6 text-gray-500">ยังไม่มี รายการ ในโปรเจคนี้</td>
                </tr>

                <tr v-for="(task, index) in project.tasks" :key="task.id" class="hover:bg-gray-100 transition-colors">
                  <th class="text-center">
                    {{ index + 1 }}
                    <!-- <label>
                      <input type="checkbox" class="checkbox checkbox-success" :checked="task.status === 'Done'" />
                    </label> -->
                  </th>
                  <td class="font-medium" :class="{ 'line-through text-gray-400': task.status === 'Done' }">{{ task.name
                    }}</td>
                  <td>
                    <select v-model="task.status" @change="updateTaskStatus(task.id, task.status)"
                      class="select select-bordered w-full transition-all font-medium text-center" :class="{
                        'bg-gray-200 text-gray-700': task.status === 'ยังไม่เริ่ม',
                        'bg-yellow-100 text-yellow-700 border-yellow-300': task.status === 'In progress',
                        'bg-green-100 text-green-700 border-green-300': task.status === 'Done'
                      }">
                      <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
                      <option value="In progress">กำลังดำเนินการ</option>
                      <option value="Done">เสร็จสิ้น</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- <div class="mt-4 flex justify-between text-sm text-gray-500">
            <div>สร้างเมื่อ: {{ formatDateWithTime(project.createdAt || new Date()) }}</div>
            <div>แก้ไขล่าสุด: {{ formatDateWithTime(project.updatedAt || new Date()) }}</div>
          </div> -->
        </div>
      </div>
    </div>

    <dialog id="task_modal" class="modal">
      <div class="modal-box bg-white rounded-xl shadow-2xl">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-600 hover:bg-red-100 hover:text-red-500">✕</button>
        </form>
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">เพิ่ม Task</h3>

        <div class="space-y-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text font-medium text-gray-700">ชื่อหัวข้อ</span>
            </div>
            <input v-model="taskForm.name" type="text" placeholder="ชื่องาน"
              class="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-blue-500 transition-all" />
          </label>

          <button @click="submitTask"
            class="btn w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md mt-6 transition-all">
            ยืนยัน
          </button>
        </div>
      </div>
    </dialog>
  </LayoutMain>
</template>

<script setup>
import Swal from 'sweetalert2'
import axios from 'axios';
import LayoutMain from '~/layouts/LayoutEmMain.vue';
import { ref, onMounted } from 'vue';

const users = ref([])
const projects = ref([])

const taskStatus = ref('')

const form = ref({
  name: '',
  startDate: '',
  endDate: ''
})

const taskForm = ref({
  name: '',
  projectId: null
})

const openAddTaskModal = (projectId) => {
  taskForm.value.projectId = projectId
  taskForm.value.name = ''
  document.getElementById('task_modal')?.showModal()
}

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
}

const formatDateWithTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' ' + date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
}

const submitTask = async () => {
  document.getElementById('task_modal')?.close()

  if (!taskForm.value.name) {
    Swal.fire({
      icon: 'warning',
      title: 'กรุณาระบุชื่องาน',
      text: 'โปรดกรอกชื่อ Task ที่ต้องการเพิ่ม'
    })
    return
  }

  try {
    await axios.post(`/api/projects/tasks/${taskForm.value.projectId}`, {
      name: taskForm.value.name,
    })
    await fetchProjects()

    Swal.fire({
      icon: 'success',
      title: 'เพิ่ม Task สำเร็จ!',
      timer: 1200,
      showConfirmButton: false
    })
  } catch (err) {
    console.error('Error adding task:', err)
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: 'ไม่สามารถเพิ่ม Task ได้'
    })
  }
}

const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await axios.put('/api/projects/updateStatus', {
      taskId: taskId,
      status: status
    })
    console.log(response.data.message)

    let successMessage = response.data.message || `อัพเดทสถานะ ${status} สำเร็จ!`
    let successIcon = 'success'

    if (status === 'ยังไม่เริ่ม') {
      successMessage = 'ยังไม่ได้เริ่มงาน';
      successIcon = 'success';
    } else if (status === 'In progress') {
      successMessage = 'อยู่ระหว่างดำเนินการ';
      successIcon = 'success';
    } else if (status === 'Done') {
      successMessage = 'เสร็จสิ้นงานเรียบร้อยแล้ว';
    }

    Swal.fire({
      icon: successIcon,
      title: 'อัพเดทสถานะสำเร็จ!',
      text: successMessage,
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    console.error('Error updating task status:', error)

    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด!',
      text: 'ไม่สามารถอัพเดทสถานะได้ กรุณาลองใหม่อีกครั้ง'
    })
  }
}

const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/users');
    users.value = response.data.data
  } catch (err) {
    console.error('Error fetching Users:', err);
  }
};

const fetchProjects = async () => {
  try {
    const response = await axios.get('/api/projects');
    projects.value = response.data.data.map(project => ({
      ...project,
      isCollapsed: false
    }));
  } catch (err) {
    console.error('Error fetching Projects:', err);
  }
};

const toggleCollapse = (project) => {
  project.isCollapsed = !project.isCollapsed;
};


const isAllTasksDone = (project) => {
  if (!project.tasks || project.tasks.length === 0) return false;
  return project.tasks.every(task => task.status === 'Done');
}

onMounted(async () => {
  await fetchUsers()
  await fetchProjects()
  console.log('projects:', projects.value)
})
</script>

<style scoped>
.modal-box {
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn {
  transition: all 0.3s ease;
}

.btn:active {
  transform: scale(0.97);
}
</style>