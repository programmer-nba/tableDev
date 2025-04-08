export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt'],
  googleFonts: {
    families: {
      Sarabun: [400, 500, 600, 700],
      Inter: [400, 500, 600, 700],
      Kanit: [400, 500, 600, 700],
      Prompt: [400, 500, 600, 700],
    },
    display: 'swap',
  },
})
