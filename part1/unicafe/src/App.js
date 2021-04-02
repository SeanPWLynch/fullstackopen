import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const total = () =>
    (good + neutral + bad)

  const average = () =>
    ((good - bad) / total())


  const positive = () =>
    (good / total()) * 100


  if (total() === 0) {
    return (
      <div>
        <div><h1>Give Feedback</h1></div>
        <div>
          <Button handleClick={handleGoodClick} text='Good' />
          <Button handleClick={handleNeutralClick} text='Neutral' />
          <Button handleClick={handleBadClick} text='Bad' />
        </div>
        <div><h1>Statistics</h1></div>
        <p>No Feedback Given</p>
      </div>
    )
  } else {
    return (
      <div>
        <div><h1>Give Feedback</h1></div>
        <div>
          <Button handleClick={handleGoodClick} text='Good' />
          <Button handleClick={handleNeutralClick} text='Neutral' />
          <Button handleClick={handleBadClick} text='Bad' />
        </div>
        <div><h1>Statistics</h1></div>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total()}
          average={average()}
          positive={positive()}
        />

      </div>
    )
  }
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = (props) => {

  return (
    <div>
      <table>
      <Statistic text='Good' value={props.good} />
      <Statistic text='Neutral' value={props.neutral} />
      <Statistic text='Bad' value={props.bad} />
      <Statistic text='All' value={props.total} />
      <Statistic text='Average' value={props.average} />
      <Statistic text='Positive' value={props.positive} />
      </table>
    </div>
  )
}

const Statistic = ({ text, value }) => {

  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

export default App