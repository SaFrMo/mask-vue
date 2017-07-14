<template>

    <div class="game-board">
        <control-zone :sliceTypes="$store.state.sliceTypes" :slices="$store.state.placedSlices" />
        <game-grid :level="$store.state.level"/>
    </div>

</template>

<script>

import GameGrid from './game-grid.vue'
import ControlZone from './control-zone.vue'

export default {
  components: {
    'game-grid': GameGrid,
    'control-zone': ControlZone
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
