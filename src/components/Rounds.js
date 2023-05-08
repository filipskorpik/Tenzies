
const Rounds = (props) => {
    let order
    if(props.rounds === 1) {
        order = "st"
    } else if (props.rounds === 2) {
        order = "nd"
    } else if (props.rounds === 3) {
       order = "rd"
    } else {
       order = "th"
    }

    return (
        <div className="rounds">
            {props.rounds}<sup>{order}</sup> round
        </div>
    )
}

export default Rounds