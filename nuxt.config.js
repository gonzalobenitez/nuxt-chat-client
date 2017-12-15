module.exports = {
  /*
  ** Single Page Application mode
  ** Means no SSR
  */
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt Chat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Peer to peer chat built using Nuxt.js' }
    ],
    link: [
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Set client srcDir
  */
  srcDir: 'src/',
  /*
  ** Global CSS
  */
  css: [
    'vuetify/dist/vuetify.css',
    '~/assets/css/main.css'
  ],
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
  ** Load plugins into the app
  */
  plugins: [
    '~/plugins/vuetify'
  ],
  /*
  ** Set env
  */
  env: {
    WS_URL: process.env.WS_URL || 'http://localhost:3050'
  },
  /*
  ** Add axios globally
  */
  build: {
    /*
    ** Add vendor packages
    */
    vendor: ['bluebird', 'feathers/client', 'feathers-socketio/client', 'socket.io-client', 'vuetify'],
    /*
    ** Extract css
    */
    extractCSS: true,
    /*
    ** Add postcss plugins
    */
    postcss: [
      require('postcss-import')({
        plugins: [
          require('stylelint')()
        ]
      }),
      require('postcss-cssnext')()
    ],
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
