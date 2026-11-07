<script setup lang="ts">
import { gsap } from "gsap";

useSeoMeta({
  title: "Rifqi Taufiqurrohman - Fullstack Developer",
  description:
    "Fullstack Developer based in Bali, Indonesia. Frontend-focused, building web applications with Vue, Nuxt, React, Node.js, and Laravel.",
  ogTitle: "Rifqi Taufiqurrohman - Fullstack Developer",
  ogDescription: "Fullstack Developer, currently working at AW Advantage.",
  ogImage: "/images/foto-fullbody.jpg",
});

interface FeaturedProject {
  label: string;
  title: string;
  summary: string;
  image: string;
  tags: string[];
  to: string;
}

const featured: FeaturedProject = {
  label: "Featured project",
  title: "CourtControl",
  summary: "Badminton tournaments with auto draws & live scoring.",
  image: "/images/tournament-public.png",
  tags: ["Next.js", "Express.js", "PostgreSQL"],
  to: "/project",
};

// A photo that failed to load (network blip, image optimizer cold start / 503)
// is retried up to 3 times with backoff (1s, 2s, 4s). The URL that failed is
// re-requested with a cache-busting param, from `src` only (srcset dropped so
// the browser can't pick the same broken candidate again).
const MAX_IMAGE_RETRIES = 3;
const retryImage = (e: Event) => {
  const img = e.target as HTMLImageElement;
  const attempt = Number(img.dataset.retries ?? 0);
  if (attempt >= MAX_IMAGE_RETRIES) return;
  img.dataset.retries = String(attempt + 1);
  const url = new URL(img.currentSrc || img.src, location.href);
  url.searchParams.set("retry", String(attempt + 1));
  setTimeout(() => {
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
    img.src = url.toString();
  }, 1000 * 2 ** attempt);
};

const root = ref<HTMLElement | null>(null);
const introDone = useIntroDone();
let mm: gsap.MatchMedia | null = null;

onMounted(() => {
  // Hard load that hydrated after the CSS intro already ended: the visitor is
  // looking at the hero right now — animating it would hide and re-show it.
  if (!introDone.value && isIntroOverlayFinished()) return;

  mm = gsap.matchMedia();

  mm.add(
    "(prefers-reduced-motion: no-preference)",
    () => {
      // Built paused: the `from` states apply immediately (hidden while the
      // intro overlay is still up), then the timeline plays once the overlay
      // is gone — or right away on client-side navigation.
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .from(".hero-frame", { opacity: 0, y: 32, scale: 0.98, duration: 0.9 })
        .from(
          ".hero-media",
          { opacity: 0, scale: 1.08, duration: 1.1, stagger: 0.12 },
          "-=0.6",
        )
        .from(
          ".hero-reveal",
          { opacity: 0, y: 20, duration: 0.7, stagger: 0.08 },
          "-=0.9",
        );

      if (introDone.value) {
        tl.play();
        return;
      }

      // Returned so gsap.matchMedia cleans the watcher up on revert.
      return watch(introDone, () => tl.play(), { once: true });
    },
    root.value ?? undefined,
  );
});

onUnmounted(() => mm?.revert());
</script>

