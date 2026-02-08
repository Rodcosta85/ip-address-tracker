import type { ChangeEvent } from 'react'
import axios from 'axios'
import useLocation from './hooks/useLocation'
import type { LocationProps } from './types/locationTypes'
import BgDesktop from './images/pattern-bg-desktop.png'
import BgMobile from './images/pattern-bg-mobile.png'
import Arrow from './assets/icon-arrow.svg'
import StartOver from './components/startOver'
import SearchInput from './components/SearchInput'

function App() {

  const { info, ipInput, cleanIpInput, setInfo, setIpInput, setCleanIpInput } = useLocation()
  const width = window.innerWidth;

  const getLocation = async () => {
    try {
      const response = await axios.get<LocationProps>(`https://geo.ipify.org/api/v2/country?apiKey=at_1pQapySaIYFot53bllSCq7ijCI9Nb&ipAddress=${ipInput}`)
      console.log(response.data)
      setInfo([response.data])
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        console.error('Bad request error');
      }
    }
  }

  const imgSrc = width < 767 ? BgMobile : BgDesktop;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIpInput(value);
    setCleanIpInput(value !== "");
  }

  const cleanField = () => {
    setIpInput('');
    if (ipInput === "") {
      setCleanIpInput(false);
    }
  }



  return (
    <>
      <header className='w-full h-75 relative pt-[50px] pl-200 pr-200 flex justify-center items-start'>
        <img
          src={imgSrc}
          alt='purple background of a pattern'
          className='w-full h-75 object-cover object-center absolute top-0 left-0 z-1'
        />
        <div className='flex flex-col items-center gap-300 relative z-99'>
          <h1 className='font-rubik text-preset-2 text-white'>IP Address Tracker</h1>

          {/* componente de input */}
          <SearchInput
            getLocation={getLocation}
            handleInputChange={handleInputChange}
          />
          {/* componente de input */}

          <StartOver cleanField={cleanField} />
        </div>
      </header>
    </>
  )
}

export default App
