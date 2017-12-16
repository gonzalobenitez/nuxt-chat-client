<template>
  <v-container fluid>
    <div class="typer">
      <input type="text" placeholder="Type a message..." :keyup.enter="send" v-model="content">
    </div>
  </v-container>
</template>

<script>
export default {
  props: [
    'send'
  ],
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style>
.typer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 4.9rem;
  width: 100%;
  background-color: #fff;
}

.typer input[type=text] {
  background-color: transparent;
  position: absolute;
  bottom: 0;
  left: 2.5rem;
  padding: 1rem;
  width: 80%;
  border: none;
  outline: none;
  font-size: 1.25rem;
}
</style>
