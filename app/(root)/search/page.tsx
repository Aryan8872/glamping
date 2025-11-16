import React from 'react'
import Card from '../components/Card'

const page = () => {
    const searchFilterCategory=[
        "Instant booking",
        "Pet allowed",
        "Breakfast included",
        "Sauna",
        "Wilderness",
        "Test"
    ]
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4'>
        <div className='w-full flex flex-col gap-3'>
            <div className='w-full flex gap-5 shrink-0 overflow-x-auto py-2 px-2'>
                {searchFilterCategory.map((item)=>(
                    <button className='border-[0.3px] min-w-max cursor-pointer border-gray-300 text-sm px-3 py-1 rounded-md hover:bg-dark-green hover:text-white hover:scale-110 transition-transform duration-300 ease-in-out' key={item}>
                        {item}
                    </button>
                ))}
            </div>
            <div className='w-full grid md:grid-cols-2 xl:grid-cols-3 gap-4 px-3'>
                {Array.from({length:12}).map((_,i)=>(
                    <Card/>
                ))}

            </div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default page