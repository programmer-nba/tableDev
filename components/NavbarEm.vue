<template>
  <nav class="bg-gray-600 text-white p-4">
    <div class="flex justify-between items-center">
      <h1 class="text-lg font-bold"></h1>

      <div class="space-x-4">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabindex="0" class="menu menu-sm border-green-400 border-2 shadow-sm text-black dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a class="justify-between">
                ตั้งค่าโปรไฟล์
              </a>
            </li>
            <li><a>ออกจากระบบ</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped></style>
