import { omit } from 'lodash'
import { safeCreateObjectURL, revokeObjectURL } from '../plugins/window.js'

export const state = () => ({
  streams: Object.freeze({})
})

export const getters = {
  getStreams(state) {
    return state.streams
  }
}

export const mutations = {
  addStream(state, { userId, stream }) {
    state.streams = Object.freeze({
      ...state.streams,
      [userId]: {
        mediaStream: stream,
        url: safeCreateObjectURL(stream)
      }
    })
  },
  removeStream(state, userId) {
    const stream = state.streams[userId]
    if (stream && stream.url) {
      revokeObjectURL(stream.url)
    }

    state.streams = Object.freeze(omit(state.streams, [userId]))
  },
  destroyStreams(state) {
    state.streams = Object.freeze({})
  }
}

export const actions = {
  addStream({ commit, dispatch }, { stream, userId }) {
    return commit('addStream', {
      userId,
      stream
    })
  },
  removeStream({ commit, dispatch }, userId) {
    return commit('removeStream', userId)
  },
  destroyStreams({ commit, dispatch }) {
    return commit('destroyStreams', null)
  }
}
