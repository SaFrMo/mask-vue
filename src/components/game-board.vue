<template>

  <div class="board-wrap">

    <player-info/>

    <div class="game-board">
      <slice-roster />
      <game-grid :level="$store.state.level"/>
      <control-zone :sliceTypes="$store.state.sliceTypes" :slices="$store.state.placedSlices" />
    </div>

    <div class="meta">
      <div class="left">
        <h3>turn {{ $store.state.turn }}</h3>
        <h3>score: {{ $store.state.score }} / {{ $store.state.level.goal }}</h3>
      </div>

      <button @click="$store.commit('Finish Turn')">Finish Turn</button>
    </div>

    <tooltip/>

  </div>

</template>

<script>

import GameGrid from './game-grid.vue'
import ControlZone from './control-zone.vue'
import SliceRoster from './slice-roster.vue'
import Tooltip from './tooltip.vue'
import PlayerInfo from './player-info'

export default {
  mounted () {
    window.onkeyup = evt => {
      if (evt.keyCode === 32) {
        this.$store.commit('Finish Turn')
      }
    }
  },
  components: {
    'game-grid': GameGrid,
    'control-zone': ControlZone,
    'slice-roster': SliceRoster,
    'tooltip': Tooltip,
    'player-info': PlayerInfo
  }
}

</script>

<style scoped>

    .game-board {
        display: flex;
        align-items: center;
    }
    .meta {
      display: flex;
      padding: 20px;
      color: #000;
      background-color: #fff;
      border-radius: 8px;
      margin: 40px 280px 0 370px;
      justify-content: space-between;
      border: 2px solid #fff;
      text-align: left;
    }
    .meta button {
      margin: 0;
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
