<template>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">

        <circle
            class="placer"
            :cx="placerCoordinates.x"
            :cy="placerCoordinates.y"
            :r="cellSide * placerRadius"/>

        <circle v-for="(slice, cellIndex) in $store.state.sliceQueue"
          v-if="slice !== false"
          :class="['slice', 'queued', slice.name.toLowerCase()]"
          :cx="getCoordinatesFromCellIndex(cellIndex).x"
          :cy="getCoordinatesFromCellIndex(cellIndex).y"
          :r="cellSide * slice.radius"/>

        <circle v-for="(slice, cellIndex) in $store.state.placedSlices"
          v-if="slice !== false"
          :class="['slice', slice.name.toLowerCase()]"
          :cx="getCoordinatesFromCellIndex(cellIndex).x"
          :cy="getCoordinatesFromCellIndex(cellIndex).y"
          :r="cellSide * slice.radius"/>


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
    circle {
      opacity: 1;
      transition: 0.4s;
    }
    .placer {
        fill: transparent;
        stroke: #000;
        stroke-dasharray: 3, 1;
        transform-origin: center;

        animation: placer-pulse 1s infinite;
    }
    .queued {
      opacity: 0.5;
      transition: none;
    }

    @keyframes placer-pulse {
        50% {
            transform: scale(0.9);
        }
    }
</style>
