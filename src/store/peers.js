import PeerHandler from '../handlers/peer'
import Peer from 'simple-peer'
import { forEach, omit } from 'lodash'

export const state = () => ({
  peers: Object.freeze({})
})

export const getters = {
  getPeers(state) {
    return state.peers
  }
}

export const mutations = {
  addPeer(state, { userId, peer }) {
    state.peers = Object.freeze({
      ...state.peers,
      [userId]: peer
    })
  },
  removePeer(state, { userId }) {
    state.peers = Object.freeze(omit(state.peers, [userId]))
  },
  destroyPeers(state) {
    state.peers = Object.freeze({})
  }
}

export const actions = {
  createPeer: ({ commit, dispatch, rootState }, { socket, user, initiator, stream }) => {
    const userId = user.id
    const peers = rootState.peers.peers
    const iceServers = rootState.channels.channel.iceServers
    console.log(`create peer: ${userId}, stream: ${JSON.stringify(stream)}`)
    console.log('Connecting to peer...')

    const oldPeer = peers[userId]
    if (oldPeer) {
      console.log('Cleaning up old connection...')
      oldPeer.destroy()
      dispatch('removePeer', userId)
    }

    const peer = new Peer({
      initiator: socket.id === initiator,
      config: { iceServers },
      offerConstraints: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      },
      stream
    })

    const handler = new PeerHandler({
      socket,
      user,
      dispatch,
      peers,
      peer
    })

    dispatch('addPeer', { peer, userId })

    return handler
  },
  addPeer: ({ commit, dispatch }, { peer, userId }) => {
    commit('addPeer', { peer, userId })
  },
  removePeer: ({ commit, dispatch }, userId) => {
    commit('removePeer', { userId })
  },
  destroyPeers: ({ commit, dispatch }) => {
    commit('destroyPeers', null)
  },
  sendMessage: ({ commit, dispatch, rootState }, messageJson) => {
    const message = JSON.stringify({ messageJson })
    const peers = rootState.peers.peers
    forEach(peers, peer => peer.send(message))
  }
}
