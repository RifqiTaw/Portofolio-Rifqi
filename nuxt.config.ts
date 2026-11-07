import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      title: "Rifqi Taufiqurrohman - Fullstack Developer",
      meta: [
        {
          name: "description",
          content:
            "Portfolio of Rifqi Taufiqurrohman, a Fullstack Developer with a frontend focus — Vue, Nuxt, React, Node.js, Laravel, MySQL, and PostgreSQL.",
        },
        {
          property: "og:title",
          content: "Rifqi Taufiqurrohman - Fullstack Developer",
        },
        {
          property: "og:description",
          content: "Explore my projects, services, and skills.",
        },
        { property: "og:url", content: "https://rifqitaw.vercel.app/" },
        { property: "og:image", content: "/images/foto-fullbody.jpg" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/images/rifqi.jpg" }],
    },
  },
  runtimeConfig: {
    public: {
      // Override via NUXT_PUBLIC_EMAILJS_* di .env / Vercel env vars
      emailjsServiceId: "service_ogvilhp",
      emailjsTemplateId: "template_3btjkre",
      emailjsPublicKey: "ssBQZeElx9wEa00NL",
    },
  },
  dir: {
    static: "static",
  },
  css: ["primeicons/primeicons.css"],
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@primevue/nuxt-module",
    "@nuxtjs/sitemap",
  ],
  sitemap: {
    hostname: "https://rifqitaw.vercel.app/",
    routes: [
      "/",
      "/about",
      "/project",
      "/services",
      "/contact",
      "/experience",
    ],
  },
  googleFonts: {
    families: {
      Montserrat: [400, 700],
      Roboto: [100, 400, 500, 700],
      Poppins: [400, 600, 700],      
    },
    display: "swap",
  },
  primevue: {
    // Only register what we use. With autoImport on, PrimeVue's resolver claims
    // every matching tag name (ignoring `include`), which shadows shadcn-vue's
    // <Button>/<Badge>/<Card> at runtime. autoImport: false makes the module
    // register just the components listed in `include`.
    autoImport: false,
    components: {
      include: ["Timeline"],
    },
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: "system",
          cssLayer: false,
        },
      },
    },
  },
  shadcn: {
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
