import Game from '../game'
import Tutorial from './second-level-tutorial'

export default new Game.Level(3, [
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 })],
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 })],
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 })]
],
  './mona-lisa.png',
  Tutorial
)
