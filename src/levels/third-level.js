import Game from '../game'

const tutorial = [
  { h: 'Full Level: 1 of 2',
    m: 'Now that you know the basics, try to infiltrate this and the next grid using the Slices from earlier - along with two new types, the Farm and the Medic.' },
  { h: 'Full Level: 1 of 2',
    m: 'Good luck!',
    callback: () => {
      // Remove all hidden items
      document.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'))
    } }

]

export default new Game.Level(3, [
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 60 }), new Game.Cell({ health: 90 }), new Game.Cell({ health: 270 })],
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 40 }), new Game.Cell({ health: 40, attack: 25 }), new Game.Cell({ health: 60 }), new Game.Cell({ health: 150 }), new Game.Cell({ health: 170, attack: 30 })],
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 50 }), new Game.Cell({ health: 70, attack: 20 }), new Game.Cell({ health: 90, attack: 40 }), new Game.Cell({ health: 100, attack: 20 }), new Game.Cell({ health: 140, attack: 100 })],
  [new Game.Cell({ health: 30 }), new Game.Cell({ health: 50 }), new Game.Cell({ health: 60 }), new Game.Cell({ health: 90, attack: 40 }), new Game.Cell({ health: 150 }), new Game.Cell({ health: 150, attack: 80 })],
  [new Game.Cell({ health: 30 }), new Game.Cell({ health: 50 }), new Game.Cell({ health: 60 }), new Game.Cell({ health: 60, attack: 20 }), new Game.Cell({ health: 100, attack: 20 }), new Game.Cell({ health: 150, attack: 30 })],
  [new Game.Cell({ health: 50 }), new Game.Cell({ health: 30 }), new Game.Cell({ health: 60 }), new Game.Cell({ health: 150 }), new Game.Cell({ health: 120 }), new Game.Cell({ health: 270 })]
],
  './penang.png',
  tutorial,
  -5
)
