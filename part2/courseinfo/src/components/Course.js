import React from 'react';


const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
  
    const total = parts.reduce(
      (total, current) => total + current.exercises, 0
    );
  
    return (
      <p>Number of exercises {total}</p>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        <Part part={course} />
      </div>
    )
  }
  
  const Course = ({ course }) => {
  
    return (
      <div>
        <Header course={course} />
        {course.parts.map(part => <Content course={part} />)}
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course
