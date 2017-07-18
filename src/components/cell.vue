<template>

    <span
        :class="['cell', { 'can-place': canPlace }]"
        @click="clicked"
        :index="index"
        :x="x"
        :y="y">

        <span class="underlay current" :style="{ height: currentHeight }"></span>
        <span class="underlay next" :style="{ height: nextTurnHeight }"></span>

        <span class="label"></span>

        <transition name="border-fade">
          <span v-if="canPlace" class="place-border"></span>
        </transition>

    </span>

</template>

<script>
export default {
  props: ['x', 'y', 'index', 'cell'],
  computed: {
    currentHeight () {
      return (this.cell.health / this.cell.maxHealth) * 100 + '%'
    },
    nextTurnHeight () {
      // get occupant of this cell
      const occupant = this.$store.state.placedSlices[this.index]
      if (occupant) {
        const nextHealth = this.cell.health - occupant.attack
        return (nextHealth / this.cell.maxHealth) * 100 + '%'
      }
      return (this.cell.health / this.cell.maxHealth) * 100 + '%'
    },
    canPlace () {
      // do we have a slice selected?
      if (
        this.$store.state.selectedPlacedSlice === false ||
        this.$store.state.selectedPlacedSlice === this.index ||
        (this.$store.state.placedSlices[this.index] && this.$store.state.placedSlices[this.index] !== false)
      ) return false

      // where is that slice?
      const slicePosition = this.getBoardCoordinatesFromIndex(this.$store.state.selectedPlacedSlice)

      // cycle through slice rules
      for (let rule of this.$store.state.placedSlices[this.$store.state.selectedPlacedSlice].movement.rules) {
        const computedRule = { x: rule.x || 0, y: rule.y || 0, iterations: rule.iterations || 1, options: rule.options || [] }

        for (let i = 1; i < computedRule.iterations + 1 && i < this.$store.state.level.map.length; i++) {
          const pos = { x: slicePosition.x + computedRule.x * i, y: slicePosition.y + computedRule.y * i }
          if (this.x === pos.x && this.y === pos.y) {
            return true
          }
        }
      }

      return false
    }
  },
  methods: {
    clicked () {
      // is cell occupied? if so, select occupying slice
      if (this.$store.state.placedSlices[this.index]) {
        this.$store.commit('Select Placed Slice', { index: this.index })
      } else if (this.$store.state.placer === this.index) {
        if (this.$store.getters.availableMoney >= this.$store.state.sliceTypes[this.$store.state.selectedSliceIndex].cost) {
          this.$store.commit('Toggle Purchase', { index: this.index, sliceIndex: this.$store.state.selectedSliceIndex })
        }
      } else {
        this.$store.commit('Select Cell', { index: this.index })
      }

      this.$root.$forceUpdate()
    },
    getBoardCoordinatesFromIndex (index) {
      const x = index % this.$store.state.level.map.length + 1
      const y = Math.floor(index / this.$store.state.level.map.length) + 1
      return { x, y }
    },
    between (value, a, b, inclusive = true) {
      const min = Math.min(a, b)
      const max = Math.max(a, b)
      if (inclusive) {
        return value >= min && value <= max
      }
      return value > min && value < max
    }
  }
}

</script>

<style scoped>
    .cell {
        position: relative;
    }
    .place-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 5px solid #c00;
      border-radius: 8px;
      box-sizing: border-box;
    }
    .underlay {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #55c;

        transition: height 0.4s;
    }
    .underlay.next {
      background-color: #5c5;
    }
    .label {
        position: relative;
    }

    .border-fade-enter-active,
    .border-fade-leave-active {
      transition: opacity 0.4s, transform 0.4s;
    }
    .border-fade-enter,
    .border-fade-leave-to {
      opacity: 0;
      transform: scale(.8);
    }
</style>
