export default class {
  constructor (opts) {
    this.opts = opts || {}

    this.health = this.opts.health || 100
    this.maxHealth = this.opts.maxHealth || this.opts.health || 100
    this.attack = this.opts.attack || 10
    this.value = this.opts.value || 10
  }
}
