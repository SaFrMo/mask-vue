<template>
    <div class="game-grid">
        <div class="row" v-for="y in level.map.length">
            <single-cell
                v-for="x in level.map.length"
                :x="x"
                :y="y"
                :key="x"/>
        </div>
    </div>
</template>

<script>

import Cell from './cell.vue'

export default {
  components: {
    'single-cell': Cell
  },
  props: [ 'level' ]
}

</script>
<style>

    .grid-wrap {
      position: relative;
    }
    .cell {
      background-color: #999;
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

</style>
