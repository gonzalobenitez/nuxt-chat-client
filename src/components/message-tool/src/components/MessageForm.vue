<template>
  <v-container fluid>
    <v-layout row wrap class="typer">
      <v-flex xs8>
        <input 
          ref="input"
          type="text"
          placeholder="Type a message..."
          @keyup.enter="sendMessage"
          v-model="content"
        />
      </v-flex>
      <v-flex xs4 class="text-xs-right">
        <v-btn 
          color="primary"
          flat
          icon
          class="mr-5"
          @click="sendMessage"
        >
          <v-icon>send</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: [
    'send',
    'isOpen'
  ],
  data() {
    return {
      content: ''
    }
  },
  watch: {
    isOpen: function () {
      this.$refs.input.focus()
    }
  },
  methods: {
    sendMessage() {
      if (this.content) {
        this.send(this.content)
        this.content = ''
      }

      this.$refs.input.focus()
    }
  }
}
</script>

<style>
.typer {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 4.9rem;
  width: 100%;
  background-color: #fff;
}

.typer input[type=text] {
  background-color: transparent;
  padding: 1rem;
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.25rem;
}
</style>
