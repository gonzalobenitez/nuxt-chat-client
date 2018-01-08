import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
// create socket
const socket = io(process.env.WS_URL, { path: '/ws' })
const feathersClient = feathers()
// Set up Socket.io client with the socket
feathersClient.configure(socketio(socket))
// return feathersClient
export {
  socket,
  feathersClient
}
