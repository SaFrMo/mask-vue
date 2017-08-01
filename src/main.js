// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import _ from 'lodash'
import tutorialLevel from './levels/mona-lisa'
import SecondLevel from './levels/second-level'

import Game from './game'

Vue.config.productionTip = false

Vue.use(Vuex)

const getBoardCoordinatesFromIndex = (index, state) => {
  const x = index % state.level.map.length + 1
  const y = Math.floor(index / state.level.map.length) + 1
  return { x, y }
}

const store = new Vuex.Store({
  strict: true,
  state: {
    player: new Game.Player(),
    levels: [
      tutorialLevel,
      SecondLevel
    ],
    level: tutorialLevel,
    currentLevel: 0,
    placer: 0,
    sliceTypes: Game.Slice.Presets,
    selectedSliceIndex: 0,
    placedSlices: {},
    selectedPlacedSlice: false,
    sliceQueue: {},
    movedThisTurn: [],
    turn: 1,
    score: 0,
    tutorial: tutorialLevel.tutorial,
    currentTutorialStep: 0
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
      return state.placedSlices[state.selectedPlacedSlice] || false
    }
  },
  mutations: {
    'Change Tutorial Step' (state, payload) {
      state.currentTutorialStep = Math.max(state.currentTutorialStep + payload.delta, 0)
      if (state.tutorial[state.currentTutorialStep] && state.tutorial[state.currentTutorialStep].callback) {
        state.tutorial[state.currentTutorialStep].callback()
      }
    },
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

      // Set cell to revealed
      const x = payload.index % state.level.map.length
      const y = Math.floor(payload.index / state.level.map.length)
      state.level.map[y][x].revealed = true

      // Reveal intermediate cells
      if (payload.intervening.length) {
        for (let index of payload.intervening) {
          const intermediate = getBoardCoordinatesFromIndex(index, state)
          state.level.map[intermediate.y - 1][intermediate.x - 1].revealed = true
        }
      }
    },
    'Move Slice to Goal' (state, payload) {
      state.score++
      Vue.delete(state.placedSlices, state.selectedPlacedSlice)
      state.selectedPlacedSlice = false
    },
    'Select Cell' (state, payload) {
      state.placer = payload.index
      state.selectedPlacedSlice = false
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
      // apply health changes to all cells and slices
      let i = 0
      for (let y = 0; y < state.level.map.length; y++) {
        for (let x = 0; x < state.level.map.length; x++) {
          // check for occupant
          const occupant = state.placedSlices[i]
          if (occupant) {
            const cell = state.level.map[y][x]
            cell.health -= occupant.attack

            // Award points from dead cells
            if (cell.health <= 0 && cell.value >= 0) {
              state.player.money += cell.value
              cell.value = 0
            } else if (cell.health > 0) {
              occupant.health -= cell.attack
            }

            // Award Farm points
            if (cell.health <= 0 && occupant.name === 'Farm') {
              state.player.money += Math.ceil(cell.attack / 10)
            }

            // Remove dead slices
            if (occupant.health <= 0) {
              state.selectedPlacedSlice = false
              Vue.delete(state.placedSlices, i)
            }
          }
          i++
        }
      }

      // buy queued slices and reset queue
      for (let key of Object.keys(state.sliceQueue)) {
        if (state.sliceQueue[key]) {
          state.player.money -= state.sliceQueue[key].cost
          Vue.set(state.placedSlices, key, state.sliceQueue[key])
          const x = key % state.level.map.length
          const y = Math.floor(key / state.level.map.length)
          state.level.map[y][x].revealed = true
        }
      }
      state.sliceQueue = {}

      // clear movement list
      state.movedThisTurn = []

      // limit player money
      state.player.money = Math.min(state.player.money, 500)

      // increment turn counter
      state.turn++
    },
    'Finish Level' (state, payload) {
      state.currentLevel++
      state.level = _.cloneDeep(state.levels[state.currentLevel])
      state.score = 0
      state.turn = 1
      state.player.money = 500
      state.tutorial = state.level.tutorial
      state.currentTutorialStep = 0
    },

    // DEBUG BELOW
    'Toggle Cell Info' (state, payload) {
      for (let y of state.level.map) {
        for (let cell of y) {
          cell.revealed = !cell.revealed
        }
      }
    },
    'Randomize Level' (state, payload) {
      for (let y of state.level.map) {
        for (let cell of y) {
          cell.health = cell.maxHealth = Math.ceil(Math.random() * 100)
          cell.attack = Math.ceil(Math.random() * 100)
          cell.value = Math.ceil(Math.random() * 100)
          cell.revealed = false
        }
      }
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
