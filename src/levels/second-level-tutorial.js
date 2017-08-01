export default [
  { h: 'Goal', m: 'You\'ve seen what it\'s like to go against an empty grid, but there are plenty of ways for smart graffiti to defend itself.' },
  { h: 'Tutorial, Part 2',
    m: '...........',
    callback: () => {
      document.querySelector('.slice-roster').classList.remove('hidden')
      document.querySelector('.player-info').classList.remove('hidden')
      document.querySelector('.meta').classList.remove('hidden')
      document.querySelector('.meta .left').classList.remove('hidden')
      document.querySelector('.control-zone').classList.remove('hidden')
    }
  }
]
