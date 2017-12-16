<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-card>
          <v-card-media :src="backgroundUrl" height="300px">
          </v-card-media>
          <v-card-title primary-title>
            <v-flex xs12 align-end flexbox>    
            <h1 class="text-xs-center">
              NUXT CHAT
            </h1>
            </v-flex>
          </v-card-title>
          <v-card-actions>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Channel ID"
                v-model="channelId"
                required
                :rules="channelIdRules"
              ></v-text-field>
              <v-btn color="cyan" large
                @click="onJoin"
                :disabled="!valid"
              >Join</v-btn>
              <v-btn color="primary" large
                @click="onCreateChannel"
              >Create Channel</v-btn>
            </v-form>
          </v-card-actions>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import backgroundUrl from '~/assets/img/logo.png'
import validate from 'uuid-validate'

export default {
  head() {
    return {
      title: 'Nuxt Chat'
    }
  },
  data() {
    return {
      backgroundUrl,
      valid: true,
      channelId: '',
      channelIdRules: [
        (v) => !!v || 'Channel ID is required',
        (v) => (v && validate(this.channelId, 4)) || 'Invalid Channel ID'
      ]
    }
  },
  methods: {
    onJoin() {
      if (this.$refs.form.validate()) {
        this.$router.push({
          path: `channel/${this.channelId}`
        })
      }
    },
    onCreateChannel() {
      this.$router.push({
        name: 'channel'
      })
    }
  }
}
</script>
