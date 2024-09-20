<template>
  <nav
    ref="navbar"
    class="bg-gradient-to-r from-[#005b43] to-[#2b2c71] text-white shadow fixed w-full h-[92px] z-20 flex items-center"
  >
    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full"
    >
      <!-- Left Section: Logo -->
      <div class="flex items-center flex-shrink-0">
        <a :class="`text-2xl font-bold logo`" href="/">
          <span> Rifqi Taw </span>
        </a>
      </div>

      <!-- Desktop menu items -->
      <div class="hidden md:flex flex-1 items-center justify-center space-x-4">
        <router-link
          @click="animateNavbar"
          to="/"
          :class="`px-3 py-2 rounded-md text-sm font-medium ${
            isActive('/')
              ? 'bg-gray-900 text-white border-b-4 border-yellow-500 shadow-md'
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`"
        >
          Home
        </router-link>
        <router-link
          @click="animateNavbar"
          to="/about"
          :class="`px-3 py-2 rounded-md text-sm font-medium ${
            isActive('/about')
              ? 'bg-gray-900 text-white border-b-4 border-yellow-500 shadow-md'
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`"
        >
          About
        </router-link>
        <router-link
          @click="animateNavbar"
          to="/project"
          :class="`px-3 py-2 rounded-md text-sm font-medium ${
            isActive('/project')
              ? 'bg-gray-900 text-white border-b-4 border-yellow-500 shadow-md'
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`"
        >
          Projects
        </router-link>
        <router-link
          @click="animateNavbar"
          to="/contact"
          :class="`px-3 py-2 rounded-md text-sm font-medium ${
            isActive('/contact')
              ? 'bg-gray-900 text-white border-b-4 border-yellow-500 shadow-md'
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`"
        >
          Contact
        </router-link>
      </div>

      <!-- Right Section: Dark Mode Toggle and GitHub Icon -->
      <div class="flex items-center space-x-4">
        <a href="https://github.com/RifqiTaw">
          <Icon name="mdi:github" style="color: white" size="30" />
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
