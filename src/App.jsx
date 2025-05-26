import {useState, useRef} from 'react'
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';
import "./App.css"
import Die from './Die';
import Timer from './Timer';

export default function App() {
  const [dice, setDice] = useState(getDiceNumbers())
  const [rolls, setRolls] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const restartGameRef = useRef(false)
  let diceElements = [];

  let gameWon = 
    dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  function getDiceNumbers() {
    return Array.from({length: 10}, () => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }))
  }

  diceElements = dice.map((die) => {
    return <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => selectDie(die.id)}
      disabled={gameWon}
    />
  })

  function selectDie(id) {
    !gameStarted && setGameStarted(true) 

    setDice(prevDice => prevDice.map(die =>
      die.id === id ?  {...die, isHeld: !die.isHeld} : die
    ))
  }

  function roll() {
    if (!gameWon) {
      !gameStarted && setGameStarted(true)
      setDice(prevDice => prevDice.map(die => 
        die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
      ))
      setRolls(prevRoll => prevRoll + 1)
    }
    else {
      restartGame();
    }
  }

  function restartGame() {
    restartGameRef.current = true
    setDice(getDiceNumbers())
    setGameStarted(false)
    setRolls(0)
  }


  return (
    <main>
      {gameWon && <ReactConfetti /> }
      <h1>Tenzies</h1>
      <p className="game-info">
        The aim of the game is to have the same number on each dice. <br />
        Click on a die to hold it. Press the Roll button to roll all dice that have not been selected.<br />
        You win when all of the dice show the same number.
      </p>
      <div className="game-stats">
        <span>Number of Rolls: {rolls}</span>
        <Timer gameStarted={gameStarted} gameWon={gameWon} restartGame={restartGameRef}/>
      </div>
      <div className="dice-container">
        <div className='game-won' style={gameWon ? {display: 'flex'} : undefined}>
          You Win!
        </div>
        {diceElements}
      </div>
      <button className="roll" onClick={roll}>
        {gameWon ? "Start New Game" : "Roll"}
      </button>
    </main>
  )
}
