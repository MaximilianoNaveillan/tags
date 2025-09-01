// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ["../plugins/pinia.js"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["../assets/css/variables.css", "../assets/css/main.css"],
});
