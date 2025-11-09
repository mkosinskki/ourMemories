<template>
  <div
    class="min-h-screen bg-linear-to-br from-color4/80 to-color3/40 flex items-center justify-center p-4"
  >
    <div
      class="w-full max-w-[500px] bg-white/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl pb-8 px-6 pt-2"
    >
      <div class="flex flex-col items-center">
        <img src="../assets/logo.png" alt="Logo" class="w-40 h-auto mb-0" />

        <h2 class="text-2xl font-bold text-heading mb-2">{{ t('loginPage.title') }}</h2>

        <p class="text-sm text-heading mb-8 text-center">
          {{ t('loginPage.info') }}
        </p>

        <form class="w-full space-y-6 min-h-[350px]" @submit.prevent="submit">
          <div>
            <label for="email" class="block text-medium font-medium text-heading mb-1"
              >{{ t('loginPage.email') }}</label
            >
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              class="w-full p-3.5 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm"
              v-model="email"
            />
          </div>

          <div>
            <label for="password" class="block text-medium font-medium text-heading mb-1"
              >{{ t('loginPage.password') }}</label
            >
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              class="w-full p-3.5 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm"
              v-model="password"
            />
          </div>

          <button
            type="submit"
            class="w-full p-3.5 mt-8 rounded-lg bg-white/80 text-heading font-semibold hover:bg-white transition-colors hover:text-color4"
          >
            {{ loading ? t('loginPage.loginProgress') : t('loginPage.loginButton') }}
          </button>

          <transition name="fade">
            <div
              v-if="errorMessage"
              class="w-full text-center text-red-600 text-sm font-medium p-2 bg-red-100/70 rounded-lg"
            >
              {{ errorMessage }}
            </div>
          </transition>
        </form>

        <div class="mt-6 text-center text-sm">
          <p class="text-basictext">
            {{ t('loginPage.passReset') }}
            <a
              href="/passowrd-reset"
              class="font-medium text-basictext underline hover:text-color4"
              >{{ t('loginPage.passResetLink') }}</a
            >
          </p>
          <p class="text-basictext mt-2">
            {{ t('loginPage.register') }}
            <a href="/register" class="font-medium text-basictext underline hover:text-color4"
              >{{ t('loginPage.registerLink') }}</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const router = useRouter()

const submit = async () => {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = t('loginPage.formCompletionError')
    return
  }

  loading.value = true

  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    router.push('/')
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        errorMessage.value = error.response.data?.msg
      } else {
        errorMessage.value = t('loginPage.serverError')
      }
    } else if (error.request) {
      errorMessage.value = t('loginPage.responseError')
    } else {
      errorMessage.value = t('loginPage.unexpectedError')
    }
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
