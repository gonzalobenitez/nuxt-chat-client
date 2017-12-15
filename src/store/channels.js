import * as constants from '../constants'
import { getUserMedia } from '../plugins/window.js'

export const state = () => ({
  channel: Object.freeze({})
})

export const getters = {
  getChannel(state) {
    return state.channel
  }
}

export const mutations = {
  setChannel(state, data) {
    state.channel = Object.freeze(data)
  }
}

export const actions = {
  setChannel({ commit, dispatch }, data) {
    commit('setChannel', data)
    dispatch('getCameraStream', { channelId: data.id })
  },
  getCameraStream: ({ commit, dispatch }, { channelId }) => {
    return getUserMedia({ video: true, audio: true }).then(stream => {
      dispatch('streams/addStream', { stream, userId: constants.ME }, { root: true })
      dispatch('sockets/handshake', {
        channelId,
        stream
      }, { root: true })
    }).catch(() => {
      console.error('Could not get access to microphone & camera')
      return null
    })
  }
}
