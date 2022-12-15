import React, { useState } from 'react';
import styles from '../App.module.css';

interface student {
    name: string,
    age: number,
    year: number
  }

const Filter =()=>{
    const [search, setsearch] = useState<string>("")
  const [sorting, setsorting] = useState("")
  let students: student[] = [
    { name: "jeff", age: 20, year: 4 },
    { name: "bezos", age: 21, year: 3 },
    { name: "jonathan", age: 19, year: 2 },
    { name: "zoa", age: 22, year: 1 },
    { name: "heisenberg", age: 30, year: 4 },
  ]

  students.sort((a, b) => {
    if (sorting == "name") {
      return a.name.localeCompare(b.name)
    } else if (sorting == "age") {
      return a.age - b.age
    } else {
      return a.year - b.year
    }
  })

  const handlechange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setsearch(event.target.value)
  }

  return (
    <div>
      <input onChange={handlechange} placeholder='search'></input>
      <table>
        <thead>
          <th style={{ fontWeight: sorting == "name" ? "bold" : "normal" }} onClick={() => setsorting("name")}>name</th>
          <th style={{ fontWeight: sorting == "age" ? "bold" : "normal" }} onClick={() => setsorting("age")}>age</th>
          <th style={{ fontWeight: sorting == "year" ? "bold" : "normal" }} onClick={() => setsorting("year")}>year</th>
        </thead>
        <tbody>

          {students.filter((student) => student.name.startsWith(search)).map((student) => <tr><td>{student.name}</td><td>{student.age}</td><td>{student.year}</td></tr>)}
        </tbody>
      </table>
      <ul>
      </ul>
    </div>
  )
}

export default Filter