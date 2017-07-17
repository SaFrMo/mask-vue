class Slice {
  constructor (opts) {
    this.opts = opts || {}
    this.name = this.opts.name || 'Standard'
    // in cell-width
    this.radius = this.opts.radius || 0.33
    this.cost = this.opts.cost || 50
    this.health = this.opts.health || 100
    this.maxHealth = this.opts.maxHealth || this.opts.health || 100
    this.attack = this.opts.attack || 20
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
  cost: 75
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
