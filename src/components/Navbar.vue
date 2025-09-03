<script setup lang="ts">
import { useRouter } from 'vue-router'
import ThemeButton from './ThemeButton.vue'
import moment from 'moment'

const router = useRouter()

function goToHome() {
  router.push('/')
}
</script>

<template>
  <div
    id="navbar"
    class="navbar bg-[#F0F5F5] dark:bg-[#002B2D] dark:text-white md:px-6 px-4 py-8 justify-between sticky top-0 z-50"
  >
    <div>
      <p class="md:text-6xl text-3xl cursor-pointer font-bold" @click="goToHome">Dashboard</p>
      <p class="md:text-lg text-sm font-normal md:ps-1">{{ moment().format('MMMM DD, YYYY') }}</p>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1 items-center md:gap-10 gap-2">
        <li
          @click="goToHome"
          class="md:text-4xl text-lg cursor-pointer duration-300 transition-colors hover:text-[#17B890]"
        >
          Doctors
        </li>
        <li>
          <ThemeButton />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
