<script setup lang="ts">
import type { Doctor } from '@/stores/interfaceStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  doctorsList: Array as () => Doctor[],
})

const router = useRouter()

function openDoctorDetails(doctor: Doctor) {
  router.push({
    name: 'DoctorDetailsPage',
    query: { id:doctor.id },
  })
}
</script>

<template>
  <ul class="list card bg-base-200 shadow-md space-y-2 p-4">
    <li class="p-4 pb-2 text-xl tracking-wide font-bold">Available Doctors</li>

    <TransitionGroup name="list">
      <li v-for="(doctor, index) in doctorsList" :key="index" class="list-row bg-base-100">
        <div>
          <div class="text-lg">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</div>
          <div class="text-md uppercase font-semibold opacity-60">{{ doctor.state }}</div>
        </div>
        <div></div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn rounded-lg py-2 px-4 w-fit">Actions</div>
          <ul tabindex="0" class="dropdown-content menu bg-base-100 z-1 w-52 p-2 shadow-sm">
            <li @click="openDoctorDetails(doctor)" class="bg-base-100"><a>Details</a></li>
          </ul>
        </div>
      </li>
    </TransitionGroup>
  </ul>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
