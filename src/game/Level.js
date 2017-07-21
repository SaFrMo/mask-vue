import Cell from './Cell'

export default class {
  constructor (goal, map) {
    this.goal = goal || 3
    this.map = map ||
      [
        [ new Cell(50), new Cell(), new Cell() ],
        [ new Cell(50), new Cell(), new Cell() ],
        [ new Cell(50), new Cell(), new Cell() ]
      ]
  }
}
