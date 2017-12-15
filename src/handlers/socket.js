import * as constants from '../constants'
import { keyBy, keys } from 'lodash'

class SocketHandler {
  constructor({ socket, stream, dispatch, peers }) {
    this.socket = socket
    this.stream = stream
    this.dispatch = dispatch
    this.peers = peers

    this.socket.on(constants.SOCKET_EVENT_SIGNAL, this.handleSignal.bind(this))
    this.socket.on(constants.SOCKET_EVENT_USERS, this.handleUsers.bind(this))
  }
  handleSignal({ userId, signal }) {
    const peer = this.peers.peers[userId]
    if (!peer) return console.log(`user: ${userId}, no peer found`)
    peer.signal(signal)
  }
  handleUsers({ initiator, users }) {
    const { socket, stream, dispatch, peers } = this
    console.log(`socket users: ${JSON.stringify(users)}`)
    console.log(`Connected users: ${users.length}`)

    users
      .filter(user => !peers.peers[user.id] && user.id !== socket.id)
      .forEach(user => dispatch('peers/createPeer', {
        socket,
        user,
        initiator,
        stream
      }, { root: true }))

    let newUsersMap = keyBy(users, 'id')
    keys(peers.peers)
      .filter(id => !newUsersMap[id])
      .forEach(id => peers.peers[id].destroy())
  }
}

export default SocketHandler
