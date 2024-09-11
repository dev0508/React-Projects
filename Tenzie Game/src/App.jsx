import React from "react";
import Die from "./component/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti";

export default function App() {

  const allNewDice = () => {
    let numArr = []
    for(let i = 0; i < 10; i++){
      const num = Math.floor(Math.random() * 6) + 1;
      numArr.push({num: num, 
                  isHeld: false,
                  key: nanoid()  })
    }
    return numArr;
  }

  const handleClick = (id) => {
    setArrValues(prevArr => {
      const newArr = prevArr.map((item) => {
        if(item.key == id)
          return {
          ...item,
          isHeld: !item.isHeld
          }
        else
          return item
      })
      return newArr
    })
  }

  const handleRoll = () => {
    if(tenzi){
      setTenzi(false)
      setArrValues(prevArr => allNewDice())
    }
    else{
      setArrValues(prevArr => {
        const newArr = []
        for(let i = 0; i < prevArr.length; i++){
          if(prevArr[i].isHeld)
            newArr.push(prevArr[i])
          else{
            newArr.push({
              num: Math.floor(Math.random() * 6) + 1,
              isHeld: false,
              key: nanoid()
            }
            )
          }
        }
        return  newArr
      })
    }
  }

  const [arrValues, setArrValues] = React.useState(allNewDice())
  const [tenzi, setTenzi] = React.useState(false)
  const dieElements = arrValues.map(item => <Die value = {item.num} key = {item.key} change = {item.isHeld} click = {handleClick} id = {item.key}/>)
  
  React.useEffect(
    () => {
      const allHeld = arrValues.every(item => item.isHeld)
      const firstValue = arrValues[0].num
      const allSame = arrValues.every(item => item.num == firstValue)
      if(allSame && allHeld)
        setTenzi(true)
    }
    ,[arrValues])
  
  return (
    <div className="main">
      {tenzi && <Confetti />}
      <div className="game">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="die--container">
          {dieElements}
        </div>
        <button className = "roll" onClick={handleRoll}>{tenzi ? "You Won!, Click to Reset" : "Roll!"}</button>
      </div>
    </div>
  )
}