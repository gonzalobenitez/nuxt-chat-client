import Promise from './bluebird.js'

export const navigator = window.navigator
export const MediaStream = window.MediaStream
export const createObjectURL = object => window.URL.createObjectURL(object)
export const revokeObjectURL = url => window.URL.revokeObjectURL(url)

export function safeCreateObjectURL(stream) {
  try {
    return createObjectURL(stream)
  } catch (err) {
    console.log(`Error using createObjectURL: ${err.message}`)
    return null
  }
}

export function getUserMedia(constraints) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(constraints)
  }

  return new Promise((resolve, reject) => {
    const getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
    if (!getMedia) reject(new Error('Browser unsupported'))
    getMedia.call(navigator, constraints, resolve, reject)
  })
}
