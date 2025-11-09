<template>

  <Navbar />

  <div
    class="min-h-screen bg-linear-to-br from-color4/80 to-color3/40 flex items-center justify-center p-4 pt-20 pb-15 md:pb-10">
    <div class="w-full max-w-7xl mx-auto flex flex-col gap-6">

      <div class="bg-color1 rounded-xl shadow-md p-5 md:p-6">
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">

          <div class="flex items-center gap-4">
            <img src="https://placehold.co/80x80/F0E68C/FFFFFF" alt="Avatar"
              class="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-color3 shadow-sm object-cover shrink-0" />
            <div class="flex flex-col justify-center -translate-y-0.5">
              <h2 class="text-xl md:text-2xl font-bold text-heading">{{ safeUser.firstName }} {{ safeUser.surname }}
              </h2>

              <div class="flex items-center gap-2 mt-1 text-sm text-basictext">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{{ safeUser.email }}</span>
              </div>

              <div class="flex items-center gap-2 mt-1 text-sm text-basictext">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatLocalDate(safeUser.dateOfBirth) }}</span>
              </div>
            </div>
          </div>

          <div class="shrink-0">
            <button
              @click="isEditPopupVisible = true"
              class="text-sm font-medium text-heading hover:underline focus:outline-none px-4 py-2"
            >
              {{ t('profilePage.editProfileButton') }}
            </button>
          </div>

        </div>
      </div>

      <div class="bg-whiteBlue rounded-xl shadow-md p-5 min-h-[600px]">
        <div class="bg-color3 rounded-md">
          <h3 class="text-2xl font-bold text-heading text-center mb-6 p-3">
            {{ t('profilePage.statistics') }}
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
          <div v-for="stat in statsGrid" :key="stat.label" class="flex flex-col text-center">

            <div class="bg-color2 text-basictext font-medium py-2 px-4 rounded-md shadow-sm">
              {{ stat.label }}
            </div>

            <div class="py-10 md:py-20">
              <span class="text-2xl font-bold text-heading">
                {{ stat.value }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <teleport to="body">
    <transition name="fade">
      <EditProfilePopup
        v-if="isEditPopupVisible"
        :user="safeUser"
        @close="isEditPopupVisible = false"
        @profile-updated="handleProfileUpdate"
      />
    </transition>
  </teleport>

</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import EditProfilePopup from '@/components/EditProfilePopup.vue'
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const user = ref(null)
const isLoading = ref(false)
const error = ref(null)

const isEditPopupVisible = ref(false)

async function fetchUser() {
  isLoading.value = true
  error.value = null
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error(t('profilePage.tokenError'))
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(t('profilePage.expiredToken'))
      }
      throw new Error(t('profilePage.fetchError'))
    }
    user.value = await response.json()
  } catch (e) {
    error.value = e.message
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchUser()
})

const safeUser = computed(() => user.value || {})

function formatLocalDate(dateString) {
  if (!dateString) {
    return '...';
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('pl-PL');
  } catch (e) {
    console.error(`Error while formating date "${dateString}":`, e);
    console.error(t('profilePage.formatingDateError', { date: dateString }), e);
    return dateString;
  }
}

function handleProfileUpdate(updatedUserData) {
  user.value = { ...user.value, ...updatedUserData }
  isEditPopupVisible.value = false
}

const statsGrid = computed(() => {
  return [
    { label: t('profilePage.addedMemory'), value: safeUser.value.postCount ?? '...' },
    { label: t('profilePage.visitedLocations'), value: safeUser.value.locationCount ?? '...' },
    { label: t('profilePage.firstMemory'), value: formatLocalDate(safeUser.value.firstMemoryDate) ?? '...' },
  ]
})

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>