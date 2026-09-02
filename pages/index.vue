<script setup lang="ts">
import { gsap } from "gsap";

useSeoMeta({
  title: "Rifqi Taufiqurrohman - Fullstack Developer",
  description:
    "Fullstack Developer based in Bali, Indonesia. Frontend-focused, building web applications with Vue, Nuxt, React, Node.js, and Laravel.",
  ogTitle: "Rifqi Taufiqurrohman - Fullstack Developer",
  ogDescription: "Fullstack Developer, currently working at AW Advantage.",
  ogImage: "/images/foto-fullbody.jpg",
});

const root = ref<HTMLElement | null>(null);
const image = ref<HTMLDivElement | null>(null);
const headline = ref<HTMLHeadingElement | null>(null);
const subheadline = ref<HTMLParagraphElement | null>(null);
const name = ref<HTMLParagraphElement | null>(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(image.value, {
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.from([headline.value, subheadline.value, name.value], {
      opacity: 0,
      y: 20,
      duration: 1.2,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, root.value ?? undefined);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <div
    ref="root"
    class="relative flex flex-col items-center justify-center h-full"
  >
    <div class="relative w-1/3 bg-white p-4 shadow-lg rounded-lg" ref="image">
      <NuxtImg
        src="/images/foto-fullbody.jpg"
        alt="Rifqi Taufiqurrohman"
        class="rounded-lg max-h-96 w-full object-cover"
      />
    </div>

    <div class="absolute bottom-10 z-10 text-center">
      <div class="bg-gray-900/60 p-6 rounded-lg backdrop-blur-sm">
        <h1 ref="headline" class="text-4xl font-bold text-white">
          Fullstack Developer
        </h1>
        <p ref="subheadline" class="mt-4 text-xl font-medium text-white">
          Currently working in AW Advantage
        </p>
        <p ref="name" class="mt-2 text-lg font-semibold text-white">
          Rifqi Taufiqurrohman
        </p>

        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <NuxtLink
            to="/services"
            class="inline-flex items-center gap-2 rounded-lg bg-[#00E5FF] px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-md transition-colors duration-200 hover:bg-[#00C6FF]"
          >
            <Icon name="lucide:briefcase" class="h-4 w-4" />
            View Services
          </NuxtLink>
          <NuxtLink
            to="/project"
            class="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#00E5FF] hover:text-[#00E5FF]"
          >
            <Icon name="lucide:folder-open" class="h-4 w-4" />
            View Projects
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-full {
  height: calc(100vh - 200px);
}
</style>
