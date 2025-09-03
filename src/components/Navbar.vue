<script setup lang="ts">
import { useRouter } from 'vue-router'
import ThemeButton from './ThemeButton.vue'

const router = useRouter()

function goToHome() {
  router.push('/')
}
</script>

<template>
  <div id="navbar" class="navbar p-0 bg-base-200 shadow-sm justify-between sticky top-0 z-50">
    <div class="px-6">
      <p class="text-xl cursor-pointer" @click="goToHome">Dashboard</p>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li @click="goToHome"><a>Doctors</a></li>
        <li>
          <ThemeButton />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
