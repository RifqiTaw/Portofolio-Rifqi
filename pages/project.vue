<template>
  <div class="bg-white py-16 pt-32">
    <div class="mx-auto max-w-7xl px-6">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">
          All the projects I've ever done
        </h2>
      </div>

      <!-- Project Cards -->
      <div
        class="skill-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="skill-card bg-white p-6 rounded-lg shadow-lg"
        >
          <template v-if="index !== 2">
            <img
              :src="project.image"
              alt="Project 1 Image"
              class="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
              <p class="text-gray-600">{{ project.description }}</p>
            </div>
          </template>
          <template v-else>
            <div
              class="relative h-full bg-gray-200 flex items-center justify-center"
            >
              <img
                :src="project.image"
                alt="project image"
                class="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div class="relative z-10 text-center">
                <h2 class="text-3xl font-bold text-white">Coming Soon</h2>
              </div>
            </div>
          </template>
          <div class="p-4" v-if="index !== 2">
            <p class="text-gray-600 mb-4">
              Perusahaan: {{ project.perusahaan }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                :class="{
                  'bg-blue-100 text-blue-800': tag === 'Nuxt',
                  'bg-gray-100 text-gray-800': tag === 'Vue.js',
                  'bg-yellow-100 text-yellow-800': tag === 'Bootstrap',
                }"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="p-4 border-t flex space-x-4" v-if="index !== 2">
            <nuxt-link
              :to="project.link"
              class="text-blue-500 hover:text-blue-700 font-semibold"
              >GitHub</nuxt-link
            >
            <nuxt-link
              :to="project.website"
              class="text-blue-500 hover:text-blue-700 font-semibold"
              >Visit Website</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { gsap } from "gsap";

onMounted(() => {
  gsap.from(".skill-card", {
    opacity: 0,
    y: 50,
    duration: 0.5,
    stagger: 0.2,
    ease: "power2.out",
  });
});
const projects = [
  {
    title: "DIGITS Telkom Schools - Modul Registrasi",
    description:
      "Aplikasi DigiTS merupakan aplikasi yang digunakan oleh YPT untuk melakukan pengembangan kualitas penyelenggaraan pendidikan secara berkelanjutan yang disesuaikan dengan kondisi internal dan eksternal dari Yayasan Pendidikan Telkom.",
    image: "/images/login-portal.png",
    perusahaan: "Yayasan Pendidikan Telkom",
    link: "https://github.com/RifqiTaw",
    website: "https://digits.telkomschools.sch.id/",
    tags: ["Nuxt", "Vue.js", "Bootstrap"],
    tanggal: "27 - 05 - 2024",
  },
  {
    title: "Xiaomi Website Indonesia",
    description: "Clone xiaomi website indonesia mi.co.id (only phone).",
    image: "/images/xiaomi.png",
    perusahaan: "Xiaomi Corporation",
    link: "https://github.com/RifqiTaw",
    website: "https://github.com/RifqiTaw",
    tags: ["React JS", "Tailwind CSS", "Redux", "Vite"],
    tanggal: "15 - 04 - 2024",
  },
  {
    title: "Project 3",
    description: "This is a description for project 3.",
    image: "/images/3.jpeg",
    link: "https://github.com/RifqiTaw",
    website: "https://github.com/RifqiTaw",
    tags: ["Bootstrap", "Vue.js"],
    tanggal: "10 - 03 - 2024",
  },
];
</script>
<style scoped></style>
