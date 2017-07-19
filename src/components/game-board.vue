<template>

  <div class="board-wrap">
    <div class="game-board">
      <slice-roster />
      <game-grid :level="$store.state.level"/>
      <control-zone :sliceTypes="$store.state.sliceTypes" :slices="$store.state.placedSlices" />
    </div>

    <h3>turn {{ $store.state.turn }}</h3>
    <h3>score: {{ $store.state.score }}</h3>
  </div>

</template>

<script>

import GameGrid from './game-grid.vue'
import ControlZone from './control-zone.vue'
import SliceRoster from './slice-roster.vue'

export default {
  components: {
    'game-grid': GameGrid,
    'control-zone': ControlZone,
    'slice-roster': SliceRoster
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
