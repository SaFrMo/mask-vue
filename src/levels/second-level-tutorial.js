import store from '../store'

export default [
  { h: 'Tutorial, Part 2', m: 'You\'ve seen what it\'s like to go against an empty grid, but there are plenty of ways for smart graffiti to defend itself.' },
  { h: 'Tutorial, Part 2',
    m: 'Some Cells have much higher attack than others, making them more dangerous to land on.',
    callback: () => {
      document.querySelector('.slice-roster').classList.remove('hidden')
      document.querySelector('.player-info').classList.remove('hidden')
      document.querySelector('.meta').classList.remove('hidden')
      document.querySelector('.meta .left').classList.remove('hidden')
    }
  },
  { h: 'Cell Variations',
    t: '.cell[index="0"] .cell-info',
    m: 'Artists like to place these attack-focused Cells on places where it makes sense in the mural. For example, the horns on this mural have a much higher attack value...',
    callback: () => {
      store.commit('Set Cell Revealed', { x: 0, y: 0, revealed: true })
    } },
  { h: 'Cell Variations',
    t: '.cell[index="12"] .cell-info',
    m: '...than the undefended space at the bottom of the piece.',
    callback: () => {
      store.commit('Set Cell Revealed', { x: 0, y: 3, revealed: true })
    } },
    { h: 'Cell Variations', m: 'These stats won\'t be shown at the start of a normal level. Make sure you observe the mural carefully before placing Slices!' },
    { h: 'Slice Variations', m: 'Alternately, you can use some of the unique abilities of different Slices to explore the grid.' },
  { h: 'Slice Variations',
    t: '.add-wrap > li:nth-child(2)',
    m: 'Mouse over the Scout Slice type to learn more about it, then click to select it.',
    callback: () => {
      document.querySelector('.control-zone').classList.remove('hidden')
      document.querySelector('.add-wrap > li:last-of-type').classList.add('hidden')
    } },
    { h: 'Slice Variations', m: 'You\'ll see the placer change size or shape to reflect the new Slice type you\'ve selected. You\'ll also see that, for now, you can only place a Slice on the far-left column of the grid. Queue and purchase a Scout at the bottom-left Cell.', t: '.cell[index="12"]' },
    { h: 'Slice Variations', m: 'Select the new Scout when it has been placed. You\'ll see that it can move immediately, even when a Cell is at full health, and that it can move up to three spaces in any direction.', t: '.meta' },
    { h: 'Slice Variations', m: 'Move the Scout up to the top right space on the grid.', t: '.cell[index="3"] .cell-info' },
    { h: 'Slice Variations', m: 'You\'ll see that the Scout revealed the information on both the final Cell it landed on as well as the Cells it crossed over.', t: '.cell[index="13"] .cell-info' },
    { h: 'Slice Variations', m: 'Finish the turn so the attack round can start.', t: '.finish-turn' },
    { h: 'Slice Variations', m: 'The Scout has a much lower attack and less HP than a standard Slice, so you\'ll need to use it carefully. Move it to the bottom-right Cell on the grid.', t: '.cell[index="15"] .cell-info' },
    { h: 'Slice Variations', m: 'The final column usually has the highest HP, since those Cells are the last defense against infiltration like yours.', t: '.cell[index="15"] .cell-info' },
    { h: 'Slice Variations', m: 'Finish the turn, then move the Scout one more time however you like. Since a Scout can\'t score, it\'ll usually stay on the grid until destroyed by a Cell.', t: '.finish-turn' },
    { h: 'Cell Rewards', m: 'One final piece of information to note: reducing a Cell\'s health to 0 will do two things -' },
    { h: 'Cell Rewards', m: 'First, it will give you that Cell\'s value in Energy...' },
    { h: 'Cell Rewards', m: '...and second, it will allow you to place a new Slice directly on that Cell, instead of being constrained to only placing new Slices on the far-left column.' },
    { h: 'Strategy', m: 'Use this information, as well as the data the Scout has revealed, to plot out your infiltration.' },
    { h: 'Strategy', m: 'Finish this level to hack the grid, revealing a new Slice type for you to recover and use.' }

]
