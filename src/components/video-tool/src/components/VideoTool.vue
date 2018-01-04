<template>
  <v-container fluid :class="{ active: isActive }">
    <video
      autoplay
      playsinline
      :muted="isActive"
      ref="video"
    />
  </v-container>
</template>

<script>
export default {
  props: [
    'stream',
    'isActive'
  ],
  mounted() {
    const { video } = this.$refs
    const mediaStream = this.stream.mediaStream
    const url = this.stream.url
    if ('srcObject' in video) {
      if (video.srcObject !== mediaStream) {
        this.$refs.video.srcObject = mediaStream
      }
    } else {
      if (video.src !== url) {
        video.src = url
      }
    }

    try {
      video.play()
    } catch (e) {
      console.log(`error playing video: ${e.name}`)
    }
  }
}
</script>

<style scoped>
.container {
  padding: 0;
  margin: 0;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  width: 100px;
  height: 100px;
  z-index: 2;
}

.container video {
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.container.active {
  background-color: transparent;
  border-radius: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  -moz-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  transition: opacity 1s;
}

.container.active video {
  border-radius: 0;
  cursor: inherit;
}
</style>
