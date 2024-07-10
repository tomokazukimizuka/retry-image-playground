// https://nuxt.com/docs/api/configuration/nuxt-config

const isProduction = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    app: {
      env: isProduction ? 'production' : 'development'
    }
  },
  components: [
    {
      path: '@/components',
      pathPrefix: false
    }
  ],
  app: {
    baseURL: '',
    buildAssetsDir: isProduction ? '/assets/' : undefined
  },
  vite: {
    build: {
      assetsInlineLimit: 4096
    }
  }
});
