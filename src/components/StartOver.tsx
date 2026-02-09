import useLocation from "../hooks/useLocation"
import Close from './../assets/icon-close.svg'

interface StartOverProps {
    cleanField: () => void
}

const startOver: React.FC<StartOverProps> = ({ cleanField }) => {

    const { cleanIpInput } = useLocation()

    return (
        <button
            onClick={cleanField}
            className={` 
            transition duration-200 ease-in-out 
            flex items-center gap-2
            text-preset-4 font-rubik text-white
            ${cleanIpInput ? 'flex' : 'none'}`
            }>
            start over with your search
            <img src={Close} alt="An X" />
        </button>
    )
}

export default startOver