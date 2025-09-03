<script setup lang="ts">
import type { Doctor } from '@/stores/interfaceStore'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'

let doctorDetails = ref<Doctor | null>(null)
const route = useRoute()
const showDoctorId = ref(false)
const errorMessage = ref('')

const maskedDoctorId = computed(() => {
  const id = doctorDetails.value?.id?.toLocaleString() || ''
  return showDoctorId.value ? id : id.replace(/[^-](?=[^-]*[-]*.{12})/g, '*')
})

function toggleShowDoctorId() {
  showDoctorId.value = !showDoctorId.value
}

const fetchResources = async () => {
  const url = '/api'
  const accessToken = 'dGhpcyBpcyBzdXBlciBzYWZlLiBqdXN0IHRydXN0IG1lLiBoZWhl'

  try {
    if (!route?.query?.id) {
      throw new Error(`Doctor ID doesn't seem to exist.`)
    }
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Unauthorized access. Please log in again.')
      } else {
        throw new Error(`Error: ${res.status} ${res.statusText}`)
      }
    }

    const json = await res.json()
    doctorDetails.value = json.find((doctor: Doctor) => doctor.id === route.query.id) || null
  } catch (error: any) {
    errorMessage.value = error.message
    console.error(errorMessage)
  }
}

onMounted(async () => {
  await fetchResources()
})
</script>

<template>
  <div v-if="errorMessage" class="text-2xl w-full text-center h-[50vh] grid place-content-center">
    {{ errorMessage }}
  </div>
  <div v-else class="p-6">
    <div class="bg-white dark:bg-[#084448] md:p-10 p-6 card shadow-sm dark:text-white">
      <div class="text-2xl font-bold pb-10">Doctor Details</div>

      <form class="grid gap-4 w-full">
        <div class="">
          <label class="grid w-full">
            <span class="pb-1 font-bold">Doctor ID</span>
            <div class="flex items-center gap-2 relative w-full">
              <input
                class="bg-[#FBFBFB] dark:bg-[#063437] rounded-lg p-4 outline-0 w-full"
                type="text"
                :value="'ID: ' + maskedDoctorId"
                readonly
              />
              <button
                type="button"
                class="text-sm absolute end-3 w-6 fill-gray-500 dark:fill-white md:block hidden"
                @click="toggleShowDoctorId"
              >
                <svg v-if="showDoctorId" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"
                  />
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"
                  />
                </svg>
              </button>
            </div>
          </label>
          <div class="gap-2 items-center md:hidden flex pt-4">
            <input
              id="viewId"
              type="checkbox"
              :checked="showDoctorId"
              @change="toggleShowDoctorId"
              class="checkbox checkbox-md"
            />
            <label for="viewId">View ID</label>
          </div>
        </div>

        <div class="md:flex grid gap-6">
          <label class="grid w-full">
            <span class="pb-1 font-bold">First Name</span>
            <input
              class="bg-[#FBFBFB] dark:bg-[#063437] rounded-lg p-4 outline-0"
              type="text"
              :value="doctorDetails?.firstName"
              readonly
            />
          </label>
          <label class="grid w-full">
            <span class="pb-1 font-bold">Last Name</span>
            <input
              class="bg-[#FBFBFB] dark:bg-[#063437] rounded-lg p-4 outline-0"
              type="text"
              :value="doctorDetails?.lastName"
              readonly
            />
          </label>
        </div>

        <div class="md:flex grid gap-6">
          <label class="grid w-full">
            <span class="pb-1 font-bold">State</span>
            <input
              class="bg-[#FBFBFB] dark:bg-[#063437] rounded-lg p-4 outline-0"
              type="text"
              :value="doctorDetails?.state"
              readonly
            />
          </label>
          <label class="grid w-full">
            <span class="pb-1 font-bold">Date of Birth</span>
            <input
              class="bg-[#FBFBFB] dark:bg-[#063437] rounded-lg p-4 outline-0"
              type="text"
              :value="doctorDetails?.dob ? moment(doctorDetails?.dob).format('MMMM DD, YYYY') : ''"
              readonly
            />
          </label>
        </div>

        <div class="md:flex grid gap-6">
          <label class="grid w-full">
            <span class="pb-1 font-bold">License</span>
            <div class="rounded-lg p-4 outline-0 bg-[#FBFBFB] dark:bg-[#063437]">
              <div
                class="badge badge-outline font-bold"
                :class="doctorDetails?.licenseActive ? 'badge-success' : 'badge-error'"
                v-text="doctorDetails?.licenseActive ? 'Active' : 'Inactive'"
              ></div>
            </div>
          </label>
          <label class="grid w-full">
            <span class="pb-1 font-bold">Signed Up Date</span>
            <input
              class="bg-[#FBFBFB] dark:bg-[#063437] rounded-lg p-4 outline-0"
              type="text"
              :value="
                doctorDetails?.signedUpDate
                  ? moment(doctorDetails?.signedUpDate).format('MMMM DD, YYYY')
                  : ''
              "
              readonly
            />
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
