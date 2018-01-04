<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <div v-if="!streams[me]">
        <v-progress-circular
          indeterminate 
          :size="300" 
          :width="7" 
          color="purple"
        ></v-progress-circular>
        <h1 class="text-xs-center">
          Connecting to channel...
        </h1>
        <p class="text-xs-center">
          {{ channel.id }}
        </p>
      </div>
      <div v-else>
        <ul class="videos">
          <li>
            <nuxt-video-tool
              :stream="streams[me]"
              :isActive="active === me"
              @click.native="setActive(me)"
            />
          </li>
          <li v-for="(peer, userId) in peers" v-if="streams[userId] && peer">
            <nuxt-video-tool
              :stream="streams[userId]"
              :isActive="active === userId"
              @click.native="setActive(userId)"
            />
          </li>
        </ul>
        <nuxt-exit-tool
          :dialogOpen="exitDialogOpen"
          :setDialogOpen="setExitDialog"
          :onConfirm="onLeaveClick"
          label="Are you sure you want to leave this channel?"
        />
        <nuxt-share-tool
          :dialogOpen="copyDialogOpen"
          :setDialogOpen="setCopyDialog"
          :value="channel.id"
          label="Channel ID"
        />
        <nuxt-message-tool
          :dialogOpen="messageDialogOpen"
          :setDialogOpen="setMessageDialog"
          :messages="messages"
          :send="sendMessage"
        />
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import validate from 'uuid-validate'
import { feathersClient } from '~/plugins/feathers'
import * as constants from '../../constants'
import { NuxtVideoTool } from '~/components/video-tool'
import { NuxtShareTool } from '~/components/share-tool'
import { NuxtExitTool } from '~/components/exit-tool'
import { NuxtMessageTool } from '~/components/message-tool'

export default {
  name: 'id',
  components: {
    NuxtVideoTool,
    NuxtShareTool,
    NuxtExitTool,
    NuxtMessageTool
  },
  validate({ params }) {
    return validate(params.id, 4)
  },
  data() {
    return {
      me: constants.ME
    }
  },
  async asyncData({ store, params }) {
    const data = await feathersClient.service('channels').get(params.id)
    store.dispatch('channels/setChannel', data)
  },
  computed: {
    ...mapGetters({
      active: 'getActive',
      copyDialogOpen: 'getCopyDialogOpen',
      exitDialogOpen: 'getExitDialogOpen',
      messageDialogOpen: 'getMessageDialogOpen',
      channel: 'channels/getChannel',
      messages: 'messages/getMessages',
      streams: 'streams/getStreams',
      peers: 'peers/getPeers'
    })
  },
  methods: {
    ...mapActions({
      setActive: 'setActive',
      setCopyDialog: 'setCopyDialog',
      setExitDialog: 'setExitDialog',
      setMessageDialog: 'setMessageDialog',
      sendMessage: 'peers/sendMessage'
    }),
    onLeaveClick() {
      this.setExitDialog(false)
      this.$router.push({ path: '/' })
    }
  },
  head() {
    return {
      title: `Channel: ${this.channel.id}`
    }
  }
}
</script>

<style scoped>
ul.videos {
  list-style: none;
  position: fixed;
  height: 100px;
  top: 15px;
  right: 10px;
  text-align: right;
}

ul.videos li {
  display: inline-block;
}
</style>
