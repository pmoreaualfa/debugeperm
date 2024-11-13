// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  tailwindcss :{
    cssPath: ['~/assets/css/tailwind.css', {injectPosition: "first"}],
    configPath: 'tailwind.config',
    exposeConfig: {level:2},
    config:{},
    viewer: true
  },
  shadcn: {
    prefix:'',
    componentDir: './components/ui'
  }
})