<template>
  <section
    ref="root"
    class="dark container flex flex-col px-4 pb-6 pt-2 sm:px-8 lg:flex-1 lg:pb-4"
  >
    <div
      class="hero-frame flex flex-col rounded-[calc(var(--hero-r)+var(--hero-g))] bg-card p-[--hero-g] text-card-foreground shadow-[0_30px_80px_-24px_rgba(0,229,255,0.18),0_24px_60px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/10 lg:relative lg:min-h-[400px] lg:flex-1"
    >
      <!--
        < lg : simple stacked / 2-column grid.
        ≥ lg : interlocking bento, positioned in the <style> block below.
      -->
      <div class="hero-canvas grid grid-cols-1 gap-3 sm:grid-cols-2 lg:block">
        <!-- Title -->
        <div
          class="hero-title relative isolate flex flex-col justify-between gap-5 overflow-hidden p-3 sm:col-span-2 sm:p-5 lg:p-6"
        >
          <span
            class="pointer-events-none absolute -left-20 -top-20 -z-10 h-64 w-64 rounded-full bg-brand/15 blur-3xl"
            aria-hidden="true"
          />
          <div>
            <Badge
              variant="outline"
              class="hero-reveal gap-2 rounded-full px-3 py-1 font-medium text-muted-foreground"
            >
              <span class="relative flex h-2 w-2">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none"
                />
                <span class="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for freelance
            </Badge>

            <h1 class="hero-reveal mt-3 font-bold tracking-tight">
              <span
                class="hero-name block bg-gradient-to-r from-white via-white to-brand bg-clip-text text-4xl text-transparent sm:text-5xl"
              >
                Rifqi Taufiqurrohman
              </span>
              <span
                class="hero-role mt-2 flex items-center gap-3 text-2xl font-light text-muted-foreground sm:text-3xl"
              >
                <span
                  class="h-1 w-10 rounded-full bg-brand"
                  aria-hidden="true"
                />
                Fullstack Developer
              </span>
            </h1>
          </div>

          <div class="hero-reveal flex items-center gap-4">
            <NuxtImg
              src="/images/foto-fullbody.jpg"
              alt=""
              width="96"
              height="120"
              densities="x1 x2"
              format="webp"
              quality="80"
              class="hero-thumb hidden h-28 w-24 flex-shrink-0 rounded-2xl object-cover object-top sm:block lg:h-24 lg:w-20"
            />
            <div>
              <p class="hero-bio mb-3 text-sm leading-6 text-muted-foreground">
                Frontend-focused developer based in Bali. Building web apps
                with Vue, Nuxt, React, Node.js, and Laravel.
              </p>
              <div class="flex flex-wrap items-center gap-2">
                <Button
                  as-child
                  size="sm"
                  class="rounded-full bg-brand text-black hover:bg-brand-hover"
                >
                  <NuxtLink to="/services">
                    <Icon name="lucide:briefcase" class="mr-1.5 h-4 w-4" />
                    Services
                  </NuxtLink>
                </Button>
                <Button
                  as-child
                  size="sm"
                  variant="outline"
                  class="rounded-full border-white/15 bg-white/5 hover:bg-white/10"
                >
                  <NuxtLink to="/project">
                    <Icon name="lucide:folder-open" class="mr-1.5 h-4 w-4" />
                    Projects
                  </NuxtLink>
                </Button>
                <Button
                  as-child
                  size="icon"
                  class="h-9 w-9 rounded-full"
                  aria-label="Contact me"
                >
                  <NuxtLink to="/contact">
                    <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
                  </NuxtLink>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Top photo: right column, reaches down past the title -->
        <figure
          class="hero-top relative aspect-[4/3] overflow-hidden rounded-[--hero-r] sm:aspect-[4/5] lg:aspect-auto"
        >
          <NuxtImg
            src="/images/3.jpeg"
            alt="Rifqi looking at a waterfall in Bali"
            width="853"
            height="1280"
            sizes="sm:100vw md:50vw"
            format="webp"
            quality="80"
            preload
            fetchpriority="high"
            @error="retryImage"
            class="hero-media absolute inset-0 h-full w-full object-cover object-[center_40%] lg:object-[center_58%]"
          />
          <figcaption
            class="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
          >
            <Icon name="lucide:map-pin" class="h-3.5 w-3.5" />
            Bali, Indonesia
          </figcaption>
        </figure>

        <!-- Bottom photo: wide strip, reaches right under the top photo -->
        <figure
          class="hero-bottom relative aspect-[4/3] overflow-hidden rounded-[--hero-r] sm:aspect-[4/5] lg:aspect-auto"
        >
          <NuxtImg
            src="/images/1.jpeg"
            alt="Rifqi standing in a tropical forest"
            width="1280"
            height="853"
            sizes="sm:100vw md:50vw lg:50vw xl:70vw"
            format="webp"
            quality="80"
            @error="retryImage"
            class="hero-media absolute inset-0 h-full w-full object-cover object-[center_48%] lg:object-[center_58%]"
          />
          <figcaption
            class="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
          >
            <Icon name="lucide:briefcase" class="h-3.5 w-3.5" />
            Currently at AW Advantage
          </figcaption>
        </figure>

        <!-- Product tile: bottom-right corner -->
        <NuxtLink
          :to="featured.to"
          class="hero-product hero-reveal group flex items-center gap-4 overflow-hidden rounded-[--hero-r] bg-white/[0.06] p-3 text-foreground ring-1 ring-inset ring-white/10 backdrop-blur transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:col-span-2 lg:p-4"
        >
          <NuxtImg
            :src="featured.image"
            :alt="`${featured.title} public tournament portal`"
            width="128"
            height="80"
            densities="x1 x2"
            format="webp"
            quality="80"
            loading="lazy"
            @error="retryImage"
            class="hero-product-thumb h-16 w-24 flex-shrink-0 rounded-xl object-cover object-top sm:h-20 sm:w-32"
          />
          <div class="min-w-0 flex-1">
            <p
              class="text-[0.65rem] font-semibold uppercase tracking-widest text-brand"
            >
              {{ featured.label }}
            </p>
            <p class="mt-0.5 truncate text-base font-semibold">
              {{ featured.title }}
            </p>
            <p class="line-clamp-1 text-xs text-muted-foreground">
              {{ featured.summary }}
            </p>
            <div class="hero-tags mt-2 flex flex-wrap gap-1">
              <Badge
                v-for="tag in featured.tags"
                :key="tag"
                variant="outline"
                class="border-white/15 px-2 font-medium text-foreground/80"
              >
                {{ tag }}
              </Badge>
            </div>
          </div>
          <span
            class="hidden h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand text-black transition-transform duration-200 group-hover:rotate-45 sm:flex"
            aria-hidden="true"
          >
            <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --hero-r: 1.75rem; /* panel corner radius */
  --hero-g: 0.75rem; /* gutter between panels (= frame padding) */
  /* Deep navy frame. Must stay opaque: the S-shaped gutter is carved with it. */
  --card: 222 40% 7%;
}

