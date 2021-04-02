import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>
  {
    setGood(good+1)
  }

  const handleNeutralClick = () =>
  {
    setNeutral(neutral+1)
  }

  const handleBadClick = () =>
  {
    setBad(bad+1)
  }

  return (
    <div>
      <div><h1>Give Feedback</h1></div>
      <div>
        <Button handleClick={handleGoodClick} text='Good'/>
        <Button handleClick={handleNeutralClick} text='Neutral'/>
        <Button handleClick={handleBadClick} text='Bad'/>
      </div>
      <div><h1>Statistics</h1></div>
      <div><p>Good {good}</p></div>
      <div><p>Neutral {neutral}</p></div>
      <div><p>Bad {bad}</p></div>
    </div>
  )
}

const Button = ({handleClick, text}) =>
{
  return(
  <button onClick={handleClick}>{text}</button>
  )
}

export default App