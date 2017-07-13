<template>

    <span
        class="cell"
        @click="clicked">

        <span class="underlay" :style="{ height: (cell.health / cell.maxHealth) * 100 + '%' }"></span>

        <span class="label"></span>

    </span>

</template>

<script>

export default {
  props: ['x', 'y', 'index', 'cell'],
  methods: {
    clicked () {
      this.cell.health = Math.random() * this.cell.maxHealth
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
