<template>

    <div class="game-board">
        <h2>I'm the game board!</h2>
        <div>{{level}}</div>
    </div>

</template>

<script>

import game from '../game'

export default {
  data () {
    return {
      level: new game.Level()
    }
  }
}

</script>
