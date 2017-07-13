<template>

    <span
        class="cell"
        :data-x="x"
        :data-y="y"
        @click="clicked">

        <span class="underlay" ></span>

        <span class="label">{{ x }}, {{ y }}</span>

    </span>

</template>

<script>

export default {
  props: ['x', 'y'],
  methods: {
    clicked () {
      alert(`clicked ${this.x}, ${this.y}`)
    }
  }
}

</script>
