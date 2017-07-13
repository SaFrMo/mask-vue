export default class {
  constructor (opts) {
    this.opts = opts || {}
    this.name = this.opts.name || 'Standard'
    // in cell-width
    this.radius = this.opts.radius || 0.33
    this.cost = this.opts.cost || 50
  }

  canPlaceAt (index, slices) {
    if (slices.find(x => { return x.position === index })) {
      return false
    }
    return true
  }
}
