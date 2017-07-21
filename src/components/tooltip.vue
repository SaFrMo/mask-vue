<template>

  <div class="tooltip" v-if="step !== false" :style="{ left, top }">

    <div class="headline-wrap">
      <button @click="lastStep">Back</button>
      <h3>{{ headline }}</h3>
      <button @click="nextStep">Next</button>
    </div>
    
    <div class="message">{{ message }}</div>

  </div>

</template>

<script>

export default {
  data () {
    return {
      left: '50vw',
      top: '25vh'
    }
  },
  methods: {
    lastStep () {
      this.$store.commit('Change Tutorial Step', { delta: -1 })
      this.updatePosition()
    },
    nextStep () {
      this.$store.commit('Change Tutorial Step', { delta: 1 })
      this.updatePosition()
    },
    updatePosition () {
      if (this.step === false) return

      let left = '50vw'
      let top = '25vh'

      if (this.step.t) {
        const target = document.querySelector(this.step.t)
        const rect = target.getBoundingClientRect()
        left = `${rect.left + rect.width / 2}px`
        top = `${rect.top + rect.height / 2}px`
      }

      this.left = left
      this.top = top
    }
  },
  computed: {
    step () {
      if (
        this.$store.state.currentTutorialStep === false ||
        this.$store.state.currentTutorialStep >= this.$store.state.tutorial.length
      ) return false

      else return this.$store.state.tutorial[this.$store.state.currentTutorialStep]
    },
    headline () {
      return this.step.h || ''
    },
    message () {
      return this.step.m || ''
    }
  }
}

</script>

<style scoped>
  .tooltip {
    position: fixed;
    background-color: #c99;
    padding: 20px;
    border-radius: 10px;
    color: #000;
    width: 300px;
    transform: translate(-50%, -50%);
    transition: left 0.4s, top 0.4s;
    border: 5px solid;
  }
  .headline-wrap {
    display: flex;
    margin-bottom: 20px;
  }
  .message {
    margin-bottom: 20px;
  }
</style>
