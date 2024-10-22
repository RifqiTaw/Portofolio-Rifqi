<template>
  <div class="py-16">
    <div class="mx-auto max-w-7xl px-6">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-white">
          All the projects I've ever done
        </h2>
      </div>

      <!-- Project Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="bg-white p-6 rounded-lg shadow-lg flex flex-col h-full"
        >
          <template v-if="!project.comingSoon">
            <NuxtImg
              :src="project.image"
              alt="Project Image"
              class="w-full h-48 object-cover rounded-lg mb-4"
            />

            <!-- Content Section -->
            <div class="flex flex-col flex-grow">
              <h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
              <p class="text-gray-600 mb-4 flex-grow">
                {{ project.description }}
              </p>
              <p class="text-gray-600 mb-4">Company: {{ project.company }}</p>

              <!-- Tags Section - Flexbox to push down the tags and links -->
              <div class="flex flex-wrap gap-2 mt-auto mb-4">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  :class="getTagClass(tag)"
                  class="text-sm font-medium px-2.5 py-0.5 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- GitHub and Website Links - Stick to the bottom -->
              <div class="border-t pt-4 flex space-x-4">
                <nuxt-link
                  :to="project.link"
                  target="_blank"
                  class="text-blue-500 hover:text-blue-700 font-semibold"
                  >GitHub</nuxt-link
                >
                <nuxt-link
                  :to="project.website"
                  target="_blank"
                  class="text-blue-500 hover:text-blue-700 font-semibold"
                  >Visit Website</nuxt-link
                >
              </div>
            </div>
          </template>

          <template v-else>
            <div
              class="relative h-full bg-gray-200 flex items-center justify-center"
            >
              <NuxtImg
                :src="project.image"
                alt="Project Image"
                class="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div class="relative z-10 text-center">
                <h2 class="text-3xl font-bold text-white">Coming Soon</h2>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

interface project {
  title: string;
  description: string;
  image: string;
  company: string;
  link: string;
  website: string;
  tags: string[];
  comingSoon: boolean;
}

const projects = ref<project[]>([
  {
    title: "DIGITS Telkom Schools - Registration Module",
    description:
      "The DigiTS application is an application used by YPT to carry out continuous development of the quality of education delivery which is adjusted to the internal and external conditions of the Telkom Education Foundation.",
    image: "/images/login-portal.png",
    company: "Telkom Education Foundation",
    link: "#",
    website: "https://digits.telkomschools.sch.id/",
    tags: ["Nuxt", "Vue.js", "Bootstrap"],
    comingSoon: false,
  },
  {
    title: "Xiaomi Website Indonesia",
    description: "Clone xiaomi website indonesia mi.co.id (only phone).",
    image: "/images/xiaomi.png",
    company: "Xiaomi Corporation",
    link: "https://github.com/RifqiTaw/fs-xiaomi-phone",
    website: "https://github.com/RifqiTaw",
    tags: ["React JS", "Tailwind CSS", "Redux", "Vite"],
    comingSoon: false,
  },
  {
    title:
      "Determining Bandung Raya Tourism Routes Using the Cheapest Insertion Heuristic Algorithm",
    description:
      "The application aims to make it easier for tourists to determine tourist routes based on several categories such as costs, rates and the number of selected tourist attractions.",
    image: "/images/login-portal.png",
    company: "S1 thesis application",
    link: "https://github.com/RifqiTaw/travelrs",
    website: "#",
    tags: ["Codeigniter", "Python", "PHP"],
    comingSoon: false,
  },
  {
    title: "DIGITS Telkom Schools - Registration Module",
    description:
      "The DigiTS application is an application used by YPT to carry out continuous development of the quality of education delivery which is adjusted to the internal and external conditions of the Telkom Education Foundation.",
    image: "/images/login-portal.png",
    company: "Telkom Education Foundation",
    link: "#",
    website: "https://digits.telkomschools.sch.id/",
    tags: ["Nuxt", "Vue.js", "Bootstrap"],
    comingSoon: false,
  },
  {
    title: "Project 3",
    description: "This is a description for project 3.",
    image: "/images/3.jpeg",
    link: "https://github.com/RifqiTaw",
    website: "https://github.com/RifqiTaw",
    tags: ["Bootstrap", "Vue.js"],
    comingSoon: true,
    company: "",
  },
]);

const getTagClass = (tag: string) => {
  const tagClasses = {
    Nuxt: "bg-blue-100 text-blue-800",
    "Vue.js": "bg-gray-100 text-gray-800",
    Bootstrap: "bg-yellow-100 text-yellow-800",
    "React JS": "bg-teal-100 text-teal-800",
    "Tailwind CSS": "bg-indigo-100 text-indigo-800",
    Redux: "bg-red-100 text-red-800",
    Vite: "bg-purple-100 text-purple-800",
  } as const;

  return (
    tagClasses[tag as keyof typeof tagClasses] || "bg-gray-100 text-gray-800"
  );
};
</script>
<style scoped></style>
