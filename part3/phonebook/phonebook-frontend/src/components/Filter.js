import React from 'react';

const Filter = ({ changeHandler, filter }) => {

  return (
    <div>
      Filter shown with: <input onChange={changeHandler} value={filter} />
    </div>
  )
}

export default Filter
