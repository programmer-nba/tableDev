<template>
  <LayoutEmMain>
    <div class="max-w-5xl mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Header with gradient background -->
        <div class="bg-gradient-to-r from-green-500 to-teal-400 py-6">
          <div class="flex justify-center">
            <h1 class="text-4xl font-bold text-white">โปรไฟล์ผู้ใช้งาน</h1>
          </div>
        </div>

        <div class="p-8">
          <div class="flex flex-col md:flex-row gap-8">
            <!-- Profile Image Section -->
            <div class="flex flex-col items-center">
              <div class="mb-4 relative">
                <div v-if="users.image" class="w-48 h-48 rounded-full overflow-hidden border-4 border-green-500">
                  <img :src="users.image" alt="รูปโปรไฟล์" class="w-full h-full object-cover">
                </div>
                <div v-else
                  class="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center border-4 border-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                <div class="mt-4">
                  <label
                    class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition-colors duration-300 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd" />
                    </svg>
                    อัปโหลดรูปภาพ
                    <input type="file" class="hidden" @change="handleFileChange" />
                  </label>
                </div>

                <div v-if="imageChanged" class="mt-4 text-center">
                  <button @click="confirmImageChange"
                    class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300">
                    ยืนยันการเปลี่ยนแปลง
                  </button>
                </div>
              </div>
            </div>

            <!-- User Information Section -->
            <div class="flex-1">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-6">
                  <div>
                    <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">ชื่อ</h2>
                    <p class="text-xl font-medium text-gray-800 border-b border-gray-200 pb-2">{{ users.firstname || '-'
                    }}</p>
                  </div>

                  <div>
                    <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">นามสกุล</h2>
                    <p class="text-xl font-medium text-gray-800 border-b border-gray-200 pb-2">{{ users.lastname || '-'
                    }}</p>
                  </div>

                  <div>
                    <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">เบอร์โทรศัพท์</h2>
                    <p class="text-xl font-medium text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {{ users.phone || '-' }}
                    </p>
                  </div>
                </div>

                <div class="space-y-6">
                  <div>
                    <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">ตำแหน่ง</h2>
                    <p class="text-xl font-medium text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clip-rule="evenodd" />
                        <path
                          d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                      {{ users.role || '-' }}
                    </p>
                  </div>

                  <div>
                    <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">แผนก</h2>
                    <p class="text-xl font-medium text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      {{ users.department || '-' }}
                    </p>
                  </div>

                  <!-- <div class="flex mt-8">
                    <button class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      แก้ไขข้อมูลส่วนตัว
                    </button>
                  </div> -->

                </div>
              </div>
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

const loading = ref(false);

const imageChanged = ref(false);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    alert('กรุณาเลือกไฟล์รูปภาพที่รองรับ (JPG, PNG, WEBP)');
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert('ขนาดรูปภาพเกิน 2MB กรุณาเลือกไฟล์ที่เล็กกว่านี้');
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    users.value.image = reader.result;
    imageChanged.value = true;

    console.log('users' , users.value.image)
  };
  reader.readAsDataURL(file);
};

const confirmImageChange = async () => {
  loading.value = true;
  try {
    const response = await axios.put(`/api/employees/image/${users.value.uuid}`, {
      image: users.value.image,
    });

    if (response.status === 200) {
      alert('เปลี่ยนรูปโปรไฟล์สำเร็จ');
      imageChanged.value = false;
    }
  } catch (err) {
    console.error('Error updating image:', err);
  } finally {
    loading.value = false;
  }
};

const fetchUsers = async () => {
  try {
    if (!user.value || !user.value.uuid) {
      console.error('User UUID not found');
      return;
    }

    const response = await axios.get(`/api/employees/${user.value.uuid}`);
    console.log('API Response:', response);
    users.value = response.data.data;
  } catch (err) {
    console.error('Error fetching User Profile:', err);
  }
};

onMounted(async () => {
  if (process.client) {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user.value = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }

  await fetchUsers();
  console.log('User Profile Data:', users.value);
});
</script>

<style scope>
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  transition: all 0.3s ease;
}
</style>