import { uniqueId } from 'lodash'

export const state = () => ({
  messages: Object.freeze({})
})

export const getters = {
  getMessages(state) {
    return state.messages
  }
}

export const mutations = {
  addMessage(state, { message }) {
    const id = uniqueId('notification')
    state.messages = Object.freeze({
      ...state.messages,
      [id]: message
    })
  }
}

export const actions = {
  addMessage({ commit, dispatch }, message) {
    return commit('addMessage', {
      message
    })
  }
}
