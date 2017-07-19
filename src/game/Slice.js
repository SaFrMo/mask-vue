import Movement from './Movement'

class Slice {
  constructor (opts) {
    this.opts = opts || {}
    this.name = this.opts.name || 'Standard'
    this.placeLocations = this.opts.placeLocations || { x: 1 }
    // this.safeZones = this.opts.safeZones || [
    //   { x: 1 },
    //   { x: -1 },
    //   { y: 1 },
    //   { y: -1 }
    // ]
    // in cell-width
    this.radius = this.opts.radius || 0.33
    this.cost = this.opts.cost || 50
    this.health = this.opts.health || 100
    this.maxHealth = this.opts.maxHealth || this.opts.health || 100
    this.attack = this.opts.attack || 20
    this.movement = this.opts.movement || new Movement()
    this.canScore = this.opts.hasOwnProperty('canScore') ? this.opts.canScore : true
  }

  canPlaceAt (index, slices) {
    if (slices.find(x => { return x.position === index })) {
      return false
    }
    return true
  }
}

const Standard = new Slice()
const Scout = new Slice({
  name: 'Scout',
  radius: 0.25,
  cost: 75,
  attack: 5,
  health: 30,
  canScore: false,
  movement: new Movement({
    rules: [
      { x: 1, iterations: 3 },
      { x: -1, iterations: 3 },
      { y: 1, iterations: 3 },
      { y: -1, iterations: 3 },
      { x: 1, y: 1, iterations: 3 },
      { x: 1, y: -1, iterations: 3 },
      { x: -1, y: 1, iterations: 3 },
      { x: -1, y: -1, iterations: 3 }
    ]
  })
})
const Tank = new Slice({
  name: 'Tank',
  radius: 0.45,
  cost: 125,
  health: 200
})

export default {
  Slice,
  Presets: [ Standard, Scout, Tank ]
}
