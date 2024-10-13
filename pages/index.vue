<template>
  <div class="relative flex flex-col items-center justify-center h-full">
    <div class="relative w-1/3 bg-white p-4 shadow-lg rounded-lg">
      <img
        ref="image"
        src="/images/foto-fullbody.jpg"
        alt="Full Body Image"
        class="rounded-lg max-h-96 w-full object-cover"
      />
    </div>

    <div class="absolute bottom-10 z-10 text-center">
      <div class="bg-gray-900 bg-opacity-60 p-6 rounded-lg">
        <h1 ref="headline" class="text-4xl font-bold text-white animate-typing">
          Frontend Developer
        </h1>
        <p
          ref="subheadline"
          class="mt-4 text-xl font-medium text-white animate-fade-in"
        >
          Currently working in Telkom Foundation
        </p>
        <p ref="subheadline" class="mt-2 text-lg font-semibold text-white">
          Rifqi Taufiqurrohman
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";

const image = ref(null);
const headline = ref(null);
const subheadline = ref(null);

onMounted(async () => {
  gsap.from(image.value, {
    opacity: 0,
    scale: 0.5,
    duration: 1.5,
    ease: "power2.out",
  });

  gsap.to(headline.value, {
    text: "Frontend Developer",
    duration: 2.5,
    ease: "power1.inOut",
    delay: 0.5,
  });

  gsap.from(subheadline.value, {
    opacity: 0,
    y: 20,
    duration: 1.5,
    ease: "power2.out",
    delay: 2,
  });
});
</script>

<style scoped>
.h-full {
  height: calc(100vh - 200px); /* Take into account the footer's height */
}
</style>
