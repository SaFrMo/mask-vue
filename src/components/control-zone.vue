<template>

    <div class="control-zone">

        <h3>Add
            <select v-model="selected">
                <option disabled value="">Select a slice type...</option>
                <option v-for="(sliceType, index) in sliceTypes">{{ sliceType.name }}</option>
            </select>
            <button @click="$emit('addButtonClicked', selected)">Go!</button>
        </h3>

    </div>

</template>

<script>

export default {
  props: ['sliceTypes', 'slices'],
  data () {
    return {
      selected: ''
    }
  }
}

</script>
