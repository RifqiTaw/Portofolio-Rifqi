<template>
  <div class="flex flex-col min-h-screen">
    <div v-show="loading" class="loading-screen" ref="loadingScreen">
      <h1 class="loading-logo">Rifqi Taw</h1>
    </div>
    <div v-show="!loading" class="content" ref="content">
      <Navbar />
      <main class="flex-1">
        <NuxtPage />
      </main>
      <Footer />
      <!-- Scroll Indicator -->
      <div class="scroll-indicator fixed bottom-5 right-5">
        <div ref="scrollIcon" class="mouse-icon">
          <span class="scroll-wheel"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import gsap from "gsap";

const loading = ref(true);
const loadingScreen = ref(null);
const content = ref(null);

onMounted(async () => {
  await nextTick();

  gsap
    .timeline()
    .fromTo(
      ".loading-logo",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1.5, duration: 1.5, ease: "power4.inOut" }
    )
    .to(".loading-logo", {
      scale: 1,
      duration: 0.5,
      ease: "power4.out",
    })
    .to(loadingScreen.value, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        loading.value = false;
      },
    });

  gsap.fromTo(
    content.value,
    { opacity: 0 },
    { opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 }
  );

  gsap.fromTo(
    ".scroll-wheel",
    { y: 0, opacity: 1 },
    {
      y: 10,
      opacity: 0,
      repeat: -1,
      duration: 1,
      ease: "power2.inOut",
    }
  );
});
</script>

<style scoped>
.mouse-icon {
  width: 34px;
  height: 62px;
  border: 2px solid white;
  border-radius: 16px;
  position: relative;
  margin-bottom: 20px;
}
.mouse-icon::after {
  content: "";
  width: 2px;
  height: 50px;
  background-color: white;
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  background-color: white;
  border-radius: 2px;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
}
.content {
  background-image: url("/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #0d1b2a !important;
  opacity: 0;
}
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.loading-logo {
  font-family: "Poppins", sans-serif;
  font-size: 5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #005b43, #2b2c71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  opacity: 0;
}
</style>
