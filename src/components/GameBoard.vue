<template>

    <div class="game-board">
        <game-grid :level="level"/>
    </div>

</template>

<script>

import game from '../game'
import GameGrid from './game-grid.vue'

export default {
  components: {
    'game-grid': GameGrid
  },
  data () {
    return {
      level: new game.Level(),
      placer: 0
    }
  }
}

</script>
