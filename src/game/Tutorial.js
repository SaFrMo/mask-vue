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
    m: 'You have a limited amount of energy per infiltration. If the energy reaches 0, the security grid will find and eject you, and the game will be over.',
    callback: () => {
      document.querySelector('.player-info').classList.remove('hidden')
    } },
  { h: 'Buying Slices', t: 'circle.placer', m: 'You\'ll attempt infiltrations using "Slices." Click on the pulsing circle to queue up your first slice.' },
  { h: 'Buying Slices', t: '.expenses', m: 'You can see the total cost of your queued slices here, and can click on a queued slice to remove it from the queue. You won\'t purchase the items in the queue until you finish your turn.' },
  // { h: 'Buying Slices', t: '.cell[x="1"][y="2"]', m: 'Right now, you can only place slices on the first column. Click any cell in the first column to select it, then click again to queue another slice.' },
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
    m: 'You can see your placed Slices\'s health in the roster here. You can also click on a Slice either on the board or in this roster to select it.',
    callback: () => {
      document.querySelector('.slice-roster').classList.remove('hidden')
    } },
  { h: 'Cells', t: '.finish-turn', m: 'Click "Finish Turn" again to see finish your turn and see the attack round in action.' },
  { h: 'Turns', t: '.slice.placed', m: 'Your goal is to get your Slices to the far right of the board. Click your Slice to see where it can move.' },
  { h: 'Turns', t: '.slice.placed', m: 'Click on one of the highlighted cells to move to that cell.' },
  { h: 'Turns', t: '.slice.placed', m: 'You can only move each Slice once per turn. Press the "Finish Turn" button (or the spacebar) to end your turn.' },
  { h: 'Combat', t: '.slice.placed', m: 'Notice that the health of both the Slice and the cell it occupied decreased. Getting a cell to 0 health does two things: ' },
  { h: 'Combat', t: '.slice.placed', m: 'First, it gives you all the energy in that cell, and second, it allows you to place newly-purchased Slices in that cell.' },
  { h: 'Combat', t: '.finish-turn', m: 'Continue pressing "Finish Turn" until a cell reaches 0 health.' },
  { h: 'Scoring', t: '.goal-zone', m: 'When you\'ve done that, continue moving your Slices to the goal zone. You can buy and move as many Slices as you like in a turn.' },
  { h: 'Scoring', t: '.meta .score ', m: 'Buy more slices and move them to the right of the board until you\'ve reached the required Score.' }
]
