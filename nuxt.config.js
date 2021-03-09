export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '冥王星',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          '//cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['iview/dist/styles/iview.css', 'normalize.css/normalize.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '@/plugins/iview',
      ssr: true,
    },
    {
      src: '@/plugins/style',
      ssr: true,
    },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    [
      'nuxt-vuex-localstorage',
      {
        mode: 'debug',
        sessionStorage: ['user'],
      },
    ],
    [
      '@nuxtjs/dotenv',
      {
        filename:
          process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      },
    ],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: '',
    cache: true,
    loaders: {
      less: {
        javascriptEnabled: true,
      },
    },

    styleResources: {
      less: ['./assets/style/variable.less', './assets/style/global.less'],
    },
  },
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      pathRewrite: {
        '^/api': '/',
      },
    },
  },
  // server: {
  //   port: 8000, // default: 3000
  //   host: '0.0.0.0', // default: localhost,
  //   timing: {
  //     total: true,
  //   },
  // },
}
