<template>

    <div class="game-board">
        <control-zone :sliceTypes="sliceTypes" :slices="slices" @addButtonClicked="addButtonClicked"/>
        <game-grid :level="level"/>
    </div>

</template>

<script>

import game from '../game'
import GameGrid from './game-grid.vue'
import ControlZone from './control-zone.vue'
import _ from 'lodash'

export default {
  components: {
    'game-grid': GameGrid,
    'control-zone': ControlZone
  },
  data () {
    return {
      level: new game.Level(),
      placer: 0,
      sliceTypes: [
        new game.Slice(),
        new game.Slice({ name: 'Scout', radius: 0.25, cost: 75 })
      ],
      slices: []
    }
  },
  methods: {
    addButtonClicked (sliceName) {
      const model = this.sliceTypes.find(x => { return x.name === sliceName })
      if (!model) return
      const newSlice = _.cloneDeep(model)

      if (newSlice.canPlaceAt(this.placer, this.slices)) {
        this.slices.push({
          slice: newSlice,
          position: this.placer
        })
      } else {
        this.error('Can\'t place slice there!')
      }
    },
    error (msg) {
      console.log(msg)
    }
  }
}

</script>

<style scoped>

    .game-board {
        display: flex;
    }

</style>
