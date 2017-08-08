export default [
  { h: 'Welcome!',
    m: 'Welcome to the Zinnia proof-of-concept! Press "next" to continue.',
    callback: () => {
      document.querySelector('.slice-roster').classList.add('hidden')
      document.querySelector('.player-info').classList.add('hidden')
      document.querySelector('.meta').classList.add('hidden')
      document.querySelector('.meta .left').classList.add('hidden')
      document.querySelector('.control-zone').classList.add('hidden')
    }
  },
  { h: 'Goal', m: 'In Zinnia, you\'re playing as a freelancer helping hack-proof "smart paint" murals.' },
  { h: 'Goal', m: 'These works of street art are living graffiti that can interact with their surroundings...' },
  { h: 'Goal', m: '...and their newfound popularity and ubiquity in large cities is opening up plenty of opportunities for malicious hackers.' },
  { h: 'Method', t: '.game-grid', m: 'This is one example of a mural, overlaid with its security grid. You\'ll be infiltrating the grid to report its weaknesses back to the artists.' },
  { h: 'Method',
    t: '.money-bar',
    m: 'You have a limited amount of energy per infiltration, which decreases every turn. If the energy reaches 0, the security grid will find and eject you, and the game will be over.',
    callback: () => {
      document.querySelector('.player-info').classList.remove('hidden')
    } },
  { h: 'Buying Slices', t: 'circle.placer', m: 'You\'ll attempt infiltrations using "Slices." Click on the pulsing circle to queue up your first slice.' },
  { h: 'Buying Slices', t: '.expenses', m: 'You can see the total cost of your queued slices here, and can click on a queued slice to remove it from the queue. You won\'t purchase the items in the queue until you finish your turn.' },
  { h: 'Turns',
    t: '.finish-turn',
    m: 'Make sure at least one Slice is queued for purchase, then click the "Finish Turn" button to finish the turn and buy those Slice(s).',
    callback: () => {
      document.querySelector('.meta').classList.remove('hidden')
    } },
  { h: 'Cells', t: '.cell-info', m: 'When a Slice enters or passes over a Cell, you\'ll be able to see more information about that Cell.' },
  { h: 'Cells', t: '.cell-info', m: 'Each turn that a Slice finishes in a Cell, that Slice and Cell will attack each other, reducing the other\'s HP.' },
  { h: 'Cells',
    t: '.slice-block',
    m: 'You can see your placed Slice health in the roster here. You can also click on a Slice either on the board or in this roster to select it.',
    callback: () => {
      document.querySelector('.slice-roster').classList.remove('hidden')
    } },
  { h: 'Cells', t: '.finish-turn', m: 'Click "Finish Turn" again to see finish your turn and see the attack round in action.' },
  { h: 'Goal', t: '.slice.placed', m: 'Your goal is to get a target number of Slices to the far right of the board, to the space marked "Goal," before running out of Energy.' },
  { h: 'Goal',
    t: '.meta .score',
    m: '(You can see that target score at the bottom of the screen here.)',
    callback: () => {
      document.querySelector('.meta .left').classList.remove('hidden')
    } },
  { h: 'Goal', t: '.wall', m: 'You can only move a Slice when the Cell it occupies is at or below a given health level, marked by a black line on the health bar.' },
  { h: 'Goal', t: '.slice.placed', m: 'Since this Cell\'s health is at that line, you can move this Slice. Select it and you\'ll see the Cells it\'s allowed to move to outlined in red.' },
  { h: 'Goal', t: '.can-move', m: 'Click on the Cell to the right to move your Slice closer to the goal.' },
  { h: 'Goal', t: '.finish-turn', m: 'Click "Finish Turn" so you can move your Slice again.' },
  { h: 'Goal', t: '.finish-turn', m: 'Move your Slice a space closer to the goal, then click "Finish Turn" again.' },
  { h: 'Goal', t: '.slice.placed', m: 'Move your Slice into the goal space, scoring a point and removing the Slice from the grid.' },
  { h: 'Goal', t: '.meta .score', m: 'Finish up the level by buying and moving Slices till you reach the target 3 points.' }
]
