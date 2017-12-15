<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center >
      <div v-if="!streams[me]">
        <v-progress-circular indeterminate v-bind:size="300" v-bind:width="7" color="purple"></v-progress-circular>
        <h1 class="text-xs-center">
          Connecting to channel...
        </h1>
        <p class="text-xs-center">
          {{ channel.id }}
        </p>
      </div>
      <div xs12 v-else>
        <ul class="videos">
          <li>
            <nuxt-video :stream="streams[me]" :isActive="active === me" @click="setActive(me)" />
          </li>
          <li v-for="(peer, userId) in peers" v-if="streams[userId] && peer">
            <nuxt-video :stream="streams[userId]" :isActive="active === userId" @click="setActive(userId)" />
          </li>
        </ul>
        <v-fab-transition>
          <v-btn
            dark
            icon
            small
            fixed
            top
            left
            fab
            @click.native.stop="setExitDialog(true)"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-tooltip right>
          <v-btn
            color="pink"
            dark
            large
            fixed
            bottom
            left
            fab
            slot="activator"
            @click.native.stop="setCopyDialog(true)"
          >
            <v-icon>share</v-icon>
          </v-btn> 
          <span>Copy to Clipboard</span>
        </v-tooltip>
        <v-fab-transition>
          <v-btn
            color="cyan accent-2"
            small
            fixed
            bottom
            right
            fab
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-dialog :value="copyDialogOpen" @input="setCopyDialog" max-width="500px">
          <v-card>
           <v-card-text>
              <v-text-field 
                ref="copy"
                label="Channel ID"
                :value="channel.id"
                readonly
                @focus="$event.target.select()"
                ></v-text-field>
           </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog
          :value="exitDialogOpen"
          @input="setExitDialog"
          max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to leave this channel?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink darken-1" flat="flat" @click.native="setExitDialog(false)">Cancel</v-btn>
              <v-btn color="pink darken-1" flat="flat" @click.native="onLeaveClick">Leave</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog 
          :value="messageDialogOpen"
          @input="setMessageDialog" 
          fullscreen
          transition="dialog-bottom-transition"
          :overlay=false
        >
          
        </v-dialog>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import validate from 'uuid-validate'
import { feathersClient } from '~/plugins/feathers'
import * as constants from '../../constants'
import NuxtVideo from '~/components/Video.vue'

export default {
  name: 'id',
  components: {
    NuxtVideo
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
      peers: 'peers/getPeers',
      streams: 'streams/getStreams',
      channel: 'channels/getChannel'
    })
  },
  methods: {
    ...mapActions({
      setActive: 'setActive',
      setCopyDialog: 'setCopyDialog',
      setExitDialog: 'setExitDialog',
      setMessageDialogOpen: 'setMessageDialogOpen',
      onLeaveClick() {
        this.setExitDialog(false)
        this.$router.push({ path: '/' })
      }
    })
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
