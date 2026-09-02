<script setup lang="ts">
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

useSeoMeta({
  title: "Services — Rifqi Taufiqurrohman",
  description:
    "Fullstack web development services: frontend with Vue/Nuxt/React, backend with Node.js & Laravel, database design, payment gateway integration (Midtrans & Xendit), and deployment.",
  ogTitle: "Services — Rifqi Taufiqurrohman",
  ogDescription:
    "What I can build for you: frontend, backend, REST API, payment gateway integration, and deployment.",
  ogImage: "/images/foto-fullbody.jpg",
});

interface Service {
  title: string;
  tagline: string;
  description: string;
  icon: string;
  iconClass: string;
  deliverables: string[];
  stack: string[];
  highlight?: boolean;
}

const services: Service[] = [
  {
    title: "Frontend Development",
    tagline: "My main craft",
    description:
      "Turning designs into responsive, accessible, and fast interfaces. From landing pages to complex dashboards with heavy state management.",
    icon: "lucide:layout-dashboard",
    iconClass: "bg-sky-50 text-sky-600",
    deliverables: [
      "Responsive & pixel-perfect UI (mobile → desktop)",
      "SPA, SSR, or static site rendering",
      "Reusable component library & design system",
      "State management for complex data flows",
    ],
    stack: ["Vue.js", "Nuxt", "React JS", "Next.js", "Angular", "Tailwind CSS"],
    highlight: true,
  },
  {
    title: "Backend & REST API",
    tagline: "Server side that keeps up",
    description:
      "Building the engine behind the interface: authentication, role & permission, business logic, and clean REST APIs that are easy for any client to consume.",
    icon: "lucide:server",
    iconClass: "bg-emerald-50 text-emerald-600",
    deliverables: [
      "REST API with clear, documented contracts",
      "Authentication, roles & access control",
      "File upload, export, and scheduled jobs",
      "Server-side validation & error handling",
    ],
    stack: ["Node.js", "Express.js", "PHP", "Laravel", "CodeIgniter"],
  },
  {
    title: "Database Design",
    tagline: "Structured from day one",
    description:
      "Designing schemas that stay maintainable as the product grows — proper relations, indexing, and migrations instead of patched-up tables.",
    icon: "lucide:database",
    iconClass: "bg-indigo-50 text-indigo-600",
    deliverables: [
      "Relational schema & ERD design",
      "Migration and seeder setup",
      "Query optimization & indexing",
      "Data migration from a legacy system",
    ],
    stack: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Payment & Third-Party Integration",
    tagline: "Connect it to the real world",
    description:
      "Wiring your app to the services it needs — payment gateways, email, and external APIs — including the webhook and callback handling most people forget about.",
    icon: "lucide:credit-card",
    iconClass: "bg-amber-50 text-amber-600",
    deliverables: [
      "Midtrans & Xendit payment integration",
      "Webhook / callback handling & status sync",
      "Third-party REST API consumption",
      "Transactional email & notification setup",
    ],
    stack: ["Midtrans", "Xendit", "Webhook", "REST API"],
    highlight: true,
  },
  {
    title: "Fullstack Web Application",
    tagline: "End to end, one person",
    description:
      "The whole thing handled by a single developer: database, API, and interface. Fewer handoffs, fewer misunderstandings, one consistent codebase.",
    icon: "lucide:layers",
    iconClass: "bg-violet-50 text-violet-600",
    deliverables: [
      "Company profile, dashboard, or internal tools",
      "Admin panel with reporting & data export",
      "Multi-role application flows",
      "From requirement gathering to production",
    ],
    stack: ["Nuxt", "Laravel", "Inertia.js", "Express.js", "PostgreSQL"],
  },
  {
    title: "Design to Code",
    tagline: "Figma in, working web out",
    description:
      "Handing me a design file is enough. I translate it into clean, componentized markup that matches the mockup and behaves well on every screen size.",
    icon: "lucide:figma",
    iconClass: "bg-rose-50 text-rose-600",
    deliverables: [
      "Figma / XD / PSD → responsive web",
      "Component breakdown & naming convention",
      "Micro-interaction and page animation",
      "Cross-browser checking",
    ],
    stack: ["Tailwind CSS", "Bootstrap", "PrimeVue", "shadcn", "GSAP"],
  },
  {
    title: "Performance & SEO",
    tagline: "Fast pages, found pages",
    description:
      "Auditing and fixing what makes a site slow or invisible — bundle size, image delivery, rendering strategy, and the meta tags search engines actually read.",
    icon: "lucide:gauge",
    iconClass: "bg-teal-50 text-teal-600",
    deliverables: [
      "Core Web Vitals & Lighthouse improvement",
      "Image optimization and lazy loading",
      "SSR / SSG rendering strategy",
      "Meta tags, Open Graph & sitemap setup",
    ],
    stack: ["Nuxt SSR", "Lighthouse", "Sitemap", "Open Graph"],
  },
  {
    title: "Maintenance & Deployment",
    tagline: "After launch matters too",
    description:
      "Keeping an existing project alive: fixing bugs, adding features, refactoring legacy code, and getting it shipped to production reliably.",
    icon: "lucide:wrench",
    iconClass: "bg-orange-50 text-orange-600",
    deliverables: [
      "Bug fixing & feature addition on existing code",
      "Legacy refactor to a modern stack",
      "Deployment to Vercel or a VPS",
      "Git workflow & release management",
    ],
    stack: ["Git", "GitHub", "Vercel", "VPS"],
  },
];

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We talk about the goal, the users, and the constraints. I ask a lot of questions here so nothing surprises us later.",
    icon: "lucide:message-circle",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "Scope, tech stack, data structure, and timeline get written down. You know what you get before a single line is written.",
    icon: "lucide:clipboard-list",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Built in small increments with regular progress you can actually click on, not just a status update.",
    icon: "lucide:code-2",
  },
  {
    number: "04",
    title: "Testing & Revision",
    description:
      "Cross-device checking, edge cases, and your feedback rounds — fixed before it ever reaches your users.",
    icon: "lucide:bug",
  },
  {
    number: "05",
    title: "Launch & Support",
    description:
      "Deployed to production with handover documentation, plus a support window for anything that comes up.",
    icon: "lucide:rocket",
  },
];

