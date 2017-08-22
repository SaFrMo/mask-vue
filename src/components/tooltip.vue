<template>

  <div class="tooltip" v-if="step !== false" :style="{ left, top }" :class="{ dragging }">

    <div class="handle" @mousedown="startDrag($event)" @mouseup="dragging = false"></div>

    <div class="headline-wrap">
      <button @click="lastStep">Back</button>
      <h3>{{ headline }}</h3>
      <button :disabled="!$store.state.tutorialCanAdvance" @click="nextStep">Next</button>
    </div>

    <div class="message">{{ message }}</div>

  </div>

</template>

<script>

export default {
  data () {
    return {
      baseOffset: { x: 0, y: 0 },
      leftBase: '50vw',
      leftDiff: 0,
      topBase: '25vh',
      topDiff: 0,
      dragOrigin: { x: 0, y: 0 },
      dragging: false
    }
  },
  created () {
    window.addEventListener('mousemove', this.updateMouse)
  },
  destroyed () {
    window.removeEventListener('mousemove', this.updateMouse)
  },
  methods: {
    lastStep () {
      this.$store.commit('Change Tutorial Step', { delta: -1 })
      this.resetOffset()
      this.updatePosition()
    },
    nextStep () {
      this.$store.commit('Change Tutorial Step', { delta: 1 })
      this.resetOffset()
      this.updatePosition()
    },
    resetOffset () {
      this.baseOffset = { x: 0, y: 0 }
      this.leftDiff = 0
      this.topDiff = 0
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

      this.leftBase = left
      this.topBase = top
    },
    startDrag (evt) {
      this.baseOffset.x += this.leftDiff
      this.baseOffset.y += this.topDiff
      this.dragOrigin = { x: evt.pageX, y: evt.pageY }
      this.leftDiff = 0
      this.topDiff = 0
      this.dragging = true
    },
    updateMouse (evt) {
      if (!this.dragging) return

      this.leftDiff = evt.pageX - this.dragOrigin.x
      this.topDiff = evt.pageY - this.dragOrigin.y
    }
  },
  computed: {
    step () {
      if (
        this.$store.state.currentTutorialStep === false ||
        !this.$store.state.tutorial ||
        this.$store.state.currentTutorialStep >= this.$store.state.tutorial.length
      ) return false

      else return this.$store.state.tutorial[this.$store.state.currentTutorialStep]
    },
    headline () {
      return this.step.h || ''
    },
    message () {
      return this.step.m || ''
    },
    left () {
      return `calc(${this.leftBase} + ${this.baseOffset.x + this.leftDiff}px)`
    },
    top () {
      return `calc(${this.topBase} + ${this.baseOffset.y + this.topDiff}px)`
    }
  }
}

</script>

<style scoped>
  .tooltip {
    position: absolute;
    background-color: #c99;
    padding: 20px;
    border-radius: 10px;
    color: #000;
    width: 300px;
    transform: translate(-50%, 25px);
    transition: left 0.4s, top 0.4s;
    z-index: 100;
  }
  .tooltip.dragging {
    transition: none;
  }
  .tooltip.dragging:hover {
    cursor: move;
  }
  button:disabled {
    background-color: #666;
  }
  .handle {
    background-color: #a77;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    border-radius: 8px 8px 0 0;
    height: 22px;
  }
  .handle:hover {
    background-color: #855;
    cursor: pointer;
  }
  .headline-wrap {
    display: flex;
    margin-bottom: 20px;
  }
  .message {
    margin-bottom: 20px;
  }
</style>
