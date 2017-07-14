<template>

    <span
        class="cell"
        @click="clicked">

        <span class="underlay" :style="{ height: (cell.health / cell.maxHealth) * 100 + '%' }"></span>

        <span class="label"></span>

    </span>

</template>

<script>
import bus from '../shared/bus'

export default {
  props: ['x', 'y', 'index', 'cell'],
  methods: {
    clicked () {
      bus.$emit('cell-clicked', this.index)
    }
  }
}

</script>

<style scoped>
    .cell {
        position: relative;
    }
    .underlay {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 255, 0, 0.4);
    }
    .label {
        position: relative;
    }
</style>
