import Die from "./components/Die"
import Rounds from "./components/Rounds"
import Stopwatch from "./components/Stopwatch"
import Records from "./components/Records"
import { useEffect, useState } from "react"
import ConfettiExplosion from 'react-confetti-explosion'
import Confetti from 'react-confetti'

function App() {

  const allNewDices = () => {
    let resultArray = []
    for (let i = 0; i < 10; i++) {
      resultArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: i
      })
    }
    return resultArray
  }

  const [dice, setDice] = useState(allNewDices)
  const [tenzies, setTenzies] = useState(false)
  const [rounds, setRounds] = useState(1)
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [newRoundRecord, setNewRoundRecord] = useState(false)
  const [newTimeRecord, setTimeNewRecord] = useState(false)

  const diceElements = dice.map((number) => {
    return <Die key={number.id} dice={number} holdDice={() => holdDice(number.id)} />
  })

  const holdDice = (id) => {
    setIsRunning(true)
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
  }

  const rollDice = () => {
    setRounds(prevRounds => prevRounds + 1)
    if (tenzies) {
      setDice(allNewDices)
      setTenzies(false)
      setRounds(1)
      setTime(0)
      setIsRunning(true)
      setNewRoundRecord(false)
      setTimeNewRecord(false)
    } else {
      setIsRunning(true)
      setDice(prevDice => {
        return prevDice.map(die => {
          return die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        })
      })
    }
  }

  useEffect(() => {

    const allHeld = dice.every(die => die.isHeld)

    const allSameNumber = dice.every(die => die.value === dice[0].value)

    if (allHeld && allSameNumber) {
      setTenzies(true)
      setIsRunning(prevIsRunning => !prevIsRunning)
    }

  }, [dice])

  let isRoundRecord = 999
  if (localStorage.getItem("round record")) {
    isRoundRecord = localStorage.getItem("round record")
  }

  let isTimeRecord = 999999
  if (localStorage.getItem("time record")) {
    isTimeRecord = localStorage.getItem("time record")
  }

  const [roundRecord, setRoundRecord] = useState(isRoundRecord)
  const [timeRecord, setTimeRecord] = useState(isTimeRecord)

  useEffect(() => {
    if (tenzies) {

      if (roundRecord > rounds) {
        localStorage.setItem("round record", rounds)
        setNewRoundRecord(true)
        setRoundRecord(rounds)
        console.log(roundRecord);
      }

      if (timeRecord > time) {
        localStorage.setItem("time record", time)
        setTimeNewRecord(true)
        setTimeRecord(time)
      }
    }
  }, [tenzies])

  const bigExplodeProps = {
    force: 0.6,
    duration: 3000,
    particleCount: 200
  }

  return (
    <main>
      {tenzies && <ConfettiExplosion {...bigExplodeProps} />}
      {newRoundRecord && <Confetti />}
      {newTimeRecord && <Confetti />}

      <h1>Tenzies</h1>

      <p className="Info">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className="Dice">
        {diceElements}
      </div>

      <button
        className="Btn"
        onClick={rollDice}
      >
        {tenzies ? "Reset game" : "Roll"}
      </button>

      <div className="Stats">
        <div className="Stats__actual">
          <Rounds rounds={rounds} />
          <Stopwatch
            isRunning={isRunning}
            time={time}
            setTime={setTime}
          />
        </div>

        {roundRecord !== 999 && <Records roundRecord={roundRecord} timeRecord={timeRecord} />}
      </div>
    </main >
  )
}

export default App