/*
 * Desktop bento, modelled on the reference:
 *
 *   ┌───────────────┬────────────────────┐
 *   │ title         │ top photo          │
 *   │               │                    │
 *   ├──────────────╮╰─╮                  │  ← S-shaped gutter
 *   │ bottom photo   │                   │
 *   │                ├───────────────────┤
 *   │                │ product tile      │
 *   └────────────────┴───────────────────┘
 *
 *   --sx  title / top-photo split (x)     --sy  title / bottom-photo split (y)
 *   --bx  bottom photo's right edge (x)   --ty  top photo's bottom edge (y)
 *
 * The bottom photo sits above the top photo with a frame-coloured ring
 * (box-shadow) that carves the curved gutter. The two pseudo-elements round
 * the top photo's otherwise sharp corners where it meets that ring.
 */
@media (min-width: 1024px) {
  .hero-canvas {
    --sx: 50%;
    --sy: 56%;
    --bx: 64%;
    --ty: 72%;
    /*
     * Absolutely inset inside the (flex-sized) frame rather than being a flex
     * item itself: a size container that gets its height from flexing reports
     * 0 for cqh / @container height queries in Chrome.
     */
    position: absolute;
    inset: var(--hero-g);
    container-type: size;
  }

  .hero-title,
  .hero-top,
  .hero-bottom,
  .hero-product {
    position: absolute;
  }

  .hero-title {
    top: 0;
    left: 0;
    width: calc(var(--sx) - var(--hero-g));
    height: calc(var(--sy) - var(--hero-g));
  }

  .hero-top {
    top: 0;
    right: 0;
    left: var(--sx);
    height: var(--ty);
  }

  .hero-bottom {
    z-index: 1;
    top: var(--sy);
    bottom: 0;
    left: 0;
    width: var(--bx);
    box-shadow: 0 0 0 var(--hero-g) hsl(var(--card));
  }

  .hero-product {
    top: calc(var(--ty) + var(--hero-g));
    right: 0;
    bottom: 0;
    left: calc(var(--bx) + var(--hero-g));
  }

  .hero-canvas::before,
  .hero-canvas::after {
    content: "";
    position: absolute;
    z-index: 2;
    width: var(--hero-r);
    height: var(--hero-r);
    background: radial-gradient(
      circle at 100% 0,
      transparent calc(var(--hero-r) - 0.5px),
      hsl(var(--card)) var(--hero-r)
    );
    pointer-events: none;
  }

  .hero-canvas::before {
    top: calc(var(--sy) - var(--hero-g) - var(--hero-r));
    left: var(--sx);
  }

  .hero-canvas::after {
    top: calc(var(--ty) - var(--hero-r));
    left: calc(var(--bx) + var(--hero-g));
  }

  /* Scale the name with the bento itself so it never wraps or overflows. */
  .hero-name {
    font-size: clamp(2rem, min(4.2cqw, 8cqh), 3.25rem);
    line-height: 1.05;
  }

  .hero-role {
    font-size: clamp(1.25rem, min(2.2cqw, 4.5cqh), 1.875rem);
  }

  @container (max-height: 420px) {
    .hero-title {
      padding: 1rem;
    }

    .hero-product {
      padding: 0.75rem;
    }

    .hero-product-thumb {
      height: 4rem;
      width: 6.5rem;
    }
  }
}
</style>
