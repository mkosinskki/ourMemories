<template>

    <Navbar />

    <div class="min-h-screen bg-linear-to-br from-color4/80 to-color3/40 flex items-center justify-center p-4 pt-20 pb-15 md:pb-10">
      <div class="w-full max-w-7xl mx-auto flex flex-col gap-6">

        <div class="bg-color1 rounded-xl shadow-md p-5 md:p-6">
          <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
            
            <div class="flex items-center gap-4">
              <img 
                src="https://placehold.co/80x80/F0E68C/FFFFFF" 
                alt="Avatar" 
                class="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-color3 shadow-sm object-cover shrink-0"
              />
              <div class="flex flex-col justify-center -translate-y-0.5">
                <h2 class="text-xl md:text-2xl font-bold text-black/90">Jan Kowalski</h2>
                
                <div class="flex items-center gap-2 mt-1 text-sm text-black/70">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>example@gmail.com</span>
                </div>
                
                <div class="flex items-center gap-2 mt-1 text-sm text-black/70">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>DD.MM.YYYY</span>
                </div>
              </div>
            </div>

            <div class="shrink-0">
              <button class="text-sm font-medium text-color4 hover:underline focus:outline-none px-4 py-2">
                Edit profile
              </button>
            </div>

          </div>
        </div>

        <div class="bg-whiteBlue rounded-xl shadow-md p-5">
          <div class="bg-color3 rounded-md">
            <h3 class="text-2xl font-bold text-black/90 text-center mb-6 p-3">
              Statystyki
            </h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col text-center">
              
              <div class="bg-color2 text-black/70 font-medium py-2 px-4 rounded-md shadow-sm">
                {{ stat.label }}
              </div>
              
              <div class="py-10 md:py-20">
                <span class="text-2xl font-bold text-black/90">
                  {{ stat.value }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue'

const stats = ref([
  { label: 'Memories added', value: '38' },
  { label: 'Locations visited', value: '15' },
  { label: 'First memory added', value: '11.01.2023' },
  { label: 'Memories added', value: '38' },
  { label: 'Memories added', value: '38' },
  { label: 'Memories added', value: '38' },
]);

</script>

<style scoped> </style>