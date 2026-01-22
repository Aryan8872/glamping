"use client";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";
import ImageSlider from "../../../app/(root)/components/ImageSlider";
import { Camp } from "@/features/camp/types/CampTypes";
import { IoLocation } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import Link from "next/link";
import { buildImageUrl, buildUrl } from "@/lib/http/http";

const Card = ({ camp }: { camp: Camp }) => {
  return (
    <div className="grid cursor-pointer grid-rows-[1fr_auto] gap-3 mb-2  ">
      <div className="relative w-full border border-gray-200 shadow-sm rounded-2xl">
        {/* <Image fill src="/site1.webp" alt="camping site" className='rounded-lg'/> */}
        <ImageSlider
          id={camp.id}
          images={camp.images.map((image) => buildImageUrl(image))}
          sliderClassname=""
          imageClassname={`aspect-[2/2.5] rounded-2xl ${camp.isFullyBooked ? "grayscale-[0.5]" : ""}`}
        />
        {camp.isFullyBooked && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md z-10 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            FULLY BOOKED
          </div>
        )}
      </div>
      <Link href={`/camp/${camp.id}`} className="w-full flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <span className="font-semibold capitalize ">{camp.name} </span>
          {/* <span className="md:block hidden font-medium">
            Rs {camp.pricePerNight}{" "}
            <span className="text-[13px]">/Per Night</span>
          </span> */}
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="flex items-center gap-1 font-medium">
            <IoLocation />
            {camp.location || "Camping location"}
          </span>
          <div className="flex flex-col">
            {camp.discountedPrice &&
            camp.discountedPrice < camp.pricePerNight ? (
              <>
                <span className="text-xs text-red-500 line-through font-medium">
                  Rs {camp.originalPrice || camp.pricePerNight}
                </span>
                <span className="text-sm font-bold text-green-700">
                  Rs {camp.discountedPrice}{" "}
                  <span className="text-[13px] text-gray-500 font-normal">
                    /Per Night
                  </span>
                </span>
              </>
            ) : (
              <span className="text-sm font-medium">
                Rs {camp.pricePerNight}{" "}
                <span className="text-[13px]">/Per Night</span>
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 font-medium text-sm">
            <BsPeople />
            {Number(camp.maxAdult) + Number(camp.maxChildren)} Guests
          </span>
        </div>
        {/* <div className="flex flex-row items-center gap-1 text-[12px]">
          <FaStar className="text-yellow-500 text-[13px]" />
          <span>4.5 (200 reviews)</span>
        </div> */}
      </Link>
    </div>
  );
};

export default Card;
