<template>
  <div id="app">
      <game-board/>
  </div>
</template>

<script>
import GameBoard from './components/game-board.vue'

export default {
  name: 'app',
  components: {
    'game-board': GameBoard
  },
  methods: {
    error (msg) {
      console.log(msg)
    }
  }
}
</script>

<style>

body {
  margin: 0;
  background-color: #333;
  text-align: center;
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  font-family: 'Helvetica', 'Arial', sans-serif;
}
#app {
  display: flex;
  align-items: center;
}

</style>
