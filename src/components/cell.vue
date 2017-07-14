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
      if (this.$store.state.placer === this.index) {
        if (this.$store.getters.availableMoney >= this.$store.state.sliceTypes[this.$store.state.selectedSliceIndex].cost) {
          this.$store.commit('Toggle Purchase', { index: this.index, sliceIndex: this.$store.state.selectedSliceIndex })
        }
      } else {
        this.$store.commit('Select Cell', { index: this.index })
      }
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
