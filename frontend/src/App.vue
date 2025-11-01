<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #00000060;
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-color4);
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-whiteBlue);
}

::-webkit-scrollbar-button:increment html {
  scrollbar-width: thin;

  scrollbar-color: var(--color-color4) #00000060;
}
</style>
