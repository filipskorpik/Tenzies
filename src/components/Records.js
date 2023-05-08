

const Records = (props) => {

    const minutes = Math.floor((props.timeRecord % 360000) / 6000);
    const seconds = Math.floor((props.timeRecord % 6000) / 100);

    return (
        <div className="old">
            {props.roundRecord} rounds <br /> 
            {minutes}:{seconds} 
        </div>
    )
}

export default Records