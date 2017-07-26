export default class {
  constructor (opts) {
    this.opts = opts || {}

    this.rules = this.opts.rules || [
      { x: 1, iterations: 1 },
      { x: -1, iterations: 1 },
      { y: 1, iterations: 1 },
      { y: -1, iterations: 1 }
    ]

    this.hostWall = this.opts.hostWall || 0.5
    this.description = this.opts.description || '1 space north, south, east, or west'
  }
}
