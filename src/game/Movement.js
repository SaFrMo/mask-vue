export default class {
  constructor (opts) {
    this.opts = opts || {}

    this.rules = this.opts.rules || [
      { x: 1, iterations: 'until-interrupted' }
      // { x: -2, iterations: 'until-interrupted' },
      // { y: 2, iterations: 'until-interrupted' },
      // { y: -2, iterations: 'until-interrupted' }
    ]
  }

  // constructor (rules) {
  //   this.rules = []
  //
  //   for (let rule of rules) {
  //     let newRule = {}
  //
  //     // handle standard straight-line, interruptable movement
  //     if (!rule.type || rule.type === 'standard') {
  //       newRule.type = 'standard'
  //       newRule.direction = rule.direction || 'n'
  //       newRule.spaces = rule.spaces || 1
  //     }
  //
  //     this.rules.push(newRule)
  //   }
  // }
  //
  // getRelativeCoordinatesFromRule (rule) {
  //   switch (rule.direction) {
  //     case 'n':
  //       return { x: 0, y: -rule.spaces }
  //     case 's':
  //       return { x: 0, y: rule.spaces }
  //     case 'e':
  //       return { x: rule.spaces, y: 0 }
  //     case 'w':
  //       return { x: -rule.spaces, y: 0 }
  //     default:
  //       return { x: 0, y: 0 }
  //   }
  // }
  //
  // getAllRelativeCoordinates () {
  //   let output = []
  //   for (let rule of this.rules) {
  //     output.push(this.getRelativeCoordinatesFromRule(rule))
  //   }
  //   return output
  // }
}
