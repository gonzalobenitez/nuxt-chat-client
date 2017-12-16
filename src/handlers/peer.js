import * as constants from '../constants'

class PeerHandler {
  constructor({ socket, user, dispatch, peers, peer }) {
    this.socket = socket
    this.user = user
    this.dispatch = dispatch
    this.peers = peers
    this.peer = peer

    this.peer.once(constants.PEER_EVENT_ERROR, this.handleError.bind(this))
    this.peer.once(constants.PEER_EVENT_CONNECT, this.handleConnect.bind(this))
    this.peer.once(constants.PEER_EVENT_CLOSE, this.handleClose.bind(this))
    this.peer.on(constants.PEER_EVENT_SIGNAL, this.handleSignal.bind(this))
    this.peer.on(constants.PEER_EVENT_STREAM, this.handleStream.bind(this))
    this.peer.on(constants.PEER_EVENT_DATA, this.handleData.bind(this))
  }
  handleError(err) {
    const { dispatch, peers, user } = this
    console.log(`peer: ${user.id}, error ${err.stack}`)
    console.warn('A peer connection error occurred')
    const peer = peers[user.id]
    peer && peer.destroy()
    dispatch('removePeer', user.id)
  }
  handleSignal(signal) {
    const { socket, user } = this
    console.log(`peer: user.id, signal: ${JSON.stringify(signal)}`)
    socket.emit('signal', { userId: user.id, signal })
  }
  handleConnect() {
    const { user } = this
    console.log(`peer: ${user.id}, connect`)
    console.log('Peer connection established')
  }
  handleStream(stream) {
    const { user, dispatch } = this
    console.log(`peer: ${user.id}, stream`)
    dispatch('streams/addStream', {
      userId: user.id,
      stream
    }, { root: true })
  }
  handleData(object) {
    const { dispatch, user } = this
    const data = JSON.parse(new window.TextDecoder('utf-8').decode(object))
    const userId = user.id
    const message = data.message
    console.log(`peer: ${userId}, message: ${message}`)
    dispatch('messages/addMessage', { message, userId }, { root: true })
  }
  handleClose() {
    const { dispatch, user } = this
    console.log(`peer: ${user.id}, close`)
    console.warn('Peer connection closed')
    dispatch('streams/removeStream', user.id, { root: true })
    dispatch('removePeer', user.id)
  }
}

export default PeerHandler
