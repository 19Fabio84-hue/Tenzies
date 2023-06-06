import React , {useState , useEffect}from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function Main(){
    const [dice ,setDice] = useState(Dice())
    const [tenzies , setTenzies] = useState(false)
    const [rollDice , setRollDice] = useState(false)
    const [newGame ,setNewGame] = useState(false)
    
    useEffect(()=>{
      const allTrue = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allValue = dice.every(die => die.value === firstValue)
      if(allTrue && allValue){
        setTenzies(true)
        setNewGame(false)
      } else {
        setTenzies(false)
        setNewGame(false)
      }
    },[dice])
    
    function GenerateNewDice(){
        return {value:Math.ceil(Math.random()*6) , isHeld :false , id:nanoid()}
    }
    
    function Dice(){
        const newDice = []
        for(let i = 0 ; i < 10 ; i++){
          newDice.push(GenerateNewDice())
          }
        return newDice
       }
  const buttonIsHeld = dice.filter(isHeld => isHeld.isHeld).length
       function Roll(){        
        if(!tenzies){
          setRollDice(true)
          setNewGame(false)
          setTimeout(()=>{
            setRollDice(false)
            setDice(oldDice => oldDice.map(help => {return help.isHeld ? help : GenerateNewDice()}))
          },1200)
          
        }else{
          setTenzies(false)
          setNewGame(false)
          setDice(Dice())        
        }
       }
     function holdDice(id){
     setDice(prevDice => prevDice.map( held => {
             return held.id === id ? {...held ,isHeld : !held.isHeld } : held})
            )
     }
    const elementDice = dice.map(pervDice =>
          <Die toggle={() =>holdDice(pervDice.id)}  isHeld={pervDice.isHeld} key={pervDice.id}
               rolling={rollDice} value={pervDice.value} />
                                                  )
    return(
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className={'main-ctn'}>
            {elementDice}
          </div> 
          <h3>{buttonIsHeld}/10</h3>
          {tenzies && newGame === false ?<button className='disabled' disabled  onClick={setTimeout(()=>{setNewGame(true)},3500)} style={{backgroundColor:'gray'}}>Compliment</button>
          : tenzies && newGame === true ? <button onClick={Roll}>New Game</button>
          :        <button onClick={Roll}>Roll</button>}
          {tenzies && <Confetti width={1900}/>}
        </main>
    )
}