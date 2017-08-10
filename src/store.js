import Vue from 'vue'
import _ from 'lodash'
import Vuex from 'vuex'
import tutorialLevel from './levels/mona-lisa'
import SecondLevel from './levels/second-level'
import ThirdLevel from './levels/third-level'
import FourthLevel from './levels/fourth-level'
import Game from './game'

Vue.use(Vuex)

const getBoardCoordinatesFromIndex = (index, state) => {
  const x = index % state.level.map.length + 1
  const y = Math.floor(index / state.level.map.length) + 1
  return { x, y }
}

export default new Vuex.Store({
  strict: true,
  state: {
    player: new Game.Player(),
    levels: [
      tutorialLevel,
      SecondLevel,
      ThirdLevel,
      FourthLevel
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
    tutorialCanAdvance: true,
    tutorialCondition: null,
    conditionTimer: null,
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
      if (state.tutorial[state.currentTutorialStep] && typeof state.tutorial[state.currentTutorialStep].condition === 'function') {
        state.tutorialCanAdvance = false
        state.tutorialCondition = state.tutorial[state.currentTutorialStep].condition
        state.conditionTimer = setInterval(() => {
          if (typeof state.tutorialCondition === 'function') {
            state.tutorialCondition(state)
          }
        }, 100)
      } else {
        state.tutorialCanAdvance = true
        clearInterval(state.conditionTimer)
      }
    },
    'Set Tutorial Advance' (state, payload) {
      state.tutorialCanAdvance = payload.canAdvance
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

      // Finish if Slice is a medic - medics don't reveal Cell info
      const canReveal = state.placedSlices[payload.index].name !== 'Medic'

      // Set cell to revealed
      const x = payload.index % state.level.map.length
      const y = Math.floor(payload.index / state.level.map.length)
      state.level.map[y][x].revealed = canReveal

      // Reveal intermediate cells
      if (payload.intervening.length) {
        for (let index of payload.intervening) {
          const intermediate = getBoardCoordinatesFromIndex(index, state)
          state.level.map[intermediate.y - 1][intermediate.x - 1].revealed = canReveal
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
    'Set Cell Revealed' (state, payload) {
      state.level.map[payload.y][payload.x].revealed = payload.revealed
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
    'Run Healing' (state, payload) {
      state.placedSlices[payload.patientIndex].health += 100
      state.placedSlices[payload.patientIndex].health = Math.min(state.placedSlices[payload.patientIndex].health, state.placedSlices[payload.patientIndex].maxHealth)
      state.selectedPlacedSlice = false
      Vue.delete(state.placedSlices, payload.medicIndex)
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
            cell.health = Math.max(0, cell.health)

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

      // apply Energy penalty
      state.player.money += state.level.energyDelta

      // increment turn counter
      state.turn++
    },
    'Finish Level' (state, payload) {
      state.currentLevel += payload && payload.hasOwnProperty('delta') ? payload.delta : 1
      if (state.currentLevel >= state.levels.length) {
        state.currentLevel = 0
      }
      state.level = _.cloneDeep(state.levels[state.currentLevel])
      state.score = 0
      state.turn = 1
      state.player.money = 500
      state.tutorial = state.level.tutorial
      // state.tutorial.$store =
      state.placedSlices = {}
      if (state.tutorial === false) {
        // Remove hidden items if there's no tutorial
        document.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'))
      }
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
