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
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 50 }), new Game.Cell({ health: 50 }), new Game.Cell({ health: 170 }), new Game.Cell({ health: 200 }), new Game.Cell({ health: 150 })],
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 150 }), new Game.Cell({ health: 160, attack: 40 }), new Game.Cell({ health: 200, attack: 40 }), new Game.Cell({ health: 200 }), new Game.Cell({ health: 170, attack: 30 })],
  [new Game.Cell({ health: 50 }), new Game.Cell({ health: 150 }), new Game.Cell({ health: 150, attack: 30 }), new Game.Cell({ health: 150, attack: 40 }), new Game.Cell({ health: 120, attack: 20 }), new Game.Cell({ health: 140, attack: 100 })],
  [new Game.Cell({ health: 50 }), new Game.Cell({ health: 50 }), new Game.Cell({ health: 50 }), new Game.Cell({ health: 70, attack: 40 }), new Game.Cell({ health: 350 }), new Game.Cell({ health: 180 })],
  [new Game.Cell({ health: 40 }), new Game.Cell({ health: 50 }), new Game.Cell({ health: 60, attack: 30 }), new Game.Cell({ health: 100 }), new Game.Cell({ health: 100, attack: 20 }), new Game.Cell({ health: 140, attack: 30 })],
  [new Game.Cell({ health: 50 }), new Game.Cell({ health: 60 }), new Game.Cell({ health: 60, attack: 80 }), new Game.Cell({ health: 110 }), new Game.Cell({ health: 150 }), new Game.Cell({ health: 160 })]
],
  './gothic.png',
  tutorial,
  -6
)
