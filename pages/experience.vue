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
              <i :class="slotProps.item.icon"></i>
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

              <a
                :href="slotProps.item.link"
                target="_blank"
                class="font-bold text-lg"
                >{{ slotProps.item.title }}</a
              >
              <h4 class="text-blue-600 font-semibold">
                {{ slotProps.item.role }}
              </h4>

              <span class="text-gray-500">
                {{ slotProps.item.startDate }} -
                <span v-if="slotProps.item.current">Present</span>
                <span v-else>{{ slotProps.item.endDate }}</span>
              </span>

              <div class="flex items-center mt-2">
                <img
                  v-if="slotProps.item.image"
                  :src="`/images/${slotProps.item.image}`"
                  :alt="slotProps.item.name"
                  class="rounded-lg shadow-sm w-24 mr-4"
                />
                <p>{{ slotProps.item.description }}</p>
              </div>
            </div>
          </template>
        </Timeline>
      </div>
    </div>
  </div>
</template>

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
    date: "2023-01-01",
    title: "Telkom Education Foundation - Bandung",
    role: "Frontend Developer",
    link: "https://ypt.or.id/",
    description:
      "Responsible for frontend development of several internal applications.",
    color: "#007bff",
    icon: "pi pi-calendar",
    image: "logo-ypt.png",
    startDate: "August 2022",
    endDate: "Present",
    current: true,
  },
  {
    date: "2023-02-15",
    title: "PT. Pertamina EP Asset 4 Field Poleng - Surabaya",
    role: "Unit ICT(Information & Communication Technology)",
    link: "https://pep.pertamina.com/",
    description:
      "Develop web applications for internal company and public projects.",
    color: "#28a745",
    icon: "pi pi-cog",
    image: "logo-pertamina.png",
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
<style scoped>
.customized-timeline .pi {
  font-size: 1.5rem;
}
</style>
