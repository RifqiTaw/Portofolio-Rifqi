<script setup lang="ts">
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

useSeoMeta({
  title: "Projects — Rifqi Taufiqurrohman",
  description:
    "Client and company projects (Aiku, DIGITS Telkom Schools) plus personal practice projects built with Vue, Nuxt, React, Angular, Laravel, and Express.js.",
  ogTitle: "Projects — Rifqi Taufiqurrohman",
  ogDescription: "Professional work and personal practice projects.",
  ogImage: "/images/foto-fullbody.jpg",
});

type ProjectType = "work" | "personal";

interface Project {
  title: string;
  description: string;
  image: string;
  company: string;
  link: string;
  website: string;
  tags: string[];
  type: ProjectType;
  comingSoon: boolean;
  confidential: boolean;
  inProgress?: boolean;
  startDate: string;
  endDate: string | null;
}

const formatDuration = (start: string, end: string | null): string => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const startLabel = startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const endLabel = end
    ? endDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Present";

  let duration = "";
  if (years > 0) duration += `${years}y `;
  if (remainingMonths > 0) duration += `${remainingMonths}mo`;
  if (!duration) duration = "< 1 mo";

  return `${startLabel} – ${endLabel} · ${duration.trim()}`;
};

const projects = ref<Project[]>([
  // ── Professional work (client / company) ──────────────────────────────
  {
    title: "Aiku - B2B AI Ecosystem Platform",
    description:
      "Aiku is a B2B networking and smart-matching platform designed for the AI ecosystem, connecting startups with investors and partners through specialized filtering tools. Developed by Aloha Dijital Bilisim, the platform facilitates deal acceleration and ecosystem tracking via its web application and mobile apps.",
    image: "https://aw-advantage.com/wp-content/uploads/2025/01/Logo-AW-Advantage-1.webp",
    company: "AW Advantage",
    link: "https://github.com/Inikoo-Ltd/aiku",
    website: "https://app.aiku.io/",
    tags: ["Laravel", "Inertia.js", "Tailwind CSS", "PrimeVue", "Pinia"],
    type: "work",
    comingSoon: false,
    confidential: true,
    startDate: "2013-01-01",
    endDate: null,
  },
  {
    title: "DIGITS Telkom Schools - Registration Module",
    description:
      "The DigiTS application is an application used by YPT to carry out continuous development of the quality of education delivery which is adjusted to the internal and external conditions of the Telkom Education Foundation.",
    image: "/images/login-portal.png",
    company: "Telkom Education Foundation",
    link: "",
    website: "https://digits.telkomschools.sch.id/",
    tags: ["Nuxt", "Vue.js", "Bootstrap"],
    type: "work",
    comingSoon: false,
    confidential: true,
    startDate: "2024-01-01",
    endDate: null,
  },

  // ── Personal / practice projects ──────────────────────────────────────
  {
    title: "Xiaomi Website Indonesia",
    description: "Clone xiaomi website indonesia mi.co.id (only phone).",
    image: "/images/xiaomi.png",
    company: "Practice Project",
    link: "https://github.com/RifqiTaw/fs-xiaomi-phone",
    website: "",
    tags: ["React JS", "Tailwind CSS", "Redux", "Vite"],
    type: "personal",
    comingSoon: false,
    confidential: false,
    startDate: "2023-06-01",
    endDate: "2023-07-01",
  },
  {
    title: "News Portal New York Times",
    description:
      "The New York Times (NYT) is one of the most prominent and influential news portals globally, known for its comprehensive coverage, investigative journalism, and digital innovation.",
    image: "/images/portal.png",
    company: "Practice Project",
    link: "https://github.com/RifqiTaw/portal-news",
    website: "https://portal-news-psi.vercel.app/",
    tags: ["Angular", "Tailwind CSS", "Rxjs"],
    type: "personal",
    comingSoon: false,
    confidential: false,
    startDate: "2023-04-01",
    endDate: "2023-05-01",
  },
  {
    title:
      "Determining Bandung Raya Tourism Routes Using the Cheapest Insertion Heuristic Algorithm",
    description:
      "The application aims to make it easier for tourists to determine tourist routes based on several categories such as costs, rates and the number of selected tourist attractions.",
    image: "/images/travelrs.png",
    company: "S1 Thesis Application",
    link: "https://github.com/RifqiTaw/travelrs",
    website: "",
    tags: ["Codeigniter", "Python", "PHP"],
    type: "personal",
    comingSoon: false,
    confidential: false,
    startDate: "2020-12-01",
    endDate: "2021-01-01",
  },
  // TODO: isi `link` / `website` / `image` begitu repo & demo-nya siap.
  {
    title: "E-Commerce API with Payment Gateway",
    description:
      "A practice backend service covering product catalog, cart, and checkout, with Midtrans and Xendit as payment channels including webhook handling for transaction status updates.",
    image: "",
    company: "Practice Project",
    link: "",
    website: "",
    tags: ["Express.js", "Node.js", "PostgreSQL", "Midtrans", "Xendit"],
    type: "personal",
    comingSoon: false,
    confidential: false,
    inProgress: true,
    startDate: "2025-06-01",
    endDate: null,
  },
  {
    title: "Inventory & POS Dashboard",
    description:
      "A fullstack practice project: multi-role admin dashboard with stock management, transaction records, and sales reporting exportable to Excel and PDF.",
    image: "",
    company: "Practice Project",
    link: "",
    website: "",
    tags: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS"],
    type: "personal",
    comingSoon: false,
    confidential: false,
    inProgress: true,
    startDate: "2025-08-01",
    endDate: null,
  },
  {
    title: "More Projects Coming Soon",
    description: "New personal projects are on the way.",
    image: "/images/3.jpeg",
    link: "",
    website: "",
    tags: [],
    type: "personal",
    comingSoon: true,
    confidential: false,
    company: "",
    startDate: "",
    endDate: null,
  },
]);

