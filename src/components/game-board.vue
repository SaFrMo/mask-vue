<template>

    <div class="game-board">
        <game-grid :level="level" :placements="placements"/>
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
      placer: 0,
      sliceTypes: [
        new game.Slice(),
        new game.Slice('Scout', 0.25)
      ],
      placements: {
        cells: [],
        slices: []
      }
    }
  },
  mounted () {
    // Attach index data-attributes to cells
    const cellElements = document.querySelectorAll('.cell')
    for (let i = 0; i < cellElements.length; i++) {
      this.placements.cells.push(new game.Cell())
      this.placements.slices.push(false)
    }
  }
}

</script>
