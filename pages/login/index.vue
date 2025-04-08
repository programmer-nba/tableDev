<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-center mt-10">
      <p class="text-3xl font-semibold text-green-600 animate-fadeIn">เข้าสู่ระบบ</p>
    </div>
    <div class="flex justify-center mt-3">
      <div>
        <p class="text-3xl font-semibold text-green-600 animate-fadeIn">TOSSAGUN PROJECT</p>
        <p class="text-red-500 text-base text-center">(VERSION TEST)</p>
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <div class="bg-white p-8 rounded-lg shadow-lg animate-slideUp w-full max-w-md">
        <form @submit.prevent="handleLogin">
          <label class="form-control w-full transition-all duration-300 hover:scale-102">
            <div class="label">
              <span class="label-text">เบอร์โทรศัพท์</span>
            </div>
            <input v-model="phoneLogin" type="text" placeholder="เบอร์โทรศัพท์"
              class="input input-bordered w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300" />
          </label>

          <label class="form-control w-full mt-2 transition-all duration-300 hover:scale-102">
            <div class="label">
              <span class="label-text">รหัสผ่าน</span>
            </div>
            <div class="relative">
              <input v-model="passwordLogin" :type="showPassword ? 'text' : 'password'" placeholder="รหัสผ่าน"
                class="input input-bordered w-full pr-10 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300" />
              <span class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                @click="showPassword = !showPassword">
                {{ showPassword ? '👁️' : '🙈' }}
              </span>
            </div>
          </label>

          <div class="mt-6 w-full">
            <button type="submit" class="btn w-full bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300
              hover:shadow-md transform hover:-translate-y-[2px]">
              เข้าสู่ระบบ
            </button>
          </div>
        </form>

        <div class="mt-4">
          <p onclick="my_modal_3.showModal()"
            class="text-green-500 text-sm text-center cursor-pointer hover:text-green-600 transition-all duration-300">
            ยังไม่มีบัญชี? <span class="underline font-medium">สมัครสมาชิก</span>
          </p>
        </div>
      </div>
    </div>

    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-green-600">สมัครสมาชิก</h3>
        </div>

        <form @submit.prevent="submitForm">
          <div>
            <div class="flex gap-3">
              <label class="form-control w-full transition-all duration-300 hover:scale-102">
                <div class="label">
                  <span class="label-text">ชื่อ</span>
                </div>
                <input v-model="firstname" type="text" placeholder="ชื่อ"
                  class="input input-bordered w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300" />
              </label>
              <label class="form-control w-full transition-all duration-300 hover:scale-102">
                <div class="label">
                  <span class="label-text">นามสกุล</span>
                </div>
                <input v-model="lastname" type="text" placeholder="นามสกุล"
                  class="input input-bordered w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300" />
              </label>
            </div>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">แผนก</span>
              </div>
              <select class="select select-bordered" v-model="selectedDepartment">
                <option disabled selected>เลือกแผนก</option>
                <option v-for="department in departments" :key="department.id" :value="department.title">
                  {{ department.title }}
                </option>
              </select>
            </label>


            <label class="form-control w-full mt-2 transition-all duration-300 hover:scale-102">
              <div class="label">
                <span class="label-text">เบอร์โทรศัพท์</span>
              </div>
              <input v-model="phone" type="text" placeholder="เบอร์โทรศัพท์"
                class="input input-bordered w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300" />
            </label>

            <label class="form-control w-full mt-2 transition-all duration-300 hover:scale-102">
              <div class="label">
                <span class="label-text">รหัสผ่าน</span>
              </div>
              <div class="relative">
                <input v-model="password" :type="showResgisPassword ? 'text' : 'password'" placeholder="รหัสผ่าน"
                  class="input input-bordered w-full pr-10 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300" />
                <span class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  @click="showResgisPassword = !showResgisPassword">
                  {{ showResgisPassword ? '👁️' : '🙈' }}
                </span>
              </div>
            </label>

            <label class="form-control w-full mt-2 transition-all duration-300 hover:scale-102">
              <div class="label">
                <span class="label-text">ยืนยันรหัสผ่าน</span>
              </div>
              <div class="relative">
                <input v-model="ConfirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="ยืนยันรหัสผ่าน"
                  class="input input-bordered w-full pr-10 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300" />
                <span class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  @click="showConfirmPassword = !showConfirmPassword">
                  {{ showConfirmPassword ? '👁️' : '🙈' }}
                </span>
              </div>
            </label>

            <button type="submit"
              class="btn mt-6 w-full rounded-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              สมัครสมาชิก
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from '#imports';

const authStore = useAuthStore()

const router = useRouter();

const departments = ref([])

const phoneLogin = ref('')
const passwordLogin = ref('')

const firstname = ref('');
const lastname = ref('');
const password = ref('');
const ConfirmPassword = ref('')
const phone = ref('')

const selectedDepartment = ref('')

const loading = ref(false);

const showPassword = ref(false);

const showResgisPassword = ref(false)
const showConfirmPassword = ref(false);

const fetchDepartment = async () => {
  try {
    const response = await axios.get('/api/department');
    departments.value = response.data.data
  } catch (err) {
    console.error('Error fetching Product:', err);
  }
};

const submitForm = async () => {
  document.getElementById("my_modal_3").close();
  if (password.value !== ConfirmPassword.value) {
    await Swal.fire({
      icon: 'error',
      title: 'รหัสผ่านไม่ตรงกัน',
      text: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
    });
    return;
  }

  if (!password.value || !firstname.value || !lastname.value || !ConfirmPassword.value || !phone.value) {
    await Swal.fire({
      icon: 'error',
      title: 'ข้อมูลไม่ครบถ้วน',
      text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
    });
    return;
  }


  const result = await Swal.fire({
    title: 'ยืนยันการสมัครสมาชิก',
    text: 'คุณต้องการสมัครสมาชิกหรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ใช่, สมัครเลย!',
    cancelButtonText: 'ยกเลิก',
  });

  if (result.isConfirmed) {
    loading.value = true;
    try {
      await axios.post('/api/auth/register', {
        firstname: firstname.value,
        lastname: lastname.value,
        password: password.value,
        phone: phone.value,
        department: selectedDepartment.value
      });

      await Swal.fire({
        icon: 'success',
        title: 'สำเร็จ!',
        text: 'สมัครสมาชิกสำเร็จ กรุณารอการยืนยันจากแอดมิน',
      });

      router.push('/login');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'เกิดข้อผิดพลาด';

      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: errorMsg,
      });
    } finally {
      loading.value = false;
    }
  }
};

const handleLogin = async () => {
  try {
    const response = await axios.post('api/auth/login', {
      phone: phoneLogin.value,
      password: passwordLogin.value
    })
    console.log(response);
    if (response.status === 200) {
      authStore.login(response.data);
    }
  } catch (error) {
    console.log('Login failed', error);
  }
};

onMounted(async () => {
  await fetchDepartment()
  console.log('department : ', departments.value)
})
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.9);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.6s ease-out;
}

.animate-scaleUp {
  animation: scaleUp 0.4s ease-out;
}

input:focus {
  outline: none;
}
</style>