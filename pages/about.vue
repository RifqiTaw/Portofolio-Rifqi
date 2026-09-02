<script setup lang="ts">
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

useSeoMeta({
  title: "About — Rifqi Taufiqurrohman",
  description:
    "Fullstack developer based in Bali, Indonesia. Frontend with Vue, Nuxt, React, and Angular; backend with Node.js, Express.js, PHP, and Laravel; MySQL and PostgreSQL databases.",
  ogTitle: "About — Rifqi Taufiqurrohman",
  ogDescription: "Fullstack developer with a frontend focus, based in Bali.",
  ogImage: "/images/foto-fullbody.jpg",
});

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const defaultSkillIcon = "lucide:code-2";

const resolveSkillIcon = (icon?: string) => {
  if (!icon) {
    return defaultSkillIcon;
  }

  return icon;
};

interface Skill {
  name: string;
  description: string;
  icon?: string;
}

interface SkillGroup {
  title: string;
  subtitle: string;
  icon: string;
  accentClass: string;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    subtitle: "My strongest side — where most of my hours go.",
    icon: "lucide:layout-dashboard",
    accentClass: "bg-sky-50 text-sky-600",
    skills: [
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
        name: "React",
        description: "Develop dynamic and interactive web experiences.",
        icon: "logos:react",
      },
      {
        name: "Next.js",
        description: "Build scalable and high-performance web apps.",
        icon: "logos:nextjs-icon",
      },
      {
        name: "Angular",
        description: "Create reactive user interfaces efficiently.",
        icon: "logos:angular-icon",
      },
      {
        name: "TypeScript",
        description: "Catch mistakes before they reach production.",
        icon: "logos:typescript-icon",
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
      {
        name: "Pinia",
        description: "State management for Vue and Nuxt applications.",
        icon: "logos:pinia",
      },
      {
        name: "Redux",
        description: "Predictable state container for React apps.",
        icon: "logos:redux",
      },
      {
        name: "Zustand",
        description: "Lightweight state management for React.",
        icon: "devicon:zustand",
      },
    ],
  },
  {
    title: "Backend",
    subtitle: "Server-side logic, authentication, and REST APIs.",
    icon: "lucide:server",
    accentClass: "bg-emerald-50 text-emerald-600",
    skills: [
      {
        name: "Node.js",
        description: "Run JavaScript on the server for fast APIs.",
        icon: "logos:nodejs-icon",
      },
      {
        name: "Express.js",
        description: "Build lightweight REST APIs and middleware.",
        icon: "simple-icons:express",
      },
      {
        name: "PHP",
        description: "Write server-side logic for classic web stacks.",
        icon: "logos:php",
      },
      {
        name: "Laravel",
        description: "Full-featured PHP framework for robust backends.",
        icon: "logos:laravel",
      },
      {
        name: "CodeIgniter",
        description: "Lightweight PHP framework for quick delivery.",
        icon: "simple-icons:codeigniter",
      },
      {
        name: "Inertia.js",
        description: "Connect a Laravel backend to a Vue frontend.",
        icon: "simple-icons:inertia",
      },
      {
        name: "REST API",
        description: "Design clear, well-documented API contracts.",
        icon: "lucide:webhook",
      },
      {
        name: "Authentication",
        description: "Session, token, and role-based access control.",
        icon: "lucide:shield-check",
      },
    ],
  },
  {
    title: "Database",
    subtitle: "Schema design, relations, and query optimization.",
    icon: "lucide:database",
    accentClass: "bg-indigo-50 text-indigo-600",
    skills: [
      {
        name: "MySQL",
        description: "Relational database for transactional applications.",
        icon: "logos:mysql-icon",
      },
      {
        name: "PostgreSQL",
        description: "Advanced relational database with strong data integrity.",
        icon: "logos:postgresql",
      },
      {
        name: "Schema Design",
        description: "Model relations and migrations that stay maintainable.",
        icon: "lucide:table-2",
      },
    ],
  },
  {
    title: "Integration & DevOps",
    subtitle: "Connecting to third-party services and shipping to production.",
    icon: "lucide:plug",
    accentClass: "bg-amber-50 text-amber-600",
    skills: [
      {
        name: "Midtrans",
        description: "Payment gateway integration with webhook handling.",
        icon: "lucide:credit-card",
      },
      {
        name: "Xendit",
        description: "Payment and disbursement integration for Indonesia.",
        icon: "lucide:wallet",
      },
      {
        name: "Git",
        description: "Version control with a clean branching workflow.",
        icon: "logos:git-icon",
      },
      {
        name: "GitHub",
        description: "Collaboration, code review, and release management.",
        icon: "logos:github-icon",
      },
      {
        name: "Vercel",
        description: "Deploy and host modern web applications.",
        icon: "logos:vercel-icon",
      },
      {
        name: "Postman",
        description: "Test and document API endpoints.",
        icon: "logos:postman-icon",
      },
    ],
  },
];

