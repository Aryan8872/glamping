import Image from 'next/image'
import React from 'react'
import { FaStar } from "react-icons/fa";
import { HiHeart } from 'react-icons/hi'
import ImageSlider from './ImageSlider';

const Card = () => {
  return (
    <div className='grid grid-rows-[1fr_auto] gap-3 mb-2'>
        <div className='w-full'>
            {/* <Image fill src="/site1.webp" alt="camping site" className='rounded-lg'/> */}
            <ImageSlider images={["/site1.webp","/site1.webp","/site1.webp"]} sliderClassname='' imageClassname='aspect-[2/2.3] rounded-lg'/>
            {/* <HiHeart className='absolute top-2 right-2 cursor-pointer text-4xl hover:text-red-600 text-white transition-colors duration-300 ease-in-out'/> */}
        </div>
        <div className='w-full flex flex-col gap-1'>
            <div className='flex flex-row justify-between text-[14px]'>
                <span className='font-semibold '>Camping location </span>
                <span className='font-medium'>Rs 2000</span>
            </div>
            <div className='flex flex-col gap-1 text-[12px]'>
                <span className='font-medium'>Camping location </span>
                <span className='font-medium'>2 guests</span>
            </div>
            <div className='flex flex-row items-center gap-1 text-[12px]'>
                <FaStar className='text-yellow-500 text-[13px]'/>
                <span>4.5 (200 reviews)</span>
            </div>
        </div>

    </div>
  )
}

export default Card