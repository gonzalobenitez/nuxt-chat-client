<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-list three-line subheader>
          <v-list-tile avatar v-for="(data, messageId) in messages" :key="messageId">
            <v-list-tile-content>
              <v-list-tile-title>{{ data.userId }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ data.message }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: [
    'messages'
  ]
}
</script>
