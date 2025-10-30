<template>
  <div
    class="min-h-screen bg-linear-to-br from-color4/80 to-color3/40 flex items-center justify-center p-4"
  >
    <div
      class="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl pb-8 pl-6 pr-6 pt-2"
    >
      <div class="flex flex-col items-center">
        <img src="../assets/logo.png" alt="Logo" class="w-40 h-auto mb-0" />

        <h2 class="text-2xl font-bold text-[#000000]/90 mb-2">Cześć Natifilip4</h2>

        <p class="text-sm text-[#000000]/90 mb-8 text-center">
          Zaloguj się na swoje konto by oglądać wspomnienia.
        </p>

        <form class="w-full space-y-6">
          <div>
            <label for="email" class="block text-medium font-medium text-[#000000]/90 mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="natifilip4@gmail.com"
              class="w-full p-3.5 rounded-lg border-none bg-white/70 focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-gray-500 text-sm"
            />
          </div>

          <div>
            <label for="password" class="block text-medium font-medium text-[#000000]/90 mb-1"
              >Hasło</label
            >
            <input
              type="password"
              id="password"
              placeholder="********"
              class="w-full p-3.5 rounded-lg border-none bg-white/70 focus:outline-none focus:ring-2 focus:ring-color4 placeholder:text-gray-500 text-sm"
            />
          </div>

          <button
            type="submit"
            class="w-full p-3.5 mt-8 rounded-lg bg-white/80 text-[#000000]/90 font-semibold hover:bg-white transition-colors hover:text-color4"
          >
            Zaloguj się
          </button>
        </form>

        <div class="mt-6 text-center text-sm">
          <p class="text-[#000000]/70">
            Nie pamiętasz hasła?
            <a href="/passowrd-reset" class="font-medium text-[#000000]/70 underline hover:text-color4">Zresetuj je.</a>
          </p>
          <p class="text-[#000000]/70 mt-2">
            Nie masz jeszcze konta?
            <a href="/register" class="font-medium text-[#000000]/70 underline hover:text-color4">Zarejestruj się.</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
