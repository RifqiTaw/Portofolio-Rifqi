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

interface Project {
  title: string;
  description: string;
  image: string;
  company: string;
  link: string;
  website: string;
  tags: string[];
  comingSoon: boolean;
  confidential: boolean;
  startDate: string;
  endDate: string | null;
}

const formatDuration = (start: string, end: string | null): string => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const startLabel = startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const endLabel = end
    ? endDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Present";

  let duration = "";
  if (years > 0) duration += `${years}y `;
  if (remainingMonths > 0) duration += `${remainingMonths}mo`;
  if (!duration) duration = "< 1 mo";

  return `${startLabel} – ${endLabel} · ${duration.trim()}`;
};

const projects = ref<Project[]>([
  {
    title: "Aiku - B2B AI Ecosystem Platform",
    description:
      "Aiku is a B2B networking and smart-matching platform designed for the AI ecosystem, connecting startups with investors and partners through specialized filtering tools. Developed by Aloha Dijital Bilisim, the platform facilitates deal acceleration and ecosystem tracking via its web application and mobile apps.",
    image: "https://aw-advantage.com/wp-content/uploads/2025/01/Logo-AW-Advantage-1.webp",
    company: "AW Advantage",
    link: "https://github.com/Inikoo-Ltd/aiku",
    website: "https://app.aiku.io/",
    tags: ["Laravel", "Inertia.js", "Tailwind CSS", "PrimeVue", "Pinia"],
    comingSoon: false,
    confidential: true,
    startDate: "2013-01-01",
    endDate: null,
  },
  {
    title: "DIGITS Telkom Schools - Registration Module",
    description:
      "The DigiTS application is an application used by YPT to carry out continuous development of the quality of education delivery which is adjusted to the internal and external conditions of the Telkom Education Foundation.",
    image: "/images/login-portal.png",
    company: "Telkom Education Foundation",
    link: "",
    website: "https://digits.telkomschools.sch.id/",
    tags: ["Nuxt", "Vue.js", "Bootstrap"],
    comingSoon: false,
    confidential: true,
    startDate: "2024-01-01",
    endDate: null,
  },
  {
    title: "Xiaomi Website Indonesia",
    description: "Clone xiaomi website indonesia mi.co.id (only phone).",
    image: "/images/xiaomi.png",
    company: "Xiaomi Corporation",
    link: "https://github.com/RifqiTaw/fs-xiaomi-phone",
    website: "",
    tags: ["React JS", "Tailwind CSS", "Redux", "Vite"],
    comingSoon: false,
    confidential: false,
    startDate: "2023-06-01",
    endDate: "2023-07-01",
  },
  {
    title: "News Portal New York Times",
    description:
      "The New York Times (NYT) is one of the most prominent and influential news portals globally, known for its comprehensive coverage, investigative journalism, and digital innovation.",
    image: "/images/portal.png",
    company: "Dummy Project",
    link: "https://github.com/RifqiTaw/portal-news",
    website: "https://portal-news-psi.vercel.app/",
    tags: ["Angular", "Tailwind CSS", "Rxjs"],
    comingSoon: false,
    confidential: false,
    startDate: "2023-04-01",
    endDate: "2023-05-01",
  },
  {
    title:
      "Determining Bandung Raya Tourism Routes Using the Cheapest Insertion Heuristic Algorithm",
    description:
      "The application aims to make it easier for tourists to determine tourist routes based on several categories such as costs, rates and the number of selected tourist attractions.",
    image: "/images/travelrs.png",
    company: "S1 thesis application",
    link: "https://github.com/RifqiTaw/travelrs",
    website: "",
    tags: ["Codeigniter", "Python", "PHP"],
    comingSoon: false,
    confidential: false,
    startDate: "2020-12-01",
    endDate: "2021-01-01",
  },
  {
    title: "Project 3",
    description: "This is a description for project 3.",
    image: "/images/3.jpeg",
    link: "https://github.com/RifqiTaw",
    website: "https://github.com/RifqiTaw",
    tags: ["Bootstrap", "Vue.js"],
    comingSoon: true,
    confidential: false,
    company: "",
    startDate: "",
    endDate: null,
  },
]);

const imageErrors = ref<Record<number, boolean>>({});

const handleImageError = (index: number) => {
  imageErrors.value[index] = true;
};

const getTagClass = (tag: string) => {
  const tagClasses = {
    Nuxt: "bg-blue-100 text-blue-800",
    "Vue.js": "bg-gray-100 text-gray-800",
    Bootstrap: "bg-yellow-100 text-yellow-800",
    "React JS": "bg-teal-100 text-teal-800",
    "Tailwind CSS": "bg-indigo-100 text-indigo-800",
    Redux: "bg-red-100 text-red-800",
    Vite: "bg-purple-100 text-purple-800",
    Laravel: "bg-red-100 text-red-800",
    "Inertia.js": "bg-violet-100 text-violet-800",
    PrimeVue: "bg-blue-100 text-blue-800",
    Pinia: "bg-yellow-100 text-yellow-800",
  } as const;

  return (
    tagClasses[tag as keyof typeof tagClasses] || "bg-gray-100 text-gray-800"
  );
};
</script>

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
            <div class="relative mb-4">
              <!-- Image fallback -->
              <div
                v-if="imageErrors[index]"
                class="w-full h-48 rounded-lg bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm">Image not available</span>
              </div>
              <NuxtImg
                v-else
                :src="project.image"
                alt="Project Image"
                class="w-full h-48 object-cover rounded-lg"
                placeholder="blur"
                @error="handleImageError(index)"
              />
              <!-- Confidential overlay -->
              <div
                v-if="project.confidential && !imageErrors[index]"
                class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg"
              >
                <span class="text-white text-xl font-semibold">Confidential Content</span>
              </div>
            </div>

            <!-- Content Section -->
            <div class="flex flex-col flex-grow">
              <h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
              <p class="text-gray-600 mb-4 flex-grow">
                {{ project.description }}
              </p>
              <p class="text-gray-600 mb-1">Company: {{ project.company }}</p>
              <p v-if="project.startDate" class="text-gray-400 text-sm mb-4">
                {{ formatDuration(project.startDate, project.endDate) }}
              </p>

              <!-- Tags Section -->
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

              <!-- GitHub and Website Links -->
              <div class="border-t pt-4 flex space-x-4">
                <NuxtLink
                  :to="project.link"
                  target="_blank"
                  :class="[
                    { 'text-gray-400 cursor-not-allowed pointer-events-none': !project.link },
                    'text-blue-500 hover:text-blue-700 font-semibold',
                  ]"
                  :aria-disabled="!project.link"
                  >GitHub</NuxtLink
                >
                <NuxtLink
                  :to="project.website"
                  target="_blank"
                  :class="[
                    { 'text-gray-400 cursor-not-allowed pointer-events-none': !project.website },
                    'text-blue-500 hover:text-blue-700 font-semibold',
                  ]"
                  >Visit Website</NuxtLink
                >
              </div>
            </div>
          </template>

          <template v-else>
            <div
              class="relative h-full bg-gray-200 flex items-center justify-center"
            >
              <NuxtImg
                v-if="!imageErrors[index]"
                :src="project.image"
                alt="Project Image"
                class="absolute inset-0 w-full h-full object-cover opacity-30"
                placeholder="blur"
                @error="handleImageError(index)"
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

<style scoped></style>
