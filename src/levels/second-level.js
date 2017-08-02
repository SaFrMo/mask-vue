import Game from '../game'
import Tutorial from './second-level-tutorial'

export default new Game.Level(3, [
  [new Game.Cell({ health: 200, attack: 50 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 })],
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 })],
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 })],
  [new Game.Cell({ health: 30 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 })]
],
  './lascaux.png',
  Tutorial
)
