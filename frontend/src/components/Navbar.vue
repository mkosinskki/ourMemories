<template>
  <nav class="bg-linear-to-l from-color4 to-color3 shadow-md fixed top-0 w-full z-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="shrink-0 flex items-center">
          <img src="../assets/navbarLogo.png" alt="Logo" class="w-10 h-auto"/>
        </div>

        
        <div class="hidden md:flex space-x-15 text-[#000000]/90 font-medium">
          <a href="/map" class="hover:text-whiteBlue transition">Map</a>
          <a href="/panel" class="hover:text-whiteBlue transition">Panel</a>
          <a href="/profile" class="hover:text-whiteBlue transition">Profile</a>
        </div>


        <div class="md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-[#000000]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
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
        <div class="px-4 py-4 space-y-2 text-center text-[#000000]/90 font-medium">
          <a href="/map" class="block py-2 hover:text-color4">Map</a>
          <a href="/panel" class="block py-2 hover:text-color4">Panel</a>
          <a href="/profile" class="block py-2 hover:text-color4">Profile</a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
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
