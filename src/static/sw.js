importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-chat-client",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.3729ec623b9401510a97.js",
    "revision": "b401d755fe4b567bc2da4c7f094d19be"
  },
  {
    "url": "/_nuxt/common.3c3f39e575a7e50f1689c63c756cc512.css",
    "revision": "57447100eb3ebdeeb67cd222ce3fdddc"
  },
  {
    "url": "/_nuxt/common.8c67c5403f1f48ba77bc.js",
    "revision": "318540793bef264694b65fb7341e1bef"
  },
  {
    "url": "/_nuxt/layouts/default.b67663cc9e64694bd67b.js",
    "revision": "48a879eb4f7af1352b08a93f44fdecc3"
  },
  {
    "url": "/_nuxt/manifest.2194cdae02af19847ce1.js",
    "revision": "d88bd8c2b28030916312685fede52e80"
  },
  {
    "url": "/_nuxt/pages/channel/_id.869c953a3c6977fbad12.js",
    "revision": "45f9f010d514da3a61d44e36e500e873"
  },
  {
    "url": "/_nuxt/pages/channel/index.239a0e1391fd90bf15f3.js",
    "revision": "4676475419ac345934060b213cd7519e"
  },
  {
    "url": "/_nuxt/pages/index.99e8ca206410318d1dfb.js",
    "revision": "76e2ba4e8bc325600fc6d66354db6fda"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

