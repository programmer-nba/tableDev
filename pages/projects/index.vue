<template>
  <LayoutMain>
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex justify-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 border-b-4 border-green-500 pb-2">โปรเจคทั้งหมด</h1>
      </div>

      <div class="mb-6">
        <button
          class="btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-md transition-all transform hover:scale-[1.02]"
          onclick="my_modal_3.showModal()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          เพิ่มโปรเจค
        </button>

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
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
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
            <div class="space-y-4 p-4">
              <div v-if="!project.tasks || project.tasks.length === 0" class="text-center py-6 text-gray-500">
                ยังไม่มี รายการ ในโปรเจคนี้
              </div>

              <div v-for="(task, taskIndex) in project.tasks" :key="task.id" 
                class="bg-white rounded-lg border border-gray-200 shadow-sm">
                
                <!-- Task Header -->
                <div class="p-4 border-b border-gray-100">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <span class="text-sm font-medium text-gray-500">#{{ taskIndex + 1 }}</span>
                      <h4 class="font-semibold text-gray-800" 
                        :class="{ 'line-through text-gray-400': task.status === 'Done' }">
                        {{ task.name }}
                      </h4>
                      <button @click="toggleTaskCollapse(task)" 
                        class="p-1 rounded-full hover:bg-gray-100 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            :d="task.isCollapsed ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'" />
                        </svg>
                      </button>
                    </div>
                    
                    <div class="flex items-center space-x-2">
                      <!-- Add Subtask Button -->
                      <button @click="openAddSubtaskModal(task.id)" 
                        class="btn btn-xs bg-purple-500 hover:bg-purple-600 text-white rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Sub
                      </button>
                      
                      <!-- Task Status -->
                      <select v-model="task.status" @change="updateTaskStatus(task.id, task.status)"
                        class="select select-bordered select-sm w-40 transition-all font-medium text-center" :class="{
                          'bg-gray-200 text-gray-700': task.status === 'ยังไม่เริ่ม',
                          'bg-yellow-100 text-yellow-700 border-yellow-300': task.status === 'In progress',
                          'bg-green-100 text-green-700 border-green-300': task.status === 'Done'
                        }">
                        <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
                        <option value="In progress">กำลังดำเนินการ</option>
                        <option value="Done">เสร็จสิ้น</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Subtasks Section -->
                <div v-show="!task.isCollapsed" class="p-4">
                  <div v-if="task.subtasks && task.subtasks.length > 0" class="space-y-2">
                    <h5 class="text-sm font-medium text-gray-600 mb-3">
                      รายการย่อย ({{ task.subtasks.length }})
                    </h5>
                    
                    <div v-for="(subtask, subtaskIndex) in task.subtasks" :key="subtask.id" 
                      class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div class="flex items-center space-x-3">
                        <span class="text-xs text-gray-400">{{ taskIndex + 1 }}.{{ subtaskIndex + 1 }}</span>
                        <span class="text-sm" 
                          :class="{ 'line-through text-gray-400': subtask.status === 'Done' }">
                          {{ subtask.name }}
                        </span>
                      </div>
                      
                      <select v-model="subtask.status" @change="updateSubtaskStatus(subtask.id, subtask.status)"
                        class="select select-bordered select-xs w-32 transition-all font-medium text-center" :class="{
                          'bg-gray-200 text-gray-700': subtask.status === 'ยังไม่เริ่ม',
                          'bg-yellow-100 text-yellow-700 border-yellow-300': subtask.status === 'In progress',
                          'bg-green-100 text-green-700 border-green-300': subtask.status === 'Done'
                        }">
                        <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
                        <option value="In progress">กำลังดำเนินการ</option>
                        <option value="Done">เสร็จสิ้น</option>
                      </select>
                    </div>
                  </div>
                  
                  <div v-else class="text-center py-4 text-gray-400 text-sm">
                    ยังไม่มี Subtask
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Task Modal -->
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

    <!-- Add Subtask Modal -->
    <dialog id="subtask_modal" class="modal">
      <div class="modal-box bg-white rounded-xl shadow-2xl">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-600 hover:bg-red-100 hover:text-red-500">✕</button>
        </form>
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">เพิ่ม Subtask</h3>

        <div class="space-y-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text font-medium text-gray-700">ชื่อ Subtask</span>
            </div>
            <input v-model="subtaskForm.name" type="text" placeholder="ชื่อ Subtask"
              class="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-500 transition-all" />
          </label>

          <button @click="submitSubtask"
            class="btn w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg shadow-md mt-6 transition-all">
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
import LayoutMain from '~/layouts/LayoutMain.vue';
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

const subtaskForm = ref({
  name: '',
  taskId: null
})

const openAddTaskModal = (projectId) => {
  taskForm.value.projectId = projectId
  taskForm.value.name = ''
  document.getElementById('task_modal')?.showModal()
}

