import NuxtMessageList from './src/components/MessageList'
import NuxtMessageForm from './src/components/MessageForm'
import NuxtMessageTool from './src/components/MessageTool'

/* istanbul ignore next */
NuxtMessageList.install = function (Vue) {
  Vue.component(NuxtMessageList.name, NuxtMessageList)
}
NuxtMessageForm.install = function (Vue) {
  Vue.component(NuxtMessageForm.name, NuxtMessageForm)
}
NuxtMessageTool.install = function (Vue) {
  Vue.component(NuxtMessageTool.name, NuxtMessageTool)
}

export {
  NuxtMessageList,
  NuxtMessageForm,
  NuxtMessageTool
}
