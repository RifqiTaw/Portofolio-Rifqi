<template>
  <nav
    ref="navbar"
    class="text-white shadow w-full h-[92px] z-20 flex items-center"
  >
    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full"
    >
      <!-- Left Section: Logo -->
      <div class="flex items-center flex-shrink-0">
        <a :class="`text-2xl font-bold logo`" href="/">
          <span class="text-white hover:text-[#00C6FF]"> Rifqi Taw </span>
        </a>
      </div>

      <!-- Desktop menu items -->
      <div class="hidden md:flex flex-1 items-center justify-center space-x-4">
        <router-link
          @click="animateNavbar"
          to="/"
          :class="`px-3 py-2 text-sm font-medium ${
            isActive('/') ? 'text-[#00E5FF]' : 'text-white hover:text-[#00C6FF]'
          }`"
        >
          Home
        </router-link>
        <router-link
          @click="animateNavbar"
          to="/about"
          :class="`px-3 py-2 rounded-md text-sm font-medium ${
            isActive('/about')
              ? 'text-[#00E5FF]'
              : 'text-white hover:text-[#00C6FF]'
          }`"
        >
          About
        </router-link>
        <router-link
          @click="animateNavbar"
          to="/experience"
          :class="`px-3 py-2 rounded-md text-sm font-medium ${
            isActive('/experience')
              ? 'text-[#00E5FF]'
              : 'text-white hover:text-[#00C6FF]'
          }`"
        >
          Experience
        </router-link>
        <router-link
          @click="animateNavbar"
          to="/project"
          :class="`px-3 py-2 rounded-md text-sm font-medium ${
            isActive('/project')
              ? 'text-[#00E5FF]'
              : 'text-white hover:text-[#00C6FF]'
          }`"
        >
          Projects
        </router-link>
        <router-link
          @click="animateNavbar"
          to="/contact"
          :class="`px-3 py-2 rounded-md text-sm font-medium ${
            isActive('/contact')
              ? 'text-[#00E5FF]'
              : 'text-white hover:text-[#00C6FF]'
          }`"
        >
          Contact
        </router-link>
      </div>

      <!-- Right Section: Dark Mode Toggle and GitHub Icon -->
      <div class="flex items-center space-x-4">
        <a
          href="https://github.com/RifqiTaw"
          target="_blank"
          class="hover:text-[#00C6FF]"
        >
          <Icon name="mdi:github" size="30" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";

const route = useRoute();
const navbar = ref(null);

const isActive = (routePath) => {
  return route.path === routePath;
};

const animateNavbar = () => {
  gsap.fromTo(
    navbar.value,
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 }
  );
};

onMounted(() => {
  animateNavbar();
});
</script>

<style scoped>
a {
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-menu a {
  margin-right: 1rem;
}
</style>
