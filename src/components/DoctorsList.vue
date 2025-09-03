<script setup lang="ts">
import type { Doctor } from '@/stores/interfaceStore'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  doctorsList: Array as () => Doctor[],
})

const searchInput = ref('')

const filteredDoctors = computed(() => {
  const term = searchInput.value?.toString().trim().toLowerCase()
  if (!term) return props.doctorsList ?? []
  return (props.doctorsList ?? []).filter((d) => {
    return (
      d.firstName.toLowerCase().includes(term) ||
      d.lastName.toLowerCase().includes(term) ||
      d.state.toLowerCase().includes(term) ||
      (d.id && d.id.toLowerCase().includes(term))
    )
  })
})

const router = useRouter()

function openDoctorDetails(doctor: Doctor) {
  router.push({
    name: 'DoctorDetailsPage',
    query: { id: doctor.id },
  })
}
</script>

<template>
  <ul class="list card bg-white dark:bg-[#084448] space-y-2 md:p-10 p-6 overflow-hidden">
    <div
      class="text-xl tracking-wide font-bold md:flex items-center justify-between w-full mb-4 space-y-4 gap-10"
    >
      <p class="text-nowrap md:m-0 md:text-3xl text-2xl font-medium dark:text-white">
        Available Doctors
      </p>
      <input
        v-model="searchInput"
        type="search"
        required
        class="placeholder:font-medium md:text-lg text-sm p-4 md:w-lg w-full rounded-lg border-0 outline-0 bg-[#EEF5F4] dark:bg-[#063437]"
        placeholder="Search Doctors"
      />
    </div>

    <TransitionGroup name="list">
      <li
        v-for="doctor in filteredDoctors"
        :key="doctor.id"
        class="list-row bg-[#FBFBFB] md:p-8 p-4 dark:bg-[#063437] md:rounded-xl rounded-md"
      >
        <div>
          <div class="md:text-2xl text-xl font-semibold">
            Dr. {{ doctor.firstName }} {{ doctor.lastName }}
          </div>
          <div class="md:text-xl font-semibold opacity-60">State: {{ doctor.state }}</div>
        </div>
        <div></div>
        <div class="grid items-center w-fit">
          <div class="dropdown dropdown-end w-full">
            <div
              tabindex="0"
              role="button"
              class="btn w-full bg-[#17B890] md:p-6 rounded-lg md:text-lg text-white border-0"
            >
              Actions
              <svg
                class="md:size-5 size-3 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                />
              </svg>
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu dark:bg-[#084448] bg-base-100 dark:text-white z-1 w-52 p-2 shadow-sm rounded-lg"
            >
              <li @click="openDoctorDetails(doctor)" class="rounded-sm">
                <a>Details</a>
              </li>
            </ul>
          </div>
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
