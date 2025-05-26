

export default function Die(props) {

    return (
        <button
            className={props.isHeld ? "die held" : "die"}
            onClick={props.hold}
            disabled={props.disabled}
        >
            {props.value}
        </button> 
    )
}