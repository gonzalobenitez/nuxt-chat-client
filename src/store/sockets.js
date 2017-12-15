import SocketHandler from '../handlers/socket'
import { socket } from '../plugins/feathers.js'

export const actions = {
  handshake({ commit, dispatch, rootState }, { channelId, stream }) {
    const peers = rootState.peers
    const handler = new SocketHandler({
      socket,
      stream,
      dispatch,
      peers
    })

    console.log(`socket.id: ${socket.id}`)
    console.log(`emit ready for channel: ${channelId}`)
    console.log('Ready for connections')
    socket.emit('ready', channelId)

    return handler
  }
}
