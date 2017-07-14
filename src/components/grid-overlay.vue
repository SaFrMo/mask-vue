<template>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">

        <circle
            class="placer"
            :cx="placerCoordinates.x"
            :cy="placerCoordinates.y"
            :r="cellSide * placerRadius"/>

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
    },
    placerRadius () {
      return this.$store.state.sliceTypes[this.$store.state.selectedSliceIndex].radius
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
    }
    .placer {
        fill: transparent;
        stroke: #000;
        stroke-dasharray: 3, 1;
        transition: 0.4s;
        transform-origin: center;

        animation: placer-pulse 1s infinite;
    }
    @keyframes placer-pulse {
        50% {
            transform: scale(0.9);
        }
    }
</style>
