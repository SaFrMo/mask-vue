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
  [new Game.Cell({ health: 80 }), new Game.Cell({ health: 80 }), new Game.Cell({ health: 80 }), new Game.Cell({ health: 120 }), new Game.Cell({ health: 180 }), new Game.Cell({ health: 550 })],
  [new Game.Cell({ health: 80 }), new Game.Cell({ health: 80 }), new Game.Cell({ health: 80, attack: 25 }), new Game.Cell({ health: 120 }), new Game.Cell({ health: 300 }), new Game.Cell({ health: 350, attack: 30 })],
  [new Game.Cell({ health: 80 }), new Game.Cell(), new Game.Cell({ health: 150, attack: 20 }), new Game.Cell({ health: 180, attack: 40 }), new Game.Cell({ health: 200, attack: 20 }), new Game.Cell({ health: 280, attack: 100 })],
  [new Game.Cell({ health: 120 }), new Game.Cell(), new Game.Cell({ health: 120 }), new Game.Cell({ health: 180, attack: 40 }), new Game.Cell({ health: 300 }), new Game.Cell({ health: 310, attack: 80 })],
  [new Game.Cell({ health: 120 }), new Game.Cell(), new Game.Cell({ health: 120 }), new Game.Cell({ health: 180, attack: 20 }), new Game.Cell({ health: 210, attack: 20 }), new Game.Cell({ health: 310, attack: 30 })],
  [new Game.Cell(), new Game.Cell({ health: 120 }), new Game.Cell({ health: 120 }), new Game.Cell({ health: 200 }), new Game.Cell({ health: 250 }), new Game.Cell({ health: 550 })]
],
  './penang.png',
  tutorial,
  -5
)
