<template>

  <div class="slice-roster" data-tooltip="tooltip!">

    <h2>Slices</h2>

    <div class="slice-wrap">

      <div
        v-for="(slice, index) in $store.state.placedSlices"
        class="slice-block"
        :index="index"
        @mouseenter="mouseEnter(index)"
        @mouseleave="mouseLeave(index)"
        @click="$store.commit('Select Placed Slice', { index })">
        <h3>{{ slice.name }}</h3>
        <div class="health-wrap">
          <div class="health-bar" :style="{ width: (slice.health / slice.maxHealth) * 100 + '%' }"></div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>

export default {
  methods: {
    mouseEnter (index) {
      document.querySelector(`.slice.placed[index="${index}"]`).classList.add('hovered')
    },
    mouseLeave (index) {
      document.querySelector(`.slice.placed[index="${index}"]`).classList.remove('hovered')
    }
  }
}

</script>

<style scoped>
  .slice-roster {
    margin-right: 30px;
    width: 300px;
    background-color: #fff;
    border-radius: 8px;
    color: #000;
    padding: 20px;
  }
  h2 {
    border-bottom: 2px solid #000;
  }
  .slice-block {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;

    transition: background-color 0.4s;
  }
  .slice-block:hover, .slice-block:focus {
    background-color: #ccc;
  }
  .health-wrap {
    width: 100px;
    background-color: #333;
    height: 15px;
    position: relative;
  }
  .health-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #0c0;
    transition: width 0.4s;
  }
</style>