const workProjects = computed(() =>
  projects.value.filter((project) => project.type === "work"),
);
const personalProjects = computed(() =>
  projects.value.filter((project) => project.type === "personal"),
);

const imageErrors = ref<Record<string, boolean>>({});

const handleImageError = (key: string) => {
  imageErrors.value[key] = true;
};

const hasImage = (project: Project) =>
  Boolean(project.image) && !imageErrors.value[project.title];

const getTagClass = (tag: string) => {
  const tagClasses = {
    Nuxt: "bg-blue-100 text-blue-800",
    "Vue.js": "bg-gray-100 text-gray-800",
    Bootstrap: "bg-yellow-100 text-yellow-800",
    "React JS": "bg-teal-100 text-teal-800",
    "Tailwind CSS": "bg-indigo-100 text-indigo-800",
    Redux: "bg-red-100 text-red-800",
    Vite: "bg-purple-100 text-purple-800",
    Laravel: "bg-red-100 text-red-800",
    "Inertia.js": "bg-violet-100 text-violet-800",
    PrimeVue: "bg-blue-100 text-blue-800",
    Pinia: "bg-yellow-100 text-yellow-800",
    Angular: "bg-rose-100 text-rose-800",
    Rxjs: "bg-fuchsia-100 text-fuchsia-800",
    Codeigniter: "bg-orange-100 text-orange-800",
    Python: "bg-sky-100 text-sky-800",
    PHP: "bg-indigo-100 text-indigo-800",
    "Node.js": "bg-green-100 text-green-800",
    "Express.js": "bg-neutral-200 text-neutral-800",
    MySQL: "bg-cyan-100 text-cyan-800",
    PostgreSQL: "bg-blue-100 text-blue-800",
    Midtrans: "bg-emerald-100 text-emerald-800",
    Xendit: "bg-violet-100 text-violet-800",
  } as const;

  return (
    tagClasses[tag as keyof typeof tagClasses] || "bg-gray-100 text-gray-800"
  );
};

