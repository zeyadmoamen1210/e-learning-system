export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'e-learning',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/sass/main.scss',
    "~/node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    { src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", mode: "client" },
    { src: "@/plugins/CodeInput.js", mode: "client" },
    { src: "@/plugins/countdown.js", mode: "client" },
    { src: "@/plugins/social-sharing.js" },
    { src: "@/plugins/v-viwer.js" },
    '@/plugins/vue-awesome-swiper.js',
    '@/plugins/mixins.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules:['@nuxtjs/fontawesome', '@nuxtjs/pwa'],

  fontawesome: {
    icons:{
     solid:true,
     brands:true
    }
   },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-social-sharing/nuxt',
  ],



  pwa: {
    meta: {
      theme_color: '#ffffff',
      title: 'Madkor Salama E-Learning',
      author: 'Madkor Salama',
    },
    manifest: {
      name: 'Madkor Salama E-Learning',
      short_name: 'Madkor Salama',
      description: 'Madkor Salama E-Learning',
      lang: 'ar',
      start_url: "/student/",
      display: "standalone",
      background_color: "#E5F3FB",
      theme_color: "#008DD2"
    },
    icon: {
      fileName: 'icon.png', // Path to your app's icon
      sizes: [64, 120, 144, 152, 192, 384, 512]
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://e-learning.mongz-cashier.com/api/',

  },

  router: {
    middleware: ['auth']
  },

  auth: {
    redirect: {
      logout: '/auth/login',
      login: '/',
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: false,
          user: {
            url: '/auth/me',
            method: 'post',
            propertyName: ''
          }
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: false,
          global: true,
        },
        user: {
          property: '',
          autoFetch: false
        },
        refreshToken: {
          property: false,
          maxAge: false
        },
        autoLogout: false
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
