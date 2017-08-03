<template>

    <div class="control-zone">

        <ul class="add-wrap">
            <li v-for="(sliceType, index) in sliceTypes">

                <div class="slice-tooltip">
                  <h3>{{ sliceType.name }}</h3>
                  <p>{{ sliceType.tooltip }}</p>
                  <ul class="stats">
                    <li><span>HP:</span><span>{{ sliceType.maxHealth }}</span></li>
                    <li><span>Attack:</span><span>{{ sliceType.attack }}</span></li>
                    <li><span>Wall:</span><span>{{ sliceType.movement.hostWall <= 1 ? sliceType.movement.hostWall * 100 + '%' : sliceType.movement.hostWall + ' hp' }}</span></li>
                    <li><span>Movement:</span><span>{{ sliceType.movement.description }}</span></li>
                  </ul>
                </div>

                <transition name="expand">
                    <div v-if="$store.state.selectedSliceIndex === index" class="underlay"></div>
                </transition>

                <h3>{{ sliceType.name }}</h3>

                <span class="cost">${{ sliceType.cost }}</span>

                <button
                    @click="$store.commit('Select Slice', { index })">
                    Select
                </button>
            </li>
        </ul>

    </div>

</template>

<script>
export default {
  props: ['sliceTypes', 'slices'],
  data () {
    return {
      selected: ''
    }
  }
}

</script>

<style scoped>

  .slice-tooltip {
    position: absolute;
    background-color: steelblue;
    width: 100%;
    min-height: 100px;
    right: 100%;
    border-radius: 8px;
    color: #fff;
    padding: 20px;
    box-sizing: border-box;
    opacity: 0;
    transform: translateX(10px);
    pointer-events: none;
    font-weight: 400;
    text-align: left;
    z-index: 100;

    transition: opacity 0.4s, transform 0.4s;
  }
  li:hover .slice-tooltip {
    opacity: 1;
    transform: none;
  }
  .slice-tooltip h3 {
    border-bottom: 2px solid #ffffff;
  }
  .stats {
    border-left: 2px solid #fff;
    padding-left: 2px;
  }
  .slice-tooltip .stats li {
    align-items: space-between;
  }

    .add-wrap {
        width: 250px;
        padding: 0;
        margin-left: 30px;
    }
    .add-wrap li {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .underlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.4);
    }
    .expand-enter-active,
    .expand-leave-active {
        transition: right 0.4s;
    }
    .expand-enter,
    .expand-leave-to {
        right: 100%;
    }
    .add-wrap li > *:not(.underlay):not(.slice-tooltip) {
        width: 33.33%;
        text-align: left;
        margin: 10px;
        position: relative;
    }
    .add-wrap button {
        margin: 0;
    }

</style>
