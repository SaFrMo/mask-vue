import Movement from './Movement'

class Slice {
  constructor (opts) {
    this.opts = opts || {}
    this.name = this.opts.name || 'Standard'
    this.placeLocations = this.opts.placeLocations || { x: 1 }
    this.radius = this.opts.radius || 0.33
    this.cost = this.opts.cost || 50
    this.health = this.opts.health || 100
    this.maxHealth = this.opts.maxHealth || this.opts.health || 100
    this.attack = this.opts.attack || 20
    this.movement = this.opts.movement || new Movement()
    this.canScore = this.opts.hasOwnProperty('canScore') ? this.opts.canScore : true
    this.tooltip = this.opts.tooltip || 'Standard offensive slice. Solid attack and defense.'
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
    ],
    hostWall: 1,
    description: '3 spaces any direction'
  }),
  tooltip: 'Fast slice designed to reveal as many cells\' info as possible before being destroyed. Cannot score.'
})
const Farm = new Slice({
  name: 'Farm',
  radius: 0.45,
  cost: 125,
  health: 200,
  movement: new Movement({
    rules: [
      { x: 1, iterations: 1 }
    ],
    hostWall: 0.1,
    description: '1 space east'
  }),
  tooltip: 'Slow, powerful slice. Each turn it finishes on a depleted cell will yield 1/10 of that cell\'s Attack in Energy.'
})
const Medic = new Slice({
  name: 'Medic',
  radius: 0.2,
  cost: 25,
  health: 50,
  canScore: false,
  movement: new Movement({
    rules: [
      { x: 1, iterations: 3, options: ['jump'] },
      { x: -1, iterations: 3, options: ['jump'] },
      { y: 1, iterations: 3, options: ['jump'] },
      { y: -1, iterations: 3, options: ['jump'] },
      { x: 1, y: 1, iterations: 3, options: ['jump'] },
      { x: 1, y: -1, iterations: 3, options: ['jump'] },
      { x: -1, y: 1, iterations: 3, options: ['jump'] },
      { x: -1, y: -1, iterations: 3, options: ['jump'] }
    ],
    hostWall: 0.9,
    description: '3 spaces any direction. Can jump over and onto placed Slices.'
  }),
  tooltip: 'Moving onto an existing Slice restores that Slice\'s health by 100 and destroys the Medic. Cannot score. Does not reveal hidden Cell info.'
})

export default {
  Slice,
  Presets: [ Standard, Scout, Farm, Medic ]
}
