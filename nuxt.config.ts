// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  app: {
    head: {
      title: "Rifqi Taufiqurrohman - Frontend Developer",
      meta: [
        {
          name: "description",
          content:
            "Portfolio of Rifqi Taufiqurrohman, showcasing skills and projects as a Frontend Developer at Telkom Foundation.",
        },
        { property: "og:image", content: "/images/foto-fullbody.jpg" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/rifqi.jpg" }],
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
  ],
  googleFonts: {
    families: {
      Montserrat: [400, 700],
      Roboto: [100, 400, 500, 700],
      families: {
        Poppins: [400, 600, 700],
      },
    },
    display: "swap",
  },
  primevue: {
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
