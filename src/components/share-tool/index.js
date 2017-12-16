import NuxtShareTool from './src/components/ShareTool'

/* istanbul ignore next */
NuxtShareTool.install = function (Vue) {
  Vue.component(NuxtShareTool.name, NuxtShareTool)
}

export {
  NuxtShareTool
}
