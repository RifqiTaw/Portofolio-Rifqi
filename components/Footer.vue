<!-- components/Footer.vue -->
<template>
  <footer class="bg-[#f5f5f5] text-center py-4">
    <p class="text-gray-700">
      Created by <strong>Rifqi Taufiqurrohman</strong>, using
      <strong>Nuxt</strong> and <strong>Tailwind CSS</strong>. &copy;
      {{ currentYear }}
    </p>
  </footer>
</template>

<script setup>
import { ref } from "vue";

// Get the current year
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* Tambahkan style tambahan jika diperlukan */
</style>
