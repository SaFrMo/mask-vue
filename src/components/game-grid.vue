<template>
  <div class="grid-wrap"  >

    <div class="game-grid">

      <div class="art" :style="{ 'background-image': `url(./static/${$store.state.level.art})`, 'background-size': 'cover' }"></div>

        <div class="row" v-for="y in level.map.length">
            <single-cell
                v-for="x in level.map.length"
                :x="x"
                :y="y"
                :index="getIndex(x, y)"
                :cell="level.map[y - 1][x - 1]"
                :key="getIndex(x, y)"/>
        </div>

        <grid-overlay/>
    </div>

    <div :class="['goal-zone', { available: goalOpen }]" @click="goalZoneClicked">
      Goal
    </div>

    <div v-if="$store.state.score >= $store.state.level.goal">
      <h3>Level complete!</h3>
      <button @click="$store.commit('Finish Level')">Click to continue...</button>
    </div>
  </div>
</template>

<script>

import Cell from './cell.vue'
import GridOverlay from './grid-overlay'

export default {
  components: {
    'single-cell': Cell,
    'grid-overlay': GridOverlay
  },
  props: [ 'level' ],
  computed: {
    goalOpen () {
      // false if the selected slice can't score
      const selected = this.$store.getters.selectedPlacedSlice
      if (!selected || !selected.canScore) return false

      const coords = this.getCoordinates(this.$store.state.selectedPlacedSlice)
      const cell = this.$store.state.level.map[coords.y - 1][coords.x - 1]
      const sliceAtEnd = coords.x >= this.$store.state.level.map.length
      let sliceCanMove = false
      const isBelowWall = cell && cell.health / cell.maxHealth <= selected.movement.hostWall
      if (this.$store.state.movedThisTurn.indexOf(this.$store.state.selectedPlacedSlice) === -1) {
        sliceCanMove = true
      }
      return sliceAtEnd && sliceCanMove && isBelowWall
    }
  },
  methods: {
    getIndex (x, y) {
      const xMinusOne = x - 1
      const yMinusOne = y - 1
      return this.$store.state.level.map.length * yMinusOne + xMinusOne
    },
    getCoordinates (index) {
      const x = index % this.$store.state.level.map.length + 1
      const y = Math.floor(index / this.$store.state.level.map.length) + 1
      return { x, y }
    },
    goalZoneClicked () {
      if (this.goalOpen) {
        // remove selected slice and score points
        this.$store.commit('Move Slice to Goal')
      }
    }
  }
}

</script>
<style scoped>
    .game-grid {
        position: relative;
        margin-right: 100px;
    }
    .art {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .grid-wrap {
      position: relative;
    }
    .row {
      white-space: nowrap;
    }
    .cell {
      width: 100px;
      height: 100px;
      border: 1px solid #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
    }
    .underlay {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 200, 0, 0.4);
    }
    .cell .label {
      position: relative;
    }
    .goal-zone {
      background-color: transparent;
      border: 3px solid goldenrod;
      box-sizing: border-box;
      border-radius: 0 8px 8px 0;
      height: 100%;
      width: 100px;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;

      transition: background-color 0.4s, border 0.4s;
    }
    .goal-zone.available {
      background-color: goldenrod;
      cursor: pointer;
    }
    .goal-zone.available:hover {
      background-color: darkgoldenrod;
      border-color: darkgoldenrod;
    }

</style>
