<template>

    <div class="control-zone">

        <player-info/>

        <ul class="add-wrap">
            <li v-for="sliceType in sliceTypes">

                <h3>{{ sliceType.name }}</h3>

                <span class="cost">${{ sliceType.cost }}</span>

                <button
                    @click="$emit('sliceSelected', sliceType.name)">
                    Select
                </button>
            </li>
        </ul>

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
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .add-wrap li > * {
        width: 33.33%;
        text-align: left;
        margin-right: 10px;
    }
    .add-wrap button {
        margin: 0;
    }

</style>
