import {useState, useRef, useEffect} from 'react'

export default function Timer(props) {
    const [timerStart, setTimerStart] = useState(null)
    const [now, setNow] = useState(null)
    const intervalRef  = useRef(null)

    useEffect(() => {
        if (props.restartGame.current) {
            clearInterval(intervalRef.current)
            setTimerStart(null)
            setNow(null)

            props.restartGame.current = false
        }
    }, [props.restartGame.current])


    if (props.gameStarted && timerStart === null && now === null) {
        handleStart()
    }

    if (props.gameWon) {
        clearInterval(intervalRef.current)
    }

    function handleStart() {
        setTimerStart(Date.now)
        setNow(Date.now)

        intervalRef.current = setInterval(() => {
            setNow(Date.now)
        }, 10)
    }

    function formattedTimer() {
        let minutesPassed = 0;
        let secondsPassed = 0
        let displaySeconds = 0
        if (timerStart != null && now != null) {
            secondsPassed = (now - timerStart) / 1000
            minutesPassed = Math.floor(secondsPassed / 60)
            displaySeconds = (secondsPassed % 60).toFixed(3)
            return String(minutesPassed) + ':' + String(displaySeconds).padStart(6, '0')
        }
        else {
            return '0:00.000'
        }
    }
    

    return (
        <span>
            Timer: {formattedTimer()}
        </span>
    )
}