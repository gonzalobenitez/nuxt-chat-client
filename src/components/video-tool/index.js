import NuxtVideoTool from './src/components/VideoTool'

/* istanbul ignore next */
NuxtVideoTool.install = function (Vue) {
  Vue.component(NuxtVideoTool.name, NuxtVideoTool)
}

export {
  NuxtVideoTool
}
