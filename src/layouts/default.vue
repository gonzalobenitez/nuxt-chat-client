<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false
    }
  }
}
</script>

<style scoped>
  .title {
    padding-left: 20px;
  }
</style>
