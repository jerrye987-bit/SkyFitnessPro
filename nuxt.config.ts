export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/test-utils/module", "@nuxt/eslint", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  ssr: false,
  image: {
    provider: "none",
  },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
        },
      ],
    },
  },
  experimental: {
    asyncContext: true,
    payloadExtraction: false,
  },
});
