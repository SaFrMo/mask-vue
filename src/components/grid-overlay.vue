<template>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">

        <circle
            class="placer"
            :cx="placerCoordinates.x"
            :cy="placerCoordinates.y"
            :r="cellSide * .25"/>

    </svg>

</template>

<script>

export default {
  computed: {
    placerCoordinates () {
      return this.getCoordinatesFromCellIndex(this.$store.state.placer)
    },
    cellSide () {
      return 100 / this.$store.state.level.map.length
    }
  },
  methods: {
    getCoordinatesFromCellIndex (index) {
      const gridLength = this.$store.state.level.map.length
      const cellHalfSide = this.cellSide / 2

      const x = cellHalfSide + (index % gridLength) * this.cellSide
      const y = cellHalfSide + (Math.floor(index / gridLength)) * this.cellSide

      return { x, y }
    }
  }

}

</script>

<style scoped>
    svg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        background-color: rgba(255, 255, 255, 0.4);
    }
    .placer {
        transition: 0.4s;
    }
</style>
