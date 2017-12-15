<template>
   <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-card>
            <v-card-media :src="backgroundUrl" height="300px">
            </v-card-media>
            <v-card-title primary-title>  
              <v-flex xs12 align-end flexbox>    
                <h1 class="text-xs-center">
                  {{ error.statusCode }}
                </h1>
                <h2>
                  {{ error.message }}
                </h2>
              </v-flex>
            </v-card-title>
            <v-card-actions>
              <nuxt-link to="/" v-if="error.statusCode === 404">
                Go Homepage
              </nuxt-link>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import backgroundUrl from '~/assets/img/logo.png'
export default {
  props: ['error'],
  data() {
    return {
      backgroundUrl: backgroundUrl
    }
  }
}
</script>
