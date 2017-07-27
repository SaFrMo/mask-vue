<template>
  <div class="meta">

    <h3>Development/Debug</h3>
    <button @click="$store.commit('Finish Level')">Next Level</button>
    <button @click="$store.commit('Toggle Cell Info')">Toggle Cell Info</button>
    <button @click="$store.commit('Randomize Level')">Randomize Level</button>

  </div>
</template>

<style scoped>

.meta {
  flex-direction: column;
}
button {
  margin: 5px;
}

</style>
