<template>

    <div class="game-board">
        <control-zone :sliceTypes="sliceTypes" :slices="slices" @sliceSelected="sliceSelected"/>
        <game-grid :level="level"/>
    </div>

</template>

<script>

import game from '../game'
import GameGrid from './game-grid.vue'
import ControlZone from './control-zone.vue'
import _ from 'lodash'
import bus from '../shared/bus'

export default {
  components: {
    'game-grid': GameGrid,
    'control-zone': ControlZone
  },
  created () {
    bus.player = new game.Player()
    bus.level = new game.Level()

    bus.placer = 0

    bus.sliceTypes = [
      new game.Slice(),
      new game.Slice({ name: 'Scout', radius: 0.25, cost: 75 })
    ]
    bus.selectedSlice = new game.Slice()
    bus.slices = []
    for (let i = 0; i < this.level.map.length ** 2; i++) {
      bus.slices.push(false)
    }

    bus.$on('cell-clicked', index => {
      // if( bus.player.canBuy(  ) )
    })
  },
  computed: {
    bus () {
      return bus
    },
    level () {
      return this.bus.level
    },
    sliceTypes () {
      return this.bus.sliceTypes
    },
    selectedSlice () {
      return this.bus.selectedSlice
    },
    slices () {
      return this.bus.slices
    },
    placer () {
      return this.bus.placer
    }
  },
  methods: {
    sliceSelected (sliceName) {
      const model = this.sliceTypes.find(x => { return x.name === sliceName })
      this.selectedSlice = _.cloneDeep(model)

    //   if (newSlice.canPlaceAt(this.placer, this.slices)) {
    //     this.slices.push({
    //       slice: newSlice,
    //       position: this.placer
    //     })
    //   } else {
    //     this.error('Can\'t place slice there!')
    //   }
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
        align-items: center;
    }

</style>

<style>
    body {
        color: #ffffff;
        font-family: sans-serif;
        font-weight: 700;
    }

    button {
        display: block;
        background-color: #ff6347;
        border: none;
        padding: 15px;
        border-radius: 8px;
        color: #ffffff;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.4s;
        margin: 5px auto;
    }

    button:hover, button:focus {
        background-color: #cc4125;
    }
</style>
