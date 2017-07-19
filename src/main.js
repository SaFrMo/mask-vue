// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import _ from 'lodash'

import Game from './game'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    player: new Game.Player(),
    level: new Game.Level(),
    placer: 0,
    sliceTypes: Game.Slice.Presets,
    selectedSliceIndex: 0,
    placedSlices: {},
    selectedPlacedSlice: false,
    sliceQueue: {},
    movedThisTurn: [],
    turn: 1
  },
  getters: {
    availableMoney: (state, getters) => {
      return state.player.money - getters.queuedExpenses
    },
    queuedExpenses: state => {
      let output = 0
      for (let item of Object.values(state.sliceQueue)) {
        if (item) {
          output += item.cost
        }
      }
      return output
    },
    selectedSliceModel (state) {
      return state.sliceTypes[state.selectedSliceIndex]
    },
    selectedPlacedSlice (state) {
      return state.placedSlices[state.selectedPlacedSlice]
    }
  },
  mutations: {
    'Select Slice' (state, payload) {
      state.selectedSliceIndex = payload.index
    },
    'Select Placed Slice' (state, payload) {
      // select new slice or deselect current
      if (state.selectedPlacedSlice === payload.index) {
        state.selectedPlacedSlice = false
      } else {
        state.selectedPlacedSlice = payload.index
      }
    },
    'Move Placed Slice' (state, payload) {
      const oldIndex = state.selectedPlacedSlice
      Vue.set(state.placedSlices, payload.index, state.placedSlices[oldIndex])
      Vue.delete(state.placedSlices, oldIndex)
      state.selectedPlacedSlice = payload.index
      state.movedThisTurn.push(payload.index)
    },
    'Select Cell' (state, payload) {
      state.placer = payload.index
    },
    'Toggle Purchase' (state, payload) {
      if (state.sliceQueue[payload.index]) {
        // Remove slice from queue
        Vue.set(state.sliceQueue, payload.index, false)
      } else if (!state.placedSlices[payload.index]) {
        // Add a deep clone of the selected slice to the queue
        Vue.set(state.sliceQueue, payload.index, _.cloneDeep(state.sliceTypes[payload.sliceIndex]))
      }
    },
    'Finish Turn' (state, payload) {
      // apply health changes to all cells
      let i = 0
      for (let y = 0; y < state.level.map.length; y++) {
        for (let x = 0; x < state.level.map.length; x++) {
          // check for occupant
          const occupant = state.placedSlices[i]
          if (occupant) {
            state.level.map[y][x].health -= occupant.attack
          }
          i++
        }
      }

      // buy queued slices and reset queue
      for (let key of Object.keys(state.sliceQueue)) {
        if (state.sliceQueue[key]) {
          state.player.money -= state.sliceQueue[key].cost
          Vue.set(state.placedSlices, key, state.sliceQueue[key])
        }
      }
      state.sliceQueue = {}

      // clear movement list
      state.movedThisTurn = []

      // increment turn counter
      state.turn++
    }
  }
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
