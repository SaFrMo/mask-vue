<template>

    <span
        class="cell"
        @click="clicked">

        <span class="underlay current" :style="{ height: currentHeight }"></span>
        <span class="underlay next" :style="{ height: nextTurnHeight }"></span>

        <span class="label"></span>

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
        background-color: #55c;

        transition: height 0.4s;
    }
    .underlay.next {
      background-color: #5c5;
    }
    .label {
        position: relative;
    }
</style>