const root = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".project-card", {
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, root.value ?? undefined);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <div ref="root" class="py-16">
    <div class="mx-auto max-w-7xl px-6">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold tracking-tight text-white">
          All the projects I've ever done
        </h1>
        <p class="mx-auto mt-4 max-w-2xl text-gray-300">
          Split into two groups so it's clear which ones were built for a real
          client or company, and which ones I built on my own to learn and
          experiment.
        </p>
      </div>

      <!-- ── Professional work ──────────────────────────────────────── -->
      <section>
        <div
          class="mb-8 flex flex-col gap-2 border-l-4 border-[#00E5FF] pl-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <div>
            <h2 class="text-2xl font-bold text-white">
              Professional Work
              <span class="ml-2 text-base font-normal text-gray-400"
                >({{ workProjects.length }})</span
              >
            </h2>
            <p class="mt-1 text-sm text-gray-400">
              Production applications built for a company or client, used by
              real users.
            </p>
          </div>
          <span
            class="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#00E5FF]/10 px-3 py-1 text-xs font-semibold text-[#00E5FF] ring-1 ring-[#00E5FF]/40"
          >
            <Icon name="lucide:briefcase" class="h-3.5 w-3.5" />
            Client & Company
          </span>
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="project in workProjects"
            :key="project.title"
            class="project-card flex h-full flex-col rounded-lg bg-white p-6 shadow-lg ring-1 ring-[#00E5FF]/30"
          >
            <div class="relative mb-4">
              <div
                v-if="!hasImage(project)"
                class="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 text-gray-400"
              >
                <Icon name="lucide:image-off" class="h-10 w-10" />
                <span class="text-sm">Image not available</span>
              </div>
              <NuxtImg
                v-else
                :src="project.image"
                :alt="project.title"
                class="h-48 w-full rounded-lg object-cover"
                placeholder="blur"
                @error="handleImageError(project.title)"
              />
              <div
                v-if="project.confidential && hasImage(project)"
                class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50"
              >
                <span class="text-xl font-semibold text-white"
                  >Confidential Content</span
                >
              </div>
              <span
                class="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#00E5FF] px-2.5 py-0.5 text-xs font-semibold text-gray-900 shadow"
              >
                <Icon name="lucide:badge-check" class="h-3.5 w-3.5" />
                Client Project
              </span>
            </div>

            <div class="flex flex-grow flex-col">
              <h3 class="mb-2 text-xl font-semibold">{{ project.title }}</h3>
              <p class="mb-4 flex-grow text-gray-600">
                {{ project.description }}
              </p>
              <p class="mb-1 text-gray-600">Company: {{ project.company }}</p>
              <p v-if="project.startDate" class="mb-4 text-sm text-gray-400">
                {{ formatDuration(project.startDate, project.endDate) }}
              </p>

              <div class="mb-4 mt-auto flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  :class="
                    cn(
                      'rounded-full px-2.5 py-0.5 text-sm font-medium',
                      getTagClass(tag),
                    )
                  "
                >
                  {{ tag }}
                </span>
              </div>

              <div class="flex space-x-4 border-t pt-4">
                <NuxtLink
                  :to="project.link || '#'"
                  target="_blank"
                  :class="
                    cn(
                      'font-semibold text-blue-500 hover:text-blue-700',
                      !project.link &&
                        'pointer-events-none cursor-not-allowed text-gray-400',
                    )
                  "
                  :aria-disabled="!project.link"
                  >GitHub</NuxtLink
                >
                <NuxtLink
                  :to="project.website || '#'"
                  target="_blank"
                  :class="
                    cn(
                      'font-semibold text-blue-500 hover:text-blue-700',
                      !project.website &&
                        'pointer-events-none cursor-not-allowed text-gray-400',
                    )
                  "
                  :aria-disabled="!project.website"
                  >Visit Website</NuxtLink
                >
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ── Personal / practice ────────────────────────────────────── -->
      <section class="mt-20">
        <div
          class="mb-8 flex flex-col gap-2 border-l-4 border-gray-500 pl-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <div>
            <h2 class="text-2xl font-bold text-white">
              Personal & Practice Projects
              <span class="ml-2 text-base font-normal text-gray-400"
                >({{ personalProjects.length }})</span
              >
            </h2>
            <p class="mt-1 text-sm text-gray-400">
              Self-initiated builds, clones, and experiments — made to learn a
              stack, not for a client.
            </p>
          </div>
          <span
            class="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300 ring-1 ring-white/20"
          >
            <Icon name="lucide:flask-conical" class="h-3.5 w-3.5" />
            Self-Initiated
          </span>
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="project in personalProjects"
            :key="project.title"
            class="project-card flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg"
            :class="project.comingSoon ? '' : 'p-6'"
          >
            <template v-if="!project.comingSoon">
              <div class="relative mb-4">
                <div
                  v-if="!hasImage(project)"
                  class="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 text-gray-400"
                >
                  <Icon name="lucide:image-off" class="h-10 w-10" />
                  <span class="text-sm">Image not available</span>
                </div>
                <NuxtImg
                  v-else
                  :src="project.image"
                  :alt="project.title"
                  class="h-48 w-full rounded-lg object-cover"
                  placeholder="blur"
                  @error="handleImageError(project.title)"
                />
                <span
                  class="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-gray-900/80 px-2.5 py-0.5 text-xs font-semibold text-white shadow"
                >
                  <Icon name="lucide:flask-conical" class="h-3.5 w-3.5" />
                  Practice Project
                </span>
                <span
                  v-if="project.inProgress"
                  class="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-semibold text-gray-900 shadow"
                >
                  <Icon name="lucide:hammer" class="h-3.5 w-3.5" />
                  In Progress
                </span>
              </div>

              <div class="flex flex-grow flex-col">
                <h3 class="mb-2 text-xl font-semibold">{{ project.title }}</h3>
                <p class="mb-4 flex-grow text-gray-600">
                  {{ project.description }}
                </p>
                <p class="mb-1 text-gray-600">Company: {{ project.company }}</p>
                <p v-if="project.startDate" class="mb-4 text-sm text-gray-400">
                  {{ formatDuration(project.startDate, project.endDate) }}
                </p>

                <div class="mb-4 mt-auto flex flex-wrap gap-2">
                  <span
                    v-for="tag in project.tags"
                    :key="tag"
                    :class="
                      cn(
                        'rounded-full px-2.5 py-0.5 text-sm font-medium',
                        getTagClass(tag),
                      )
                    "
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="flex space-x-4 border-t pt-4">
                  <NuxtLink
                    :to="project.link || '#'"
                    target="_blank"
                    :class="
                      cn(
                        'font-semibold text-blue-500 hover:text-blue-700',
                        !project.link &&
                          'pointer-events-none cursor-not-allowed text-gray-400',
                      )
                    "
                    :aria-disabled="!project.link"
                    >GitHub</NuxtLink
                  >
                  <NuxtLink
                    :to="project.website || '#'"
                    target="_blank"
                    :class="
                      cn(
                        'font-semibold text-blue-500 hover:text-blue-700',
                        !project.website &&
                          'pointer-events-none cursor-not-allowed text-gray-400',
                      )
                    "
                    :aria-disabled="!project.website"
                    >Visit Website</NuxtLink
                  >
                </div>
              </div>
            </template>

            <template v-else>
              <div
                class="relative flex h-full min-h-[24rem] items-center justify-center bg-gray-200"
              >
                <NuxtImg
                  v-if="hasImage(project)"
                  :src="project.image"
                  :alt="project.title"
                  class="absolute inset-0 h-full w-full object-cover opacity-30"
                  placeholder="blur"
                  @error="handleImageError(project.title)"
                />
                <div class="relative z-10 text-center">
                  <Icon
                    name="lucide:sparkles"
                    class="mx-auto mb-3 h-10 w-10 text-white"
                  />
                  <h3 class="text-3xl font-bold text-white">Coming Soon</h3>
                </div>
              </div>
            </template>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
