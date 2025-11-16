"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

interface ImageSliderProps{
    images:string[];
    sliderClassname?:string;
    imageClassname?:string;
}

const ImageSlider = ({images,sliderClassname,imageClassname}:ImageSliderProps) => {
    const [currentSlide,setCurrentSlide] = useState(0)
    const next=()=>{
        setCurrentSlide((currentSlide+1)%images.length);
    }
    const previous = ()=>{
        setCurrentSlide((currentSlide-1+images.length)%images.length)
    }
  return (
    <div className={`relative group ${sliderClassname} overflow-hidden rounded-lg`}>
        <div className='flex transition-transform duration-500 ease-in-out'
            style={{transform:`translateX(-${currentSlide*100}%)`}}>
            {images.map((image,index)=>(
                <div key={index} className={`relative min-w-full ${imageClassname}`}>
                    <Image src={image} alt={`sliderImage ${index}`} priority={index === 0} key={index} fill/>
                </div>
            ))}
        </div>
        <button onClick={previous} className={`${currentSlide === 0 ? "hidden" : "md:group-hover:block"}  hidden absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-gray-300 text-white p-2 rounded-full cursor-pointer `}>
            <IoArrowBack className='text-black'/>
        </button>
        <button onClick={next} className={`${currentSlide==images.length-1?'hidden':'md:group-hover:block'} hidden absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-gray-300 text-white p-2 rounded-full cursor-pointer`}>
            <IoArrowForward className='text-black'/>
        </button>

         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 w-2 rounded-full transition ${
              currentSlide === i ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider