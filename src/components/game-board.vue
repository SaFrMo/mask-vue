<template>

  <div class="board-wrap">

    <tooltip/>

    <player-info/>

    <div class="game-board">
      <slice-roster />
      <game-grid :level="$store.state.level"/>
      <control-zone :sliceTypes="$store.state.sliceTypes" :slices="$store.state.placedSlices" />
    </div>

    <div class="meta">
      <div class="left">
        <h3>turn {{ $store.state.turn }}</h3>
        <h3 class="score">score: {{ $store.state.score }} / {{ $store.state.level.goal }}</h3>
      </div>

      <button v-if="!gameOver" class="finish-turn" @click="finishTurnClicked">
        {{ queueExists ? 'Purchase Queue & ' : '' }}
        Finish Turn
      </button>
    </div>

    <message-modal/>

    <dev-mode/>

    <div v-if="gameOver" class="game-over">
      Game over!<br/>
      <button @click="$store.commit('Finish Level', { delta: 0 }); gameOver = false">Restart Level</button>
    </div>

  </div>

</template>

<script>

import _ from 'lodash'
import GameGrid from './game-grid.vue'
import ControlZone from './control-zone.vue'
import SliceRoster from './slice-roster.vue'
import Tooltip from './tooltip.vue'
import PlayerInfo from './player-info'
import MessageModal from './message-modal'
import DevMode from './dev-mode'

export default {
  data () {
    return {
      gameOver: false
    }
  },
  computed: {
    queueExists () {
      // checks if the queue has a length and if it contains any non-false values
      return _.keys(this.$store.state.sliceQueue).length &&
        _.find(_.values(this.$store.state.sliceQueue), function (v) { return v })
    }
  },
  mounted () {
    window.onkeyup = evt => {
      if (evt.keyCode === 32) {
        this.$store.commit('Finish Turn')
      }
    }

    this.$store.commit('Change Tutorial Step', { delta: 0 })
  },
  components: {
    'game-grid': GameGrid,
    'control-zone': ControlZone,
    'slice-roster': SliceRoster,
    'tooltip': Tooltip,
    'player-info': PlayerInfo,
    'message-modal': MessageModal,
    'dev-mode': DevMode
  },
  methods: {
    finishTurnClicked () {
      this.$store.commit('Finish Turn')

      if (this.$store.state.player.money <= 0) {
        this.gameOver = true
      }
    }
  }
}

</script>

<style scoped>

    .game-board {
        display: flex;
        align-items: center;
    }
    .game-over {
      z-index: 500;
      position: fixed;
      top: 50vh;
      left: 50vw;
      background-color: #c00;
      padding: 20px;
      border-radius: 8px;
      transform: translate(-50%, -50%);
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
