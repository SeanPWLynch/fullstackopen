import React from 'react';

const PersonForm = ({ submitHandler, nameChangeHandler, numberChangeHandler, nameValue, numberValue }) => {

  return (
    <form onSubmit={submitHandler}>
      <div>
        Name:  <input onChange={nameChangeHandler} value={nameValue} />
      </div>
      <div>
        Number:  <input onChange={numberChangeHandler} value={numberValue} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm