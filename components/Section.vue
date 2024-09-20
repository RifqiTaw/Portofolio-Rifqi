<template>
  <div class="">
    <div class="relative flex items-center justify-center min-h-screen">           
      <!-- Gambar di Tengah -->
      <img
        ref="image"
        src="/images/1.jpeg"
        alt="Placeholder Image"
        class="z-10 w-1/3 h-auto rounded-full shadow-lg"
      />

      <div class="absolute bottom-10 z-10 text-center">
        <div class="bg-gray-900 bg-opacity-60 p-6 rounded-lg">
          <h1
            ref="headline"
            class="text-4xl font-bold text-white animate-typing"
          >
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
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";

const image = ref(null);
const headline = ref(null);
const subheadline = ref(null);

onMounted(() => {
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
@keyframes typing {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.animate-typing {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 0.15em solid #000;
  animation: typing 3.5s steps(30, end), blink-caret 0.75s step-end infinite;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 2s ease-in-out forwards;
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
}
</style>
