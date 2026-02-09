import useLocation from "../hooks/useLocation"

const Results = () => {

    const { info } = useLocation()

    const timezoneHrs = (info[0]?.offset) / 3600;

    return (
        <>
            <div className='flex flex-col items-center md:items-start lg:items-start gap-100 border-0
            md:border-r-2 md:border-r-gray-two 
            lg:border-r-2 lg:border-r-gray-two 
            '>
                <h2 className='font-rubik text-preset-6 text-gray-three'>IP Address</h2>
                <p className='font-rubik text-preset-3 text-gray-six text-center md:text-start lg:text-start'>{info[0]?.query}</p>
            </div>

            <div className='flex flex-col items-center md:items-start lg:items-start gap-100 border-0 
            lg:border-r-2 lg:border-r-gray-two
            '>
                <h2 className='font-rubik text-preset-6 text-gray-three'>Location</h2>
                <p className='font-rubik text-preset-3 text-gray-six text-center md:text-start lg:text-start'>
                    {info[0]?.regionName}, {info[0]?.region} {info[0]?.zip}
                </p>
            </div>

            <div className='flex flex-col items-center md:items-start lg:items-start gap-100 border-0
            md:border-r-2 md:border-r-gray-two 
            lg:border-r-2 lg:border-r-gray-two
            '>
                <h2 className='font-rubik text-preset-6 text-gray-three'>Timezone</h2>
                <p className='font-rubik text-preset-3 text-gray-six text-center md:text-start lg:text-start'>UTC {timezoneHrs}</p>
            </div>

            <div className='flex flex-col items-center md:items-start lg:items-start gap-100'>
                <h2 className='font-rubik text-preset-6 text-gray-three'>ISP</h2>
                <p className='w-50 md:w-full lg:w-full font-rubik text-preset-3 text-gray-six text-center md:text-start lg:text-start'>{info[0]?.isp}</p>
            </div>
        </>
    )
}

export default Results