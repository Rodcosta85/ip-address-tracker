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
            className={`absolute -bottom-10 left-[10%] 
            transition duration-200 ease-in-out 
            flex items-center gap-2
            text-preset-5 font-rubik text-white
            ${cleanIpInput ? 'opacity-100' : 'opacity-0'}`
            }>
            start over with your search?
            <img src={Close} alt="An X" />
        </button>
    )
}

export default startOver