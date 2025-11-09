<template>
  <div
    class="min-h-screen bg-linear-to-br from-color4/80 to-color3/40 flex items-center justify-center p-4"
  >
    <div
      class="w-full max-w-[500px] bg-white/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl pb-8 px-6 pt-2"
    >
      <div class="flex flex-col items-center">
        <img src="../assets/logo.png" alt="Logo" class="w-40 h-auto mb-0" />

        <h2 class="text-2xl font-bold text-heading mb-2">{{t('registerPage.title')}}</h2>

        <p class="text-sm text-heading mb-8 text-center">
          {{t('registerPage.info')}}
        </p>

        <form class="w-full space-y-6 min-h-[600px]" @submit.prevent="submit">
          <div class="flex gap-6">
            <div class="flex-1">
              <label for="firstName" class="block text-medium font-medium text-heading mb-1"
                >{{t('registerPage.name')}}</label
              >
              <input
                type="text"
                id="firstName"
                :placeholder="t('registerPage.name')"
                class="w-full p-3.5 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm"
                v-model="firstName"
              />
            </div>

            <div class="flex-1">
              <label for="surname" class="block text-medium font-medium text-heading mb-1"
                >{{t('registerPage.surname')}}</label
              >
              <input
                type="text"
                id="surname"
                :placeholder="t('registerPage.surname')"
                class="w-full p-3.5 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm"
                v-model="surname"
              />
            </div>
          </div>

          <div>
            <label for="dateOfBirth" class="block text-medium font-medium text-heading mb-1"
              >{{t('registerPage.birthday')}}</label
            >
            <input
              type="date"
              id="dateOfBirth"
              class="w-full p-3.5 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm"
              v-model="dateOfBirth"
            />
          </div>

          <div>
            <label for="email" class="block text-medium font-medium text-heading mb-1"
              >{{t('registerPage.email')}}</label
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
            <label for="password" class="block text-medium font-medium text-heading mb-1">
              {{t('registerPage.password')}}
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="••••••••"
                class="w-full p-3.5 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder0 text-sm"
                v-model="password"
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-formPlaceholder hover:text-gray-700"
              >
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 10.224 7.66 6.5 12 6.5s8.577 3.724 9.964 5.183c.375.375.375.983 0 1.358C20.577 14.776 16.34 18.5 12 18.5s-8.577-3.724-9.964-5.183a1.012 1.012 0 010-.639z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label
              for="passwordConfirmation"
              class="block text-medium font-medium text-heading mb-1"
            >
              {{t('registerPage.reenterPassword')}}
            </label>
            <div class="relative">
              <input
                :type="showPasswordConfirmation ? 'text' : 'password'"
                id="passwordConfirmation"
                placeholder="••••••••"
                class="w-full p-3.5 rounded-lg border-none bg-formBg focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-formPlaceholder text-sm"
                v-model="passwordConfirmation"
              />

              <button
                type="button"
                @click="showPasswordConfirmation = !showPasswordConfirmation"
                class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-formPlaceholder hover:text-gray-700"
              >
                <svg
                  v-if="!showPasswordConfirmation"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 10.224 7.66 6.5 12 6.5s8.577 3.724 9.964 5.183c.375.375.375.983 0 1.358C20.577 14.776 16.34 18.5 12 18.5s-8.577-3.724-9.964-5.183a1.012 1.012 0 010-.639z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="w-full p-3.5 mt-8 rounded-lg bg-white/80 text-heading font-semibold hover:bg-white transition-colors hover:text-color4"
          >
            {{ loading ? t('registerPage.registration') : t('registerPage.register') }}
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
            {{t('registerPage.loginInfo')}}
            <a href="/login" class="font-medium text-basictext underline hover:text-color4"
              >{{t('registerPage.login')}}</a
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

const firstName = ref('')
const surname = ref('')
const dateOfBirth = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const errorMessage = ref('')
const loading = ref(false)

const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

const router = useRouter()

const submit = async () => {
  errorMessage.value = ''

  if (!firstName.value) {
    errorMessage.value = t('registerPage.nameError')
    return
  }

  if (!surname.value) {
    errorMessage.value = t('registerPage.surnameError')
    return
  }

  if (!dateOfBirth.value) {
    errorMessage.value = t('registerPage.birthdayError')
    return
  }

  if (!email.value) {
    errorMessage.value = t('registerPage.emailError')
    return
  }

  if (!password.value) {
    errorMessage.value = t('registerPage.passwordError')
    return
  }

  if (!passwordConfirmation.value) {
    errorMessage.value = t('registerPage.reenterPasswordError')
    return
  }

  if (password.value != passwordConfirmation.value) {
    errorMessage.value = t('registerPage.differentPasswordsError')
    return
  }

  loading.value = true

  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      surname: surname.value,
      dateOfBirth: dateOfBirth.value,
    })

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    router.push('/')
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400 || error.response.status === 409) {
        const serverErrors = error.response.data?.errors

        if (serverErrors) {
          const firstErrorKey = Object.keys(serverErrors)[0]
          errorMessage.value = serverErrors[firstErrorKey]
        } else {
          errorMessage.value = error.response.data?.msg
        }
      } else {
        errorMessage.value = t('registerPage.serverError')
      }
    } else if (error.request) {
      errorMessage.value = t('registerPage.responseError')
    } else {
      errorMessage.value = t('registerPage.unexpectedError')
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
