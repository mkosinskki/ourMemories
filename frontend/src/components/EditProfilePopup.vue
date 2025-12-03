<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-whiteBlue/20 backdrop-blur-sm"
    @mousedown.self="$emit('close')"
  >
    <div
      class="w-full max-w-[550px] min-h-[600px] bg-white/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl pb-8 px-6 pt-6 flex flex-col"
    >
      <div class="flex flex-col items-center flex-1">
        <h2 class="text-2xl font-bold text-heading mb-6">{{ t('editProfile.title') }}</h2>

        <form class="w-full flex flex-col flex-1" @submit.prevent="handleSubmit">
          
          <div class="flex flex-col items-center mb-6">
            <div class="relative group cursor-pointer w-24 h-24" @click="triggerFileInput">
              
              <img 
                :src="previewUrl || getAvatarUrl(props.user.avatar)" 
                alt="Avatar"
                class="w-full h-full rounded-full object-cover border-2 border-white shadow-md group-hover:opacity-80 transition-opacity"
              />
              
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            <input 
              type="file" 
              ref="fileInputRef" 
              class="hidden" 
              accept="image/*"
              @change="handleFileChange"
            />
            
            <button type="button" @click="triggerFileInput" class="text-sm text-color4 font-medium mt-2 hover:underline">
              {{ t('editProfile.changePhoto') }}
            </button>
          </div>
          <div class="space-y-5">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label for="firstName" class="block text-medium font-medium text-heading mb-1">{{ t('editProfile.name') }}</label>
                <input type="text" id="firstName" v-model="formData.firstName" class="w-full p-3 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm" />
              </div>
              <div class="flex-1">
                <label for="surname" class="block text-medium font-medium text-heading mb-1">{{ t('editProfile.surname') }}</label>
                <input type="text" id="surname" v-model="formData.surname" class="w-full p-3 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm" />
              </div>
            </div>

            <div>
              <label for="email" class="block text-medium font-medium text-heading mb-1">{{ t('editProfile.email') }}</label>
              <input type="email" id="email" v-model="formData.email" class="w-full p-3 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm" />
            </div>

            <div>
              <label for="dateOfBirth" class="block text-medium font-medium text-heading mb-1">{{ t('editProfile.birthday') }}</label>
              <input type="date" id="dateOfBirth" v-model="formData.dateOfBirth" class="w-full p-3 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm" />
            </div>

            <transition name="fade">
              <div v-if="errorMessage" class="w-full text-center text-red-600 text-sm font-medium p-2 bg-red-100/70 rounded-lg">
                {{ errorMessage }}
              </div>
            </transition>
          </div>
          
          <div class="flex flex-col md:flex-row gap-3 pt-4 mt-auto">
            <button type="button" @click="$emit('close')" class="w-full p-3 rounded-lg bg-red-400/80 text-heading font-semibold hover:bg-red-500 duration-200 hover:text-white">
              {{ t('editProfile.cancel') }}
            </button>
            <button type="submit" :disabled="loading" class="w-full p-3 rounded-lg bg-white/80 text-heading font-semibold hover:bg-color4 transition-colors hover:text-white duration-200">
              {{ loading ? t('editProfile.saving') : t('editProfile.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '../axios.js'

const { t } = useI18n()
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const emit = defineEmits(['close', 'profile-updated'])
const props = defineProps({
  user: { type: Object, required: true },
})

const fileInputRef = ref(null)
const selectedFile = ref(null)
const previewUrl = ref(null)
const loading = ref(false)
const errorMessage = ref(null)

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
};

const formData = reactive({
  firstName: props.user.firstName || '',
  surname: props.user.surname || '',
  email: props.user.email || '',
  dateOfBirth: formatDate(props.user.dateOfBirth),
})

function getAvatarUrl(path) {
  if (!path) return "https://placehold.co/80x80/F0E68C/FFFFFF";
  if (path.startsWith('http')) return path;
  return `${BACKEND_URL}/uploads/${path}`;
}

function triggerFileInput() {
  fileInputRef.value?.click();
}

function handleFileChange(event) {
  const file = event.target.files[0]
  if (!file) return;

  selectedFile.value = file
  
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = URL.createObjectURL(file)
}

onUnmounted(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
})

async function handleSubmit() {
  loading.value = true
  errorMessage.value = null

  try {
    const dataToSend = new FormData()

    Object.keys(formData).forEach(key => {
      dataToSend.append(key, formData[key])
    })

    if (selectedFile.value) {
      dataToSend.append('avatar', selectedFile.value)
    }

    const { data } = await apiClient.put('/api/user/me', dataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    emit('profile-updated', data.user)
    emit('close')

  } catch (error) {
    errorMessage.value = error.response?.data?.message || t('editProfile.unexpectedError')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>