<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DoctorsList from '@/components/DoctorsList.vue'

const doctorsList = ref([])
const errorMessage = ref('')

const fetchResources = async () => {
  const url = '/api'
  const accessToken = 'dGhpcyBpcyBzdXBlciBzYWZlLiBqdXN0IHRydXN0IG1lLiBoZWhl'

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      if (res.status === 401) {
        errorMessage.value = 'Unauthorized access. Please log in again.'
      } else {
        errorMessage.value = `Error: ${res.status} ${res.statusText}`
      }
      return
    }

    const json = await res.json()
    doctorsList.value = json
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred. Please try again later.'
    console.error(error)
  }
}

onMounted(async () => {
  await fetchResources()
})
</script>

<template>
  <main class="p-3">
    <div v-if="errorMessage" class="text-2xl w-full text-center h-[50vh] grid place-content-center">
      {{ errorMessage }}
    </div>
    <DoctorsList v-else :doctorsList="doctorsList" />
  </main>
</template>
