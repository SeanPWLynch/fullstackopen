import React, { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  });

  const [selected, setSelected] = useState(0)

  const [mostVotes, setMostVotes] = useState({
    anedcote: anecdotes[0],
    votes: 0
  })

  const randomAnecdote = () => {
    console.log('Current ', selected)
    let nextIndex = 0
    while ((nextIndex = Math.floor(Math.random() * anecdotes.length)) === selected) {
      console.log('Finding Next ', selected)
    }
    setSelected(nextIndex)
  }

  const vote = () => {
    const pointcopy = { ...points }
    pointcopy[selected]++
    setPoints(pointcopy)
    if (pointcopy[selected] > mostVotes.votes) {
      console.log(anecdotes[selected], 'Now Most Voted')
      const mostVotesCopy = {
        anecdote: anecdotes[selected],
        votes: pointcopy[selected]
      }
      console.log(mostVotesCopy)
      setMostVotes(mostVotesCopy)
    }
  }

  return (
    <div>
      <div>
        <h1>Anecdote Of The Day</h1>
      </div>
      <div>
        {anecdotes[selected]}
      </div>
      <div>Has {points[selected]} Votes</div>
      <div>
        <button onClick={vote}>Vote</button>
        <button onClick={() => randomAnecdote({ selected })}>Next Anecdote</button>
      </div>
      <div>
        <h1>Most Voted</h1>
      </div>
      <div>
        {mostVotes.anecdote}
      </div>
      <div>Has {mostVotes.votes} Votes</div>
    </div>
  )
}

export default App