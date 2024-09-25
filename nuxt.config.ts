// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  app: {
    head: {
      title: "Rifqi Taufiqurrohman",
      link: [{ rel: "icon", type: "image/x-icon", href: "/rifqi.jpg" }],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
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
  shadcn: {
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
