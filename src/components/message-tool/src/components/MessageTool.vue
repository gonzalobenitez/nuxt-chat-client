<template>
  <v-container fluid>
    <v-fab-transition>
      <v-btn
        color="cyan accent-2"
        small
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
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="setDialogOpen(false)" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Messages</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <nuxt-message-list
            :messages="messages"
          />
        </v-card-text>
        <v-card-actions>
          <nuxt-message-form
            :send="send"
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
  ]
}
</script>