const root = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".services-hero > *", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
    });

    gsap.from(".service-card", {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.08,
      delay: 0.2,
      ease: "power2.out",
    });

    gsap.from(".process-step", {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.4,
      ease: "power2.out",
    });
  }, root.value ?? undefined);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <div ref="root" class="py-16">
    <div class="mx-auto max-w-7xl px-6">
      <!-- Hero -->
      <div class="services-hero text-center mb-14">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-4 py-1.5 text-sm font-medium text-[#00E5FF]"
        >
          <Icon name="lucide:sparkles" class="h-4 w-4" />
          Available for freelance & contract work
        </span>
        <h1
          class="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          What I Can Build For You
        </h1>
        <p class="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
          I work as a fullstack developer with the frontend as my strongest
          side. That means you get interfaces that are genuinely well built —
          and a backend, database, and integration layer that you don't have to
          hire a second person for.
        </p>
      </div>

      <!-- Services grid -->
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="service in services"
          :key="service.title"
          :class="
            cn(
              'service-card flex h-full flex-col rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl',
              service.highlight && 'ring-2 ring-[#00E5FF]',
            )
          "
        >
          <div class="flex items-start gap-4">
            <span
              :class="
                cn(
                  'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg',
                  service.iconClass,
                )
              "
            >
              <Icon :name="service.icon" class="h-6 w-6" />
            </span>
            <div>
              <h2 class="text-lg font-semibold text-gray-900">
                {{ service.title }}
              </h2>
              <p class="text-sm font-medium text-blue-600">
                {{ service.tagline }}
              </p>
            </div>
          </div>

          <p class="mt-4 text-sm leading-6 text-gray-600">
            {{ service.description }}
          </p>

          <ul class="mt-4 space-y-2">
            <li
              v-for="item in service.deliverables"
              :key="item"
              class="flex items-start gap-2 text-sm text-gray-700"
            >
              <Icon
                name="lucide:check"
                class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500"
              />
              <span>{{ item }}</span>
            </li>
          </ul>

          <div class="mt-auto flex flex-wrap gap-2 border-t pt-4">
            <span
              v-for="tech in service.stack"
              :key="tech"
              class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <!-- How I work -->
      <div class="mt-20">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white">
            How I Work
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-gray-300">
            A predictable process, so you always know which stage your project
            is in.
          </p>
        </div>

        <div
          class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          <div
            v-for="step in steps"
            :key="step.number"
            class="process-step rounded-lg border border-white/10 bg-gray-900/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#00E5FF]/50"
          >
            <div class="flex items-center justify-between">
              <Icon :name="step.icon" class="h-7 w-7 text-[#00E5FF]" />
              <span class="text-2xl font-bold text-white/20">{{
                step.number
              }}</span>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-white">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-gray-400">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div
        class="mt-20 rounded-lg border border-white/10 bg-gray-900/70 p-10 text-center backdrop-blur-sm"
      >
        <h2 class="text-3xl font-bold tracking-tight text-white">
          Have a project in mind?
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-gray-300">
          Tell me what you're trying to build. I'll come back with an honest
          take on the scope, the stack, and the timeline — no obligation.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 rounded-lg bg-[#00E5FF] px-6 py-3 font-semibold text-gray-900 shadow-md transition-colors duration-200 hover:bg-[#00C6FF]"
          >
            <Icon name="lucide:mail" class="h-5 w-5" />
            Start a Conversation
          </NuxtLink>
          <NuxtLink
            to="/project"
            class="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:border-[#00E5FF] hover:text-[#00E5FF]"
          >
            <Icon name="lucide:folder-open" class="h-5 w-5" />
            See My Work
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
