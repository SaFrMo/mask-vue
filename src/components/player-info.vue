<template>

    <div class="player-info">

      <div class="money-text">
        ${{ $store.state.player.money }} (-${{ Math.abs($store.state.level.energyDelta) }} / turn)
        <transition name="fade">
          <span v-if="$store.getters.queuedExpenses > 0" class="expenses">( - ${{ $store.getters.queuedExpenses }})</span>
        </transition>
      </div>

        <div class="money">
          <div class="money-bar" :style="{ width: moneyPercent + '%' }"></div>
        </div>

    </div>

</template>

<script>

export default {
  mounted () {
    this.maxMoney = this.$store.state.player.money
  },
  data () {
    return {
      maxMoney: 100
    }
  },
  computed: {
    moneyPercent () {
      return (this.$store.state.player.money / this.maxMoney) * 100
    }
  }
}
</script>

<style scoped>
  .player-info {
    text-align: center;
    margin-bottom: 30px;
  }
  .money-text {
    display: inline-block;
    position: relative;
    margin-bottom: 10px;
  }
  .money {
    position: relative;
    background-color: #fff;
    width: 50%;
    height: 40px;
    border-radius: 8px;
    margin: auto;
  }
  .money-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #0c0;
    border-radius: 8px;
    transition: width 0.4s;
  }
  .expenses {
    position: absolute;
    top: 0;
    white-space: nowrap;
    margin-left: 10px;
    left: 100%;
    color: #f99;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s, transform 0.4s;
  }
  .fade-enter,
  .fade-leave-to {
    transform: translateX(50%);
    opacity: 0;
  }

</style>
