import Cell from './Cell'

export default class {
  constructor (goal, map) {
    this.goal = goal || 3
    this.map = map ||
      [
        [ new Cell(), new Cell(), new Cell() ],
        [ new Cell(), new Cell(), new Cell() ],
        [ new Cell(), new Cell(), new Cell() ]
      ]
  }
}
