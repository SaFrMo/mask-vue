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
  state: {
    player: new Game.Player(),
    level: new Game.Level(),
    placer: 0,
    sliceTypes: Game.Slice.Presets,
    selectedSliceIndex: 0,
    placedSlices: {},
    sliceQueue: {}
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
    }
  },
  mutations: {
    'Select Slice' (state, payload) {
      state.selectedSliceIndex = payload.index
    },
    'Select Cell' (state, payload) {
      state.placer = payload.index
    },
    'Toggle Purchase' (state, payload) {
      if (state.sliceQueue[payload.index]) {
        Vue.set(state.sliceQueue, payload.index, false)
      } else if (!state.placedSlices[payload.index]) {
        Vue.set(state.sliceQueue, payload.index, _.cloneDeep(state.sliceTypes[payload.sliceIndex]))
      }
    },
    'Finish Turn' (state, payload) {
      // buy queued slices and reset queue
      for (let key of Object.keys(state.sliceQueue)) {
        if (state.sliceQueue[key]) {
          state.player.money -= state.sliceQueue[key].cost
          Vue.set(state.placedSlices, key, state.sliceQueue[key])
        }
      }
      state.sliceQueue = {}
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
