import useLocation from "../hooks/useLocation"
import Arrow from './../assets/icon-arrow.svg'

interface SearchProps {
  getLocation: () => void,
  handleInputChange: (e: any) => void
}

const SearchInput: React.FC<SearchProps> = ({ getLocation, handleInputChange }) => {

  const { ipInput } = useLocation();

  return (
    <div className='flex justify-between w-full lg:w-[60%] h-14.5 pl-300 bg-white rounded-2xl'>
      <input
        type='text'
        value={ipInput}
        onChange={handleInputChange}
        placeholder='000.00.00.00'
        className='focus:outline-none font-rubik text-preset-4 max-w-30.75'
      />
      <button
        onClick={getLocation}
        className='flex justify-center items-center w-14.5 rounded-tr-2xl rounded-br-2xl bg-black'
      >
        <img
          src={Arrow}
          alt='A white arrow pointing to the right' />
      </button>
    </div>
  )
}

export default SearchInput
