import { useEffect } from "react"


const Stopwatch = (props) => {

    

    useEffect(() => {
        let intervalId;
        if (props.isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => props.setTime(prevTime => prevTime + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [props.isRunning, props.time]);

    // Minutes calculation
    const minutes = Math.floor((props.time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((props.time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = props.time % 100;

    // Method to start and stop timer
    const startAndStop = () => {
        // setIsRunning(!isRunning);
    }

    return (
        <div>
            {minutes}:
            {seconds.toString().padStart(2, "0")}
            {/* {milliseconds.toString().padStart(2, "0")} */}
        </div>
    )
}

export default Stopwatch