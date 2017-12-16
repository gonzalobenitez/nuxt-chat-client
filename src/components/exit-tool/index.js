import NuxtExitTool from './src/components/ExitTool'

/* istanbul ignore next */
NuxtExitTool.install = function (Vue) {
  Vue.component(NuxtExitTool.name, NuxtExitTool)
}

export {
  NuxtExitTool
}
