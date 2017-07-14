// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

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
    placedSlices: []
  },
  mutations: {

  }
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
