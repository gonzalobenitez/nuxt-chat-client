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
  addMessage(state, { message, userId }) {
    const id = uniqueId('message')
    state.messages = Object.freeze({
      ...state.messages,
      [id]: {
        message,
        userId
      }
    })
  }
}

export const actions = {
  addMessage({ commit, dispatch }, { message, userId }) {
    return commit('addMessage', {
      message,
      userId
    })
  }
}
