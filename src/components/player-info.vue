<template>

    <div>
        <div class="money">
          ${{ $store.state.player.money }}
          <transition name="fade">
            <span v-if="$store.getters.queuedExpenses > 0" class="expenses">( - ${{ $store.getters.queuedExpenses }})</span>
          </transition>
        </div>
    </div>

</template>

<script>

export default {

}
</script>

<style scoped>

  .money {
    position: relative;
    display: inline-block;
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