const openAddSubtaskModal = (taskId) => {
  subtaskForm.value.taskId = taskId
  subtaskForm.value.name = ''
  document.getElementById('subtask_modal')?.showModal()
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

const submitForm = async () => {
  document.getElementById('my_modal_3')?.close()
  if (!form.value.name || !form.value.startDate || !form.value.endDate) {
    Swal.fire({
      icon: 'warning',
      title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      text: 'โปรดระบุชื่อโปรเจคและวันที่เริ่มต้น-สิ้นสุด'
    })
    return
  }

  const result = await Swal.fire({
    title: 'ยืนยันการเพิ่มโปรเจกต์?',
    text: 'คุณแน่ใจหรือไม่ว่าต้องการเพิ่มโปรเจกต์นี้?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'ยืนยัน',
    confirmButtonColor: '#10B981',
    cancelButtonText: 'ยกเลิก',
  })

  if (result.isConfirmed) {
    try {
      Swal.fire({
        title: 'กำลังบันทึก...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })

      const payload = {
        name: form.value.name,
        startDate: form.value.startDate,
        endDate: form.value.endDate,
      }

      await axios.post('/api/projects', payload)

      form.value = { name: '', startDate: '', endDate: '' }
      await fetchProjects()

      Swal.fire({
        icon: 'success',
        title: 'เพิ่มโปรเจกต์สำเร็จ!',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error adding project:', error)
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเพิ่มโปรเจกต์ได้ กรุณาลองใหม่อีกครั้ง'
      })
    }
  }
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

const submitSubtask = async () => {
  document.getElementById('subtask_modal')?.close()

  if (!subtaskForm.value.name) {
    Swal.fire({
      icon: 'warning',
      title: 'กรุณาระบุชื่อ Subtask',
      text: 'โปรดกรอกชื่อ Subtask ที่ต้องการเพิ่ม'
    })
    return
  }

  try {
    await axios.post(`/api/projects/tasks/subtasks`, {
      name: subtaskForm.value.name,
      taskId: subtaskForm.value.taskId
    })
    await fetchProjects()

    Swal.fire({
      icon: 'success',
      title: 'เพิ่ม Subtask สำเร็จ!',
      timer: 1200,
      showConfirmButton: false
    })
  } catch (err) {
    console.error('Error adding subtask:', err)
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: 'ไม่สามารถเพิ่ม Subtask ได้'
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

const updateSubtaskStatus = async (subtaskId, status) => {
  try {
    const response = await axios.put('/api/projects/updateSubtaskStatus', {
      subtaskId: subtaskId,
      status: status
    })

    let successMessage = response.data.message || `อัพเดทสถานะ Subtask สำเร็จ!`

    if (status === 'ยังไม่เริ่ม') {
      successMessage = 'Subtask ยังไม่ได้เริ่มงาน';
    } else if (status === 'In progress') {
      successMessage = 'Subtask อยู่ระหว่างดำเนินการ';
    } else if (status === 'Done') {
      successMessage = 'Subtask เสร็จสิ้นเรียบร้อยแล้ว';
    }

    Swal.fire({
      icon: 'success',
      title: 'อัพเดทสถานะ Subtask สำเร็จ!',
      text: successMessage,
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    console.error('Error updating subtask status:', error)

    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด!',
      text: 'ไม่สามารถอัพเดทสถานะ Subtask ได้ กรุณาลองใหม่อีกครั้ง'
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
    projects.value = response.data.data
      .filter(project => project.status === 'เปิดงาน')
      .map(project => ({
        ...project,
        isCollapsed: true,
        tasks: project.tasks ? project.tasks.map(task => ({
          ...task,
          isCollapsed: true
        })) : []
      }));
  } catch (err) {
    console.error('Error fetching Projects:', err);
  }
};

const toggleCollapse = (project) => {
  project.isCollapsed = !project.isCollapsed;
};

const toggleTaskCollapse = (task) => {
  task.isCollapsed = !task.isCollapsed;
};

const isAllTasksDone = (project) => {
  if (!project.tasks || project.tasks.length === 0) return false;
  return project.tasks.every(task => task.status === 'Done');
}

const confirmCloseProject = async (projectId) => {
  const result = await Swal.fire({
    title: 'ยืนยันการปิดโปรเจค?',
    text: 'หลังจากปิดโปรเจคแล้วจะไม่สามารถแก้ไขได้',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ยืนยันปิดโปรเจค',
    confirmButtonColor: '#EF4444',
    cancelButtonText: 'ยกเลิก',
  });

  if (result.isConfirmed) {
    try {
      Swal.fire({
        title: 'กำลังปิดโปรเจค...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await axios.put(`/api/projects/close/${projectId}`);

      await fetchProjects();

      Swal.fire({
        icon: 'success',
        title: 'ปิดโปรเจคสำเร็จ!',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error closing project:', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถปิดโปรเจคได้ กรุณาลองใหม่อีกครั้ง'
      });
    }
  }
};

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