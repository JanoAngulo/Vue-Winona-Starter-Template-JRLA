<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const contentHeight = ref()

onMounted(() => {
  const navbarSize = document.getElementById('navbar')?.offsetHeight || 0
  const footerSize = document.getElementById('footer')?.offsetHeight || 0

  contentHeight.value = `calc(100vh - ${navbarSize + footerSize}px)`
})
</script>

<template>
  <Navbar />
  <div :style="{ minHeight: contentHeight }">
    <RouterView />
  </div>
  <Footer />
</template>

<style scoped></style>
