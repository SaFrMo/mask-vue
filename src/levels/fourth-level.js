import Game from '../game'

const tutorial = [
  { h: 'Full Level: 2 of 2',
    m: 'This is the last level of the White Mask proof-of-concept! The full game will include:' },
  { h: 'Full Level: 2 of 2',
    m: 'Animated murals, non-square boards, more Slice types, enemy Slices, more Cell types, custom map construction, boards with moving spaces, and more...',
    callback: () => {
      // Remove all hidden items
      document.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'))
    } },
  { h: 'Full Level: 2 of 2',
    m: 'We hope you enjoyed - thanks for playing!' }
]

export default new Game.Level(3, [
  [new Game.Cell({ health: 90 }), new Game.Cell({ health: 110 }), new Game.Cell({ health: 110 }), new Game.Cell({ health: 350 }), new Game.Cell({ health: 500 }), new Game.Cell({ health: 300 })],
  [new Game.Cell({ health: 90 }), new Game.Cell({ health: 400 }), new Game.Cell({ health: 420, attack: 40 }), new Game.Cell({ health: 420, attack: 40 }), new Game.Cell({ health: 500 }), new Game.Cell({ health: 350, attack: 30 })],
  [new Game.Cell({ health: 110 }), new Game.Cell({ health: 450 }), new Game.Cell({ health: 380, attack: 30 }), new Game.Cell({ health: 290, attack: 40 }), new Game.Cell({ health: 200, attack: 20 }), new Game.Cell({ health: 280, attack: 100 })],
  [new Game.Cell({ health: 110 }), new Game.Cell(), new Game.Cell({ health: 120 }), new Game.Cell({ health: 180, attack: 40 }), new Game.Cell({ health: 1000 }), new Game.Cell({ health: 410 })],
  [new Game.Cell({ health: 90 }), new Game.Cell(), new Game.Cell({ health: 120, attack: 30 }), new Game.Cell({ health: 210 }), new Game.Cell({ health: 210, attack: 20 }), new Game.Cell({ health: 310, attack: 30 })],
  [new Game.Cell({ health: 110 }), new Game.Cell({ health: 120 }), new Game.Cell({ health: 120, attack: 80 }), new Game.Cell({ health: 240 }), new Game.Cell({ health: 320 }), new Game.Cell({ health: 400 })]
],
  './gothic.png',
  tutorial,
  -6
)
