<template>

    <div>
        <span class="money">${{ bus.player.money }}</span>
    </div>

</template>

<script>
import bus from '../shared/bus'

export default {
  computed: {
    bus () {
      return bus
    }
  }
}
</script>
