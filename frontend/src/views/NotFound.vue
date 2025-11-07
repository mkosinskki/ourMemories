<template>
    
    <Navbar />

    <div class="min-h-screen grow bg-linear-to-br from-color4/80 to-color3/40 flex items-center justify-center p-4">
      <div class="flex flex-col items-center text-center">

        <img src="../assets/logo.png" alt="Unauthorized" class="w-70 h-auto md:w-100" /> 
        <div class="bg-whiteBlue rounded-xl shadow-lg px-8 py-4">
          <h1 class="text-2xl md:text-3xl font-bold text-heading">
            404 - Page not found
          </h1>
        </div>

      </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'; 
</script>

<style scoped> </style>