const root = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
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

    gsap.from(".skill-group", {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    });

    gsap.from(".skill-card", {
      opacity: 0,
      y: 30,
      duration: 0.4,
      stagger: 0.03,
      delay: 0.2,
      ease: "power2.out",
    });
  }, root.value ?? undefined);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <div ref="root">
    <div class="relative">
      <div
        class="mx-auto max-w-7xl pt-10 py-6 flex flex-col md:flex-row items-center justify-between gap-10 p-4"
      >
        <!-- Left Column: Text Content -->
        <div class="fade-slide text-center md:text-left md:w-1/2">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            About Me.
          </h1>
          <span
            class="text-xl font-semibold tracking-tight text-gray-400 sm:text-2xl"
          >
            Hi, I'm Rifqi Taufiqurrohman, a Fullstack Developer based in Bali,
            Indonesia — with the frontend as my strongest side.
          </span>
          <p class="mt-6 text-lg leading-8 text-white">
            Since 2022, I've been dedicated to crafting interactive,
            user-friendly interfaces that solve complex challenges with clean
            and efficient code.
          </p>
          <p class="mt-6 text-lg leading-8 text-white">
            Most of my work lives in the browser — building responsive
            applications with Vue.js, Nuxt, React, and Tailwind CSS. But I don't
            stop at the API boundary: I also build the backend behind them with
            Node.js, Express.js, and Laravel, design the MySQL or PostgreSQL
            schema underneath, and wire everything to the services a real
            product needs, including payment gateways like Midtrans and Xendit.
          </p>
          <p class="mt-6 text-lg leading-8 text-white">
            Let's build something amazing together!
          </p>
          <!-- Preview CV Button -->
          <div class="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <button
              @click="openModal"
              class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
            >
              Preview CV
            </button>
            <NuxtLink
              to="/services"
              class="inline-flex items-center gap-2 rounded-lg border border-[#00E5FF]/60 px-4 py-2 font-semibold text-[#00E5FF] transition-colors duration-200 hover:bg-[#00E5FF]/10"
            >
              <Icon name="lucide:briefcase" class="h-5 w-5" />
              See My Services
            </NuxtLink>
          </div>
        </div>
        <!-- Right Column: Image -->
        <div class="right-slide text-center md:text-left md:w-1/2">
          <NuxtImg
            src="/images/2.jpeg"
            alt="Rifqi Taufiqurrohman"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
    <!-- Modal for CV Preview -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-30 flex items-center justify-center bg-black/50"
      @click.self="closeModal"
    >
      <div
        class="bg-gray-900 rounded-lg shadow-lg p-6 max-w-4xl w-full overflow-y-auto max-h-[90vh]"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-white">Preview CV</h2>
          <button
            @click="closeModal"
            class="text-white hover:text-gray-300"
            aria-label="Close modal"
          >
            <Icon name="lucide:x" class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <iframe
          src="/file/cv.pdf"
          class="w-full h-[600px] border-none rounded-lg"
          frameborder="0"
        ></iframe>
        <div class="flex justify-end mt-4">
          <NuxtLink
            to="/file/cv.pdf"
            download
            class="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 flex items-center gap-2"
          >
            <Icon name="lucide:download" class="h-5 w-5" aria-hidden="true" />
            Unduh CV
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Section 2: Tech Stack & Skills -->
    <div class="py-16">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white">
            Tech Stack & Skills
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-gray-300">
            Grouped by layer — from the interface people click on, down to the
            database and the services it talks to.
          </p>
        </div>

        <div
          v-for="group in skillGroups"
          :key="group.title"
          class="skill-group mt-14"
        >
          <!-- Group header -->
          <div class="mb-6 flex items-center gap-4">
            <span
              :class="
                cn(
                  'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg',
                  group.accentClass,
                )
              "
            >
              <Icon :name="group.icon" class="h-6 w-6" />
            </span>
            <div>
              <h3 class="text-2xl font-bold text-white">
                {{ group.title }}
                <span class="ml-1 text-base font-normal text-gray-400"
                  >({{ group.skills.length }})</span
                >
              </h3>
              <p class="text-sm text-gray-400">{{ group.subtitle }}</p>
            </div>
          </div>

          <!-- Skill cards -->
          <div
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <div
              v-for="skill in group.skills"
              :key="skill.name"
              class="skill-card flex flex-col items-center rounded-lg bg-white p-5 text-center shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <Icon
                :name="resolveSkillIcon(skill.icon)"
                class="mb-3 h-14 w-14 text-blue-500"
              />
              <h4 class="text-lg font-semibold text-gray-900">
                {{ skill.name }}
              </h4>
              <p class="mt-1 text-sm text-gray-600">{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-white {
  background-color: #ffffff;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
