<template>

    <div class="control-zone">

        <player-info/>

        <ul class="add-wrap">
            <li v-for="(sliceType, index) in sliceTypes">

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

        <button @click="$store.commit('Finish Turn')">Finish Turn</button>

    </div>

</template>

<script>
import PlayerInfo from './player-info.vue'

export default {
  props: ['sliceTypes', 'slices'],
  components: {
    'player-info': PlayerInfo
  },
  data () {
    return {
      selected: ''
    }
  }
}

</script>

<style scoped>

    .add-wrap {
        width: 250px;
        padding: 0;
        margin-right: 30px;
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
    .add-wrap li > *:not(.underlay) {
        width: 33.33%;
        text-align: left;
        margin: 10px;
        position: relative;
    }
    .add-wrap button {
        margin: 0;
    }

</style>
