<script setup lang="ts">
import Timeline from "primevue/timeline";
import { gsap } from "gsap";
import { ref, onMounted } from "vue";

interface Event {
  date: string;
  title: string;
  role: string;
  link: string;
  description: string;
  color?: string;
  icon?: string;
  image?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

const events = ref<Event[]>([
  {
    date: "2026-01-05",
    title: "AW Advantage - Bali",
    role: "Frontend Developer",
    link: "https://aw-advantage.com/",
    description:
      "Building and maintaining frontend for several internal web applications using modern frameworks.",
    color: "#007bff",
    icon: "mdi:briefcase-check",
    image: "https://aw-advantage.com/wp-content/uploads/2025/01/Logo-AW-Advantage-1.webp",
    startDate: "January 2026",
    endDate: "Present",
    current: true,
  },
  {
    date: "2023-01-01",
    title: "Telkom Education Foundation - Bandung",
    role: "Frontend Developer",
    link: "https://ypt.or.id/",
    description:
      "Developed and maintained frontend for internal academic and administrative applications.",
    color: "#e4072e",
    icon: "mdi:school",
    image: "https://ypt.or.id/wp-content/uploads/2022/06/yptlogo-1-e1647453672991-removebg-preview1.png",
    startDate: "August 2022",
    endDate: "December 2025",
    current: false,
  },
  {
    date: "2023-02-15",
    title: "PT. Pertamina EP Asset 4 Field Poleng - Surabaya",
    role: "ICT Intern (Information & Communication Technology)",
    link: "https://pep.pertamina.com/",
    description:
      "Assisted in developing internal web tools and supporting ICT infrastructure for field operations.",
    color: "#28a745",
    icon: "mdi:desktop-classic",
    image: "/images/pertamina.png",
    startDate: "June 2019",
    endDate: "August 2019",
    current: false,
  },
]);

const hoverCard = (event: MouseEvent) => {
  gsap.to(event.currentTarget, { scale: 1.05, duration: 0.3 });
};

const resetCard = (event: MouseEvent) => {
  gsap.to(event.currentTarget, { scale: 1, duration: 0.3 });
};

onMounted(() => {
  gsap.from(".customized-timeline", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
  });
});
</script>

<template>
  <div class="text-white py-16">
    <div class="mx-auto max-w-7xl px-6">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white">Where I've Worked</h2>
      </div>

      <!-- Project Cards -->
      <div class="max-w-7xl mx-auto">
        <Timeline :value="events" align="alternate" class="customized-timeline">
          <template #marker="slotProps">
            <span
              class="flex w-10 h-10 items-center justify-center text-white rounded-full shadow-md"
              :style="{ backgroundColor: slotProps.item.color }"
            >
              <Icon :name="slotProps.item.icon" class="text-xl" />
            </span>
          </template>

          <template #content="slotProps">
            <div
              class="mt-4 p-6 shadow-lg bg-white text-black rounded-lg transform transition duration-300 hover:scale-105 relative"
              :class="{ 'ring-4 ring-green-500': slotProps.item.current }"
              @mouseover="hoverCard($event)"
              @mouseleave="resetCard($event)"
            >
              <!-- Currently Working Badge -->
              <div
                v-if="slotProps.item.current"
                class="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-lg"
              >
                Currently Working
              </div>

              <p class="font-bold text-lg">{{ slotProps.item.title }}</p>
              <h4 class="text-blue-600 font-semibold">
                {{ slotProps.item.role }}
              </h4>

              <span class="text-gray-500 text-sm">
                {{ slotProps.item.startDate }} -
                <span v-if="slotProps.item.current">Present</span>
                <span v-else>{{ slotProps.item.endDate }}</span>
              </span>

              <div class="flex items-center mt-3">
                <NuxtImg
                  v-if="slotProps.item.image"
                  :src="slotProps.item.image"
                  :alt="slotProps.item.title"
                  width="96"
                  loading="lazy"
                  class="rounded-lg shadow-sm w-24 mr-4 object-contain"
                />
                <p class="text-sm text-gray-700">{{ slotProps.item.description }}</p>
              </div>

              <a
                :href="slotProps.item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 hover:border-blue-400 transition-colors duration-200"
              >
                <Icon name="mdi:open-in-new" class="text-sm" />
                Visit Website
              </a>
            </div>
          </template>
        </Timeline>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customized-timeline .pi {
  font-size: 1.5rem;
}
</style>
