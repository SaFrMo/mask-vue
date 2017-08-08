import Game from '../game'
import Tutorial from './mona-lisa-tutorial'

export default new Game.Level(3, [
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 })],
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 })],
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 })]
],
  './mona-lisa.png',
  Tutorial,
  -1
)
