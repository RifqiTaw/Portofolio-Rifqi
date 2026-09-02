<script setup lang="ts">
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface NavLink {
  to: string;
  label: string;
}

const navLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/project", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

const route = useRoute();
const navbar = ref<HTMLElement | null>(null);
const isMobileMenuOpen = ref(false);

const isActive = (path: string) => route.path === path;

const linkClass = (path: string, extra?: string) =>
  cn(
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
    isActive(path) ? "text-[#00E5FF]" : "text-white hover:text-[#00C6FF]",
    extra,
  );

let navTween: gsap.core.Tween | null = null;

const animateNavbar = () => {
  if (!navbar.value) return;

  navTween?.kill();
  navTween = gsap.fromTo(
    navbar.value,
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
  );
};

// Re-run on every route change (including browser back/forward), and make sure
// the mobile menu never stays open after navigating.
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
    animateNavbar();
  },
);

onMounted(() => {
  animateNavbar();
});

onUnmounted(() => {
  navTween?.kill();
});
</script>

<template>
  <nav
    ref="navbar"
    class="relative text-white shadow w-full h-[92px] z-20 flex items-center"
  >
    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full"
    >
      <!-- Left Section: Logo -->
      <div class="flex items-center flex-shrink-0">
        <NuxtLink to="/" class="text-2xl font-bold logo">
          <span class="text-white hover:text-[#00C6FF]"> Rifqi Taw </span>
        </NuxtLink>
      </div>

      <!-- Desktop menu items -->
      <div class="hidden md:flex flex-1 items-center justify-center space-x-4">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="linkClass(link.to)"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Right Section: GitHub Icon + Mobile Toggle -->
      <div class="flex items-center space-x-4">
        <a
          href="https://github.com/RifqiTaw"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          class="hover:text-[#00C6FF]"
        >
          <Icon name="mdi:github" size="30" />
        </a>

        <button
          type="button"
          class="md:hidden rounded-md p-1 text-white transition-colors duration-200 hover:text-[#00C6FF]"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Icon
            :name="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
            size="28"
          />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="absolute inset-x-0 top-full z-30 border-y border-white/10 bg-gray-900/95 backdrop-blur-sm md:hidden"
      >
        <div class="flex flex-col px-4 py-3 sm:px-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="linkClass(link.to, 'py-3 text-base')"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
a {
  text-decoration: none;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
