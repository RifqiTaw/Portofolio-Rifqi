<template>
  <div>
    <div class="relative">
      <div
        class="mx-auto max-w-7xl pt-40 py-6 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        <!-- Left Column: Text Content -->
        <div class="fade-slide text-center md:text-left md:w-1/2">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            about.
          </h1>
          <span
            class="text-xl font-semibold tracking-tight text-gray-400 sm:text-2xl"
          >
            I'm a Frontend Developer based in Bandung, Indonesia.
          </span>
          <p class="mt-6 text-lg leading-8 text-white">
            Since 2022, I've enjoyed turning complex problems into simple,
            beautiful and intuitive designs. When I'm not pushing pixels, you'll
            find me cooking, gardening, or working out in the park.
          </p>
          <!-- Preview CV Button -->
          <button
            @click="openModal"
            class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Preview CV
          </button>
        </div>
        <!-- Right Column: Image -->
        <div class="right-slide text-center md:text-left md:w-1/2">
          <img
            src="/images/2.jpeg"
            alt="Placeholder Image"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
    <!-- Modal for CV Preview -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-gray-900 rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-white">Preview CV</h2>
          <button @click="closeModal" class="text-white hover:text-gray-300">
            ✕
          </button>
        </div>
        <iframe
          src="/file/cv.pdf"
          class="w-full h-[600px] border-none rounded-lg"
          frameborder="0"
        ></iframe>
        <div class="flex justify-end mt-4">
          <a
            href="/file/cv.pdf"
            download
            class="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m10.5 6.75L12 21l-6.75-6.75M12 21V9"
              />
            </svg>
            Unduh CV
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- Section 2: My Skills -->
  <div class="py-16 skill-card">
    <div class="mx-auto max-w-7xl px-6">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 text-center">
        Tech Stack & Skills
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <!-- Skill Cards -->
        <div
          class="skill-card bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
          v-for="(skill, index) in skills"
          :key="index"
        >
          <Icon :name="skill.icon" class="h-20 w-20 mb-4 text-blue-500" />
          <h3 class="text-xl font-semibold text-gray-900">{{ skill.name }}</h3>
          <p class="mt-2 text-gray-600">{{ skill.description }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="py-16 pt-10">
    <div class="mx-auto max-w-7xl bg-white py-16 pt-10">
      <h2 class="text-3xl font-bold tracking-tight text-center mb-12">
        Pengalaman Kerja
      </h2>
      <div class="relative">
        <div
          class="border-l-2 border-dashed border-blue-500 absolute left-1/2 transform -translate-x-1/2 h-full"
        ></div>

        <!-- Timeline Item 1 -->
        <div
          ref="timelineItem1"
          class="relative flex items-start mb-8 justify-between fade-in"
        >
          <div class="w-1/2 pr-8 text-right">
            <img
              src="/images/ypt.png"
              alt="Telkom Logo"
              class="h-8 mb-2 ml-auto"
            />
            <h3 class="text-xl font-semibold">
              Yayasan Pendidikan Telkom - Bandung
            </h3>
            <p class="text-gray-400">Frontend Developer (2022 - Now)</p>
            <p class="mt-2 text-gray-500">
              Responsible for frontend development of several internal
              applications.
            </p>
          </div>
          <div
            class="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-500 rounded-full timeline-dot"
          ></div>
        </div>

        <!-- Timeline Item 2 -->
        <div
          ref="timelineItem2"
          class="relative flex items-start mb-8 justify-between flex-row-reverse fade-in"
        >
          <div
            class="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-green-500 rounded-full timeline-dot"
          ></div>
          <div class="w-1/2 pl-8">
            <img
              src="/images/pertamina.png"
              alt="Pertamina Logo"
              class="h-8 mb-2"
            />
            <h3 class="text-xl font-semibold">
              PT. Pertamina EP Asset 4 Field Poleng - Surabaya
            </h3>
            <p class="text-gray-400">
              Unit ICT (Information Communication & Technology) (2019)
            </p>
            <p class="mt-2 text-gray-500">
              Develop web applications for internal company and public projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { gsap } from "gsap";

const timelineItem1 = ref(null);
const timelineItem2 = ref(null);

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  gsap.from(".timeline-item-left", {
    opacity: 0,
    x: -100,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
  });

  gsap.from(".timeline-item-right", {
    opacity: 0,
    x: 100,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
  });

  gsap.from(".timeline-dot", {
    scale: 0,
    duration: 1,
    ease: "bounce.out",
    stagger: 0.2,
  });
  gsap.from(timelineItem1.value, {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out",
  });
  gsap.from(timelineItem2.value, {
    opacity: 0,
    x: 50,
    duration: 1,
    ease: "power2.out",
    delay: 0.5,
  });
  gsap.from(".fade-slide", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".right-slide", {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".skill-card", {
    opacity: 0,
    y: 50,
    duration: 0.5,
    stagger: 0.2,
    ease: "power2.out",
  });
});

const skills = [
  {
    name: "Nuxt",
    description: "Build scalable and high-performance web apps.",
    icon: "logos:nuxt-icon",
  },
  {
    name: "Vue",
    description: "Create reactive user interfaces efficiently.",
    icon: "logos:vue",
  },
  {
    name: "Pinia - State Management",
    description: "Create reactive user interfaces efficiently.",
    icon: "logos:pinia",
  },
  {
    name: "React",
    description: "Develop dynamic and interactive web experiences.",
    icon: "logos:react",
  },
  {
    name: "JavaScript",
    description: "Develop dynamic and interactive web experiences.",
    icon: "catppuccin:javascript",
  },
  {
    name: "HTML",
    description: "Craft structured and semantic web content.",
    icon: "teenyicons:html5-outline",
  },
  {
    name: "CSS",
    description: "Design beautiful layouts with modern styling.",
    icon: "akar-icons:css-fill",
  },
  {
    name: "Tailwind CSS",
    description: "Design beautiful layouts with modern styling.",
    icon: "logos:tailwindcss-icon",
  },
  {
    name: "Bootstrap",
    description: "Design beautiful layouts with modern styling.",
    icon: "logos:bootstrap",
  },
];
</script>
<style scoped>
.bg-white {
  background-color: #ffffff;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.timeline-dot {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  transition: background 0.3s ease;
}

.timeline-dot:hover {
  background: linear-gradient(135deg, #facc15, #f0b90b);
}
.card {
  width: fit-content;
  height: fit-content;
  background-color: rgb(238, 238, 238);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 25px;
  gap: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.055);
}

/* for all social containers*/
.socialContainer {
  width: 52px;
  height: 52px;
  background-color: rgb(44, 44, 44);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition-duration: 0.3s;
}
/* instagram*/
.containerOne:hover {
  background-color: #d62976;
  transition-duration: 0.3s;
}
/* twitter*/
.containerTwo:hover {
  background-color: #00acee;
  transition-duration: 0.3s;
}
/* linkdin*/
.containerThree:hover {
  background-color: #0072b1;
  transition-duration: 0.3s;
}
/* Whatsapp*/
.containerFour:hover {
  background-color: #128c7e;
  transition-duration: 0.3s;
}

.socialContainer:active {
  transform: scale(0.9);
  transition-duration: 0.3s;
}

.socialSvg {
  width: 17px;
}

.socialSvg path {
  fill: rgb(255, 255, 255);
}

.socialContainer:hover .socialSvg {
  animation: slide-in-top 0.3s both;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
