<template>
  <v-container fluid>
    <v-fab-transition>
      <v-btn
        color="cyan accent-2"
        medium
        fixed
        bottom
        right
        fab
        slot="activator"
        @click.native.stop="setDialogOpen(true)"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog 
      :value="dialogOpen" 
      @input="setDialogOpen" 
      fullscreen
      transition="dialog-bottom-transition"
      :overlay=false
      scrollable
    >
      <v-card class="pa-3">
        <v-toolbar color="cyan accent-2">
          <v-btn icon @click.native="setDialogOpen(false)">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Messages</v-toolbar-title>
        </v-toolbar>
        <v-card-text ref="scroll">
          <nuxt-message-list
            :messages="messages"
          />
        </v-card-text>
        <v-card-actions>
          <nuxt-message-form
            :send="send"
            :isOpen="dialogOpen"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import NuxtMessageList from './MessageList'
import NuxtMessageForm from './MessageForm'

export default {
  components: {
    NuxtMessageList,
    NuxtMessageForm
  },
  props: [
    'dialogOpen',
    'setDialogOpen',
    'messages',
    'send'
  ],
  watch: {
    messages: function () {
      let scroll = this.$refs.scroll
      scroll.scrollTop = scroll.scrollHeight
    }
  }
}
</script>
