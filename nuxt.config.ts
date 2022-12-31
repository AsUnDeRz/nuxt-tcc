// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'The Concert Application',
      meta: [
        { name: 'description', content: 'My amazing site.' }
      ],
    }
  },
  runtimeConfig: {
    public: {
      baseURL: 'https://alpha-api.theconcert.com',
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css:[
    '@/assets/css/main.css'
  ],
})
