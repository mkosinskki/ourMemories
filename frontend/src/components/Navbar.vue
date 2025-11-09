<template>
  <nav class="bg-linear-to-l from-color4 to-color3 shadow-md fixed top-0 w-full z-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="shrink-0 flex items-center">
          <img src="../assets/navbarLogo.png" alt="Logo" class="w-10 h-auto"/>
        </div>

        
        <div class="hidden md:flex space-x-15 text-heading font-medium">
          <a href="/map" class="hover:text-whiteBlue transition">{{ t('nav.map') }}</a>
          <a href="/panel" class="hover:text-whiteBlue transition">{{ t('nav.panel') }}</a>
          <a href="/profile" class="hover:text-whiteBlue transition">{{ t('nav.profile') }}</a>
          <button
            @click="logout"
            class="text-red-500 hover:text-red-300 transition"
            :title="t('nav.logout')"
          >
            {{ t('nav.logout') }}
          </button>
          <select
            v-model="locale"
            class="bg-transparent border border-heading rounded-md p-1 text-sm focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="pl" class="text-black">PL</option>
            <option value="en" class="text-black">EN</option>
          </select>
        </div>


        <div class="md:hidden flex items-center">
          <select
            v-model="locale"
            class="bg-transparent border border-heading rounded-md p-1 text-sm mr-2 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="pl" class="text-black">PL</option>
            <option value="en" class="text-black">EN</option>
          </select>

          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-heading focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <svg
              v-if="!isOpen"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>


    <transition name="fade">
      <div v-if="isOpen" class="md:hidden bg-color1 shadow-inner">
        <div class="px-4 py-4 space-y-2 text-center text-heading font-medium">
          <a href="/map" class="block py-2 hover:text-color4">{{ t('nav.map') }}</a>
          <a href="/panel" class="block py-2 hover:text-color4">{{ t('nav.panel') }}</a>
          <a href="/profile" class="block py-2 hover:text-color4">{{ t('nav.profile') }}</a>
          <button
            @click="logout"
            class="text-red-600 hover:text-red-400 transition"
            :title="t('nav.logout')"
          >
            {{ t('nav.logout') }}
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const isOpen = ref(false)
const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  isOpen.value = false

  router.push({ path: '/login', replace: true })
}

watch(locale, (newLocale) => {
  localStorage.setItem('lang', newLocale)
  document.documentElement.lang = newLocale
})

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
