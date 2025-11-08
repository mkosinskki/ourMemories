<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-whiteBlue/20 backdrop-blur-sm"
    @mousedown.self="$emit('close')"
  >
    <div
      class="w-full max-w-[550px] min-h-[600px] bg-white/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl pb-8 px-6 pt-6 flex flex-col"
    >
      <div class="flex flex-col items-center flex-1">
        <h2 class="text-2xl font-bold text-heading mb-6">Edytuj swój profil</h2>

        <form class="w-full flex flex-col flex-1" @submit.prevent="handleSubmit">
          
          <div class="space-y-5">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label for="firstName" class="block text-medium font-medium text-heading mb-1"
                  >Imię</label
                >
                <input
                  type="text"
                  id="firstName"
                  placeholder="Jan"
                  class="w-full p-3 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm"
                  v-model="formData.firstName"
                />
              </div>
              <div class="flex-1">
                <label for="surname" class="block text-medium font-medium text-heading mb-1"
                  >Nazwisko</label
                >
                <input
                  type="text"
                  id="surname"
                  placeholder="Kowalski"
                  class="w-full p-3 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm"
                  v-model="formData.surname"
                />
              </div>
            </div>

            <div>
              <label for="email" class="block text-medium font-medium text-heading mb-1"
                >Email</label
              >
              <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                class="w-full p-3 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm"
                v-model="formData.email"
              />
            </div>

            <div>
              <label for="dateOfBirth" class="block text-medium font-medium text-heading mb-1"
                >Data urodzenia</label
              >
              <input
                type="date"
                id="dateOfBirth"
                class="w-full p-3 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm"
                v-model="formData.dateOfBirth"
              />
            </div>

            <transition name="fade">
              <div
                v-if="errorMessage"
                class="w-full text-center text-red-600 text-sm font-medium p-2 bg-red-100/70 rounded-lg"
              >
                {{ errorMessage }}
              </div>
            </transition>
          </div> 
          <div class="flex flex-col md:flex-row gap-3 pt-4 mt-auto">
            <button
              type="button"
              @click="$emit('close')"
              class="w-full p-3 rounded-lg bg-gray-300/60 text-heading font-semibold hover:bg-gray-300/90 transition-colors"
            >
              Anuluj
            </button>
            <button
              type="submit"
              class="w-full p-3 rounded-lg bg-white/80 text-heading font-semibold hover:bg-white transition-colors hover:text-color4"
              :disabled="loading"
            >
              {{ loading ? 'Zapisywanie...' : 'Zapisz zmiany' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'profile-updated'])

const formData = reactive({
  firstName: '',
  surname: '',
  email: '',
  dateOfBirth: '',
})

const loading = ref(false)
const errorMessage = ref(null)

function formatDateForInput(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  } catch (e) {
    console.error('Failed to format date:', e)
    return ''
  }
}

onMounted(() => {
  if (props.user) {
    formData.firstName = props.user.firstName || ''
    formData.surname = props.user.surname || ''
    formData.email = props.user.email || ''
    formData.dateOfBirth = formatDateForInput(props.user.dateOfBirth)
  }
})

async function handleSubmit() {
  loading.value = true
  errorMessage.value = null

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Missing token in localstorage.')
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      if (data.errors) {
        throw new Error(Object.values(data.errors).join(' '))
      }
      if (data.message) {
        throw new Error(data.message)
      }
      throw new Error('Failed to update profile.')
    }

    emit('profile-updated', data.user)
    emit('close')
  } catch (e) {
    errorMessage.value = e.message
    console.error(e)
  } finally {
    loading.value = false
  }
}
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