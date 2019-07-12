// import axios from 'axios'
// eslint-disable-next-line nuxt/no-cjs-in-config
const axios = require('axios')

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lobster&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    ['storyblok-nuxt', { accessToken: process.env.NODE_ENV === 'production' ? '0K5XKyFaVjtwal995serSQtt' : 'vqf8CDiyAQcINv7JIhRDQgtt', cacheProvider: 'memory' }]
  ],

  generate: {
    routes: function () {
      return axios.get(
        'https//api.storyblok.com/v1/cdn/stories?version=published&token=0K5XKyFaVjtwal995serSQtt&starts_with=blog&cv=' +
        Math.floor(Date.now() / 1e3)
      )
        .then((res) => {
          const blogPosts = res.data.stories.map(bp => bp.full_slug)
          return [
            '/',
            '/blog',
            '/about',
            ...blogPosts
          ]
        })
    }
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  }
}
