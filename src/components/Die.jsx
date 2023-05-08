
const Die = (props) => {

  let dotsElements = []
  for (let i = 1; i <= props.dice.value; i++) {
    dotsElements.push(<span key={i} className="Dot"></span>)
  }

  return <>
    <div
      className="Die"
      style={{ backgroundColor: props.dice.isHeld ? "#59E391" : "#ffffff" }}
      onClick={props.holdDice}
    >
      {
        dotsElements
      }
    </div>

  </>
}

export default Die