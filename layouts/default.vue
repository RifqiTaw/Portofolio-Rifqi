<script setup lang="ts">
import gsap from "gsap";

const loading = ref<boolean>(true);
const canScroll = ref<boolean>(false);
const introDone = useIntroDone();
const loadingScreen = ref<HTMLElement | null>(null);

let scrollTween: gsap.core.Tween | null = null;
let resizeObserver: ResizeObserver | null = null;

// The mouse hint only makes sense when there is actually something to scroll.
const updateScrollable = () => {
  canScroll.value =
    document.documentElement.scrollHeight > window.innerHeight + 1;
};

onMounted(() => {
  // The intro runs on CSS keyframes from the first paint, so it never waits
  // for hydration (on a slow connection that left a blank black screen).
  // JS only listens for the end; if it already ended, this resolves at once.
  const finish = () => {
    loading.value = false;
    introDone.value = true;
  };
  const anims = loadingScreen.value?.getAnimations() ?? [];
  Promise.all(anims.map((a) => a.finished)).then(finish, finish);

  scrollTween = gsap.fromTo(
    ".scroll-wheel",
    { y: 0, opacity: 1 },
    { y: 10, opacity: 0, repeat: -1, duration: 1, ease: "power2.inOut" },
  );

  // Body size changes on navigation, image loads, and viewport resizes.
  resizeObserver = new ResizeObserver(updateScrollable);
  resizeObserver.observe(document.body);
  window.addEventListener("resize", updateScrollable, { passive: true });
  updateScrollable();
});

onUnmounted(() => {
  scrollTween?.kill();
  resizeObserver?.disconnect();
  window.removeEventListener("resize", updateScrollable);
});
</script>

<template>
  <div class="flex flex-col min-h-screen background-image">
    <div v-show="loading" class="loading-screen" ref="loadingScreen">
      <p class="loading-logo" aria-hidden="true">Rifqi Taw</p>
    </div>

    <div class="flex flex-col flex-1">
      <Header />
      <main class="flex flex-1 flex-col">
        <slot />
      </main>

      <!-- Scroll Indicator (only when the page can scroll) -->
      <div
        v-show="canScroll"
        class="scroll-indicator fixed bottom-5 right-5"
        aria-hidden="true"
      >
        <div class="mouse-icon">
          <span class="scroll-wheel"></span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

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

.background-image {
  background-image: url("/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #0d1b2a !important;
  opacity: 1;
  min-height: 100vh;
  height: 100%;
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
  /* 2s logo, then a 1s fade. `visibility` stops it blocking clicks at the end. */
  animation: intro-out 1s ease-in-out 2s forwards;
}
.loading-logo {
  font-family: "Poppins", sans-serif;
  font-size: clamp(2.5rem, 12vw, 5rem);
  font-weight: 700;
  background: linear-gradient(90deg, #005b43, #2b2c71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  animation: logo-in 2s both;
}

@keyframes logo-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
    animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
  }
  75% {
    opacity: 1;
    transform: scale(1.5);
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes intro-out {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading-screen {
    animation-duration: 0.4s;
    animation-delay: 0.6s;
  }
  .loading-logo {
    animation: none;
  }
}
</style>
