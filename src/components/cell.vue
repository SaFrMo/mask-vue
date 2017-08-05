<template>

    <span
        :class="['cell', { 'can-move': canMove }, { 'can-place': canPlace }]"
        @click="clicked"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        :index="index"
        :x="x"
        :y="y">

        <div class="underlay-wrap">
          <span v-if="cell.revealed" class="max-hp">HP: {{ cell.health }} / {{ cell.maxHealth }}</span>
          <span class="underlay current" :style="{ height: currentHeight }"></span>
          <span class="underlay next" :style="{ height: nextTurnHeight }"></span>
          <span v-if="occupant" class="wall" :style="{ bottom: `${occupant.movement.hostWall * 100}%` }"></span>
        </div>

        <span class="label"></span>

        <transition name="border-fade">
          <span v-if="canMove" class="move-border"></span>
        </transition>

        <transition name="border-fade">
          <span v-if="canPlace" class="place-alert">↓</span>
        </transition>

        <div class="cell-info">
          <div v-if="cell.revealed">
            attack: {{ cell.attack }}<br/>
            value: ${{ cell.value }}
          </div>

          <div v-else>
            [?]
          </div>
        </div>

    </span>

</template>

<script>
export default {
  props: ['x', 'y', 'index', 'cell'],
  data () {
    return {
      canPlace: false,
      interveningIndices: []
    }
  },
  computed: {
    currentHeight () {
      return (this.cell.health / this.cell.maxHealth) * 100 + '%'
    },
    occupant () {
      return this.$store.state.placedSlices[this.index]
    },
    nextTurnHeight () {
      // get occupant of this cell
      if (this.occupant) {
        const nextHealth = this.cell.health - this.occupant.attack
        return (nextHealth / this.cell.maxHealth) * 100 + '%'
      }
      return (this.cell.health / this.cell.maxHealth) * 100 + '%'
    },
    canMove () {
      this.interveningIndices = []
      // do we have a slice selected?
      if (
        this.$store.state.selectedPlacedSlice === false ||
        this.$store.state.selectedPlacedSlice === this.index ||
        ((this.$store.getters.selectedPlacedSlice && this.$store.getters.selectedPlacedSlice.name !== 'Medic') &&
          this.$store.state.placedSlices[this.index] && this.$store.state.placedSlices[this.index] !== false)
      ) return false

      // can our slice move?
      if (
        this.$store.state.movedThisTurn.indexOf(this.$store.state.selectedPlacedSlice) !== -1
      ) return false

      // where is that slice?
      const slicePosition = this.getBoardCoordinatesFromIndex(this.$store.state.selectedPlacedSlice)

      const cell = this.$store.state.level.map[slicePosition.y - 1][slicePosition.x - 1]
      const cellHealth = cell.health
      const cellPercent = cell.health / cell.maxHealth
      const wall = this.$store.getters.selectedPlacedSlice.movement.hostWall
      if (wall <= 1 && cellPercent > wall) {
        return false
      } else if (wall > 1 && cellHealth > wall) {
        return false
      }

      // cycle through slice rules
      for (let rule of this.$store.state.placedSlices[this.$store.state.selectedPlacedSlice].movement.rules) {
        const computedRule = { x: rule.x || 0, y: rule.y || 0, iterations: rule.iterations || 1, options: rule.options || [] }

        // determine if the rule will effect this cell
        let effectsMe = false
        for (let i = 1; i < computedRule.iterations + 1 && i < this.$store.state.level.map.length; i++) {
          const intermediatePos = {
            x: slicePosition.x + computedRule.x * i,
            y: slicePosition.y + computedRule.y * i
          }
          if (this.x === intermediatePos.x && this.y === intermediatePos.y) {
            effectsMe = true
          }
        }

        if (effectsMe) {
          for (let i = 1; i < computedRule.iterations + 1 && i < this.$store.state.level.map.length; i++) {
            if (computedRule.options.indexOf('jump') === -1 && computedRule.iterations > 1) {
              for (let intermediate = 1; intermediate < i; intermediate++) {
                const intermediatePos = {
                  x: slicePosition.x + computedRule.x * (intermediate),
                  y: slicePosition.y + computedRule.y * (intermediate)
                }
                const index = this.getIndexFromBoardCoordinates(intermediatePos.x, intermediatePos.y)
                if (this.$store.state.placedSlices[index] && this.$store.state.placedSlices[index] !== false) {
                  return false
                } else {
                  this.interveningIndices.push(index)
                }
              }
            }

            const pos = { x: slicePosition.x + computedRule.x * i, y: slicePosition.y + computedRule.y * i }
            if (this.x === pos.x && this.y === pos.y) {
              return true
            }
          }
        }
      }

      return false
    }
  },
  methods: {
    checkPlace () {
      // can we place our selected slice on this cell?
      if (this.$store.state.selectedSliceIndex === false) {
        return false
      }

      // our health is 0, so return true
      if (this.cell.health <= 0) {
        return true
      }

      const rules = this.$store.getters.selectedSliceModel.placeLocations
      // we match a stock placing location, so return true
      if (this.x === rules.x || this.y === rules.y) {
        return true
      }

      // check other slices to see if we fall in their zones

      return false
    },
    mouseEnter () {
      this.canPlace = this.checkPlace()
    },
    mouseLeave () {
      this.canPlace = false
    },
    clicked () {
      // run medic healing routine
      if (this.$store.getters.selectedPlacedSlice.name === 'Medic' &&
      this.index !== this.$store.state.selectedPlacedSlice) {
        // remove medic and heal other cell
        this.$store.commit('Run Healing', { medicIndex: this.$store.state.selectedPlacedSlice, patientIndex: this.index })
      } else if (this.$store.state.placedSlices[this.index]) {
        // is cell occupied? if so, select occupying slice
        this.$store.commit('Select Placed Slice', { index: this.index })
      } else if (this.canMove) {
        this.$store.commit('Move Placed Slice', { index: this.index, intervening: this.interveningIndices })
      } else if (this.$store.state.placer === this.index) {
        if (this.canPlace && this.$store.getters.availableMoney >= this.$store.getters.selectedSliceModel.cost) {
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
    getIndexFromBoardCoordinates (x, y) {
      return this.$store.state.level.map.length * (y - 1) + (x - 1)
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
    .move-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 5px solid #c00;
      border-radius: 8px;
      box-sizing: border-box;
    }
    .underlay-wrap {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 10px;
      background-color: #fff;
    }
    .max-hp {
      position: absolute;
      background-color: #fff;
      color: #000;
      right: 100%;
      font-size: 12px;
      white-space: nowrap;
    }
    .underlay {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 8px;

        background-color: #5c5;

        transition: height 0.4s;
    }
    .underlay.next {
      background-color: #5c5;
      opacity: 0.4;

      display: none;
    }
    .wall {
      position: absolute;
      background-color: #000;
      width: 100%;
      height: 2px;
      left: 1px;

      transition: bottom 0.4s;
    }
    .label {
        position: relative;
    }
    .place-alert {
      position: relative;
      color: #000;
      font-size: 50px;
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

    .cell-info {
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #fff;
      font-size: 12px;
      color: #000;
      padding: 2px;
      pointer-events: none;
      z-index: 50;
      text-align: left;
    }
</style>
