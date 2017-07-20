<template>

  <div class="tooltip">
    <h3>Tip</h3>
  </div>

</template>

<script>

export default {
  props: ['target']
}

</script>

<style scoped>
  .tooltip {
    position: absolute;
    background-color: #c99;
    padding: 20px;
    border-radius: 10px;
    color: #000;
  }
</style>
