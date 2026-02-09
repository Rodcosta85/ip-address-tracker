import type { ChangeEvent } from 'react'
import axios from 'axios'
import useLocation from './hooks/useLocation'
import type { LocationProps } from './types/locationTypes'
import BgDesktop from './images/pattern-bg-desktop.png'
import BgMobile from './images/pattern-bg-mobile.png'
import StartOver from './components/StartOver'
import SearchInput from './components/SearchInput'
import Results from './components/Results'

import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';



function App() {

  const { info, ipInput, setInfo, setIpInput, setCleanIpInput } = useLocation()
  const width = window.innerWidth;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Starting coordinates (can be updated by your IP API)
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const getLocation = async () => {
    try {
      const response = await axios.get<LocationProps>(`http://ip-api.com/json/${ipInput}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,offset,isp,org,as,query`)
      console.log([response.data])
      setInfo([response.data])
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        console.error(`API Error ${error.response?.status}:`, error.response?.data);
      }
    }
  }

  const imgSrc = width < 767 ? BgMobile : BgDesktop

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setIpInput(value)
    setCleanIpInput(value !== "")
  }

  const cleanField = () => {
    setIpInput('');
    if (ipInput === "") {
      setCleanIpInput(false)
    }
  }

  // Initialize map once on component mount
  useEffect(() => {
    const mapToken = 'pk.eyJ1Ijoicm9kYy1jb3N0YSIsImEiOiJjbWxmaW54NHUwMmVtM2VxNHcybWVsdGV3In0.K_ZKDdyzMrGfj-WbMch6bA';

    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      accessToken: mapToken
    });

    return () => map.current?.remove();
  }, []); // Empty dependency array - runs once on mount

  // Update map location when info changes
  useEffect(() => {
    if (map.current && info[0]?.lat && info[0]?.lon) {
      map.current.flyTo({
        center: [info[0]?.lon, info[0]?.lat],
        zoom: 12
      });
    }
  }, [info]);

  return (
    <>
      <header className='w-full h-75 relative pt-12.5 pl-200 pr-200 flex justify-center items-start overflow-visible'>
        <img
          src={imgSrc}
          alt='purple background of a pattern'
          className='w-full h-75 object-cover object-center absolute top-0 left-0 z-1'
        />
        <div className='w-full md:w-[80%] lg:w-[80%] flex flex-col items-center gap-300 relative z-99'>
          <h1 className='font-rubik text-preset-2 text-white'>IP Address Tracker</h1>
          <SearchInput
            getLocation={getLocation}
            handleInputChange={handleInputChange}
          />
          <StartOver cleanField={cleanField} />

          <div className={`w-full p-300 bg-white rounded-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-300
          ${info.length === 0 ? 'flex items-center justify-center h-25' : 'h-fit grid'}  
            `}>
            {info.length > 0 ?
              <Results />
              :
              <h1 className='w-full text-center font-rubik text-preset-4'>
                Please use the input above with the desired IP Address
              </h1>}

          </div>


        </div>
      </header>
      <main>
        <div style={{ position: 'relative', width: '100%', height: '620px' }}>
          <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        </div>
      </main>
    </>
  )
}

export default App
