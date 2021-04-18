import React from 'react'

const Notification = ({ message }) => {
  console.log(message)
  if (message === null) {
    return (
      null
    )
  }
  else {
    console.log(message)
    if (message.type === 'success') {
      return (
        <div className="success">
          {message.text}
        </div>
      )
    }
    else if (message.type === 'error') {
      return (
        <div className="error">
          {message.text}
        </div>
      )
    }
  }
}


export default Notification