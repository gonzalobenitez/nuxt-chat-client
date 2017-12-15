import * as constants from '../constants'

export const state = () => ({
  active: constants.ME,
  openDialogs: {
    copy: false,
    exit: false,
    message: false
  }
})

export const getters = {
  getActive(state) {
    return state.active
  },
  getCopyDialogOpen(state) {
    return state.openDialogs.copy
  },
  getExitDialogOpen(state) {
    return state.openDialogs.exit
  },
  getMessageDialogOpen(state) {
    return state.openDialogs.message
  }
}

export const mutations = {
  setActive(state, userId) {
    state.active = userId
  },
  setCopyDialog(state, copyDialogOpen) {
    state.openDialogs.copy = copyDialogOpen
  },
  setExitDialog(state, exitDialogOpen) {
    state.openDialogs.exit = exitDialogOpen
  },
  setMessageDialog(state, messageDialogOpen) {
    state.openDialogs.message = messageDialogOpen
  }
}

export const actions = {
  setActive({ commit, dispatch }, userId) {
    return commit('setActive', userId)
  },
  setCopyDialog({ commit, dispatch }, copyDialogOpen) {
    return commit('setCopyDialog', copyDialogOpen)
  },
  setExitDialog({ commit, dispatch }, exitDialogOpen) {
    return commit('setExitDialog', exitDialogOpen)
  },
  setMessageDialog({ commit, dispatch }, messageDialogOpen) {
    return commit('setMessageDialog', messageDialogOpen)
  }
}
