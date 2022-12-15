import React, { useState } from 'react';
import styles from '../App.module.css';

  
const ColorSelect =()=>{
    let colors = ["red", "blue", "yellow", "black", "green", "orange", "purple", "white"]
    const [selectedcolors, setselectedcolors] = useState<string[]>([""])
    const [showncolors, setshowncolors] = useState<string[]>([""])
  
    const handlechange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
      let selected: string[] = []
      for (let option of event.target.selectedOptions) {
        selected.push(option.value)
      }
      setselectedcolors(selected)
    }
    return (
      <div>
        <select multiple value={selectedcolors} onChange={handlechange}>{colors.map((color) => <option>{color}</option>)}</select>
        <button onClick={() => { setshowncolors([...selectedcolors]) }}>show</button>
        <div className={styles.flex}>
          {showncolors.map((obj) => <div style={{ backgroundColor: obj, height: 200, flex: 1 }} />)}
        </div>
      </div>
    )
}

export default ColorSelect