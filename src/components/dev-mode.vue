<template>
  <div class="meta">

    <h3>Development/Debug</h3>
    <button @click="$store.commit('Finish Level')">Next Level</button>
    <button @click="toggleReveal">Toggle Cell Info</button>

  </div>
</template>

<script>

export default {
  methods: {
    toggleReveal () {
      this.$store.commit('Toggle Cell Info')
    }
  }
}

</script>

<style scoped>

.meta {
  flex-direction: column;
}
button {
  margin: 5px;
}

</style>
