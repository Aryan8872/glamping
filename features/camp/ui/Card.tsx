import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";
import ImageSlider from "../../../app/(root)/components/ImageSlider";
import { Camp } from "@/features/camp/types/CampTypes";
import { IoLocation } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { useRouter } from "next/navigation";

const Card = ({ camp }: { camp: Camp }) => {
  const router = useRouter();
  return (
    <div className="grid cursor-pointer grid-rows-[1fr_auto] gap-3 mb-2 ">
      <div className="w-full">
        {/* <Image fill src="/site1.webp" alt="camping site" className='rounded-lg'/> */}
        <ImageSlider
          id={camp.id}
          images={camp.images.map(
            (image) =>
              `${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}${image}`
          )}
          sliderClassname=""
          imageClassname="aspect-[2/2.3] rounded-lg"
        />
      </div>
      <div
        onClick={() => router.push(`/camp/${camp.id}`)}
        className="w-full flex flex-col gap-2"
      >
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
          <span className=" text-sm font-medium">
            Rs {camp.pricePerNight}{" "}
            <span className="text-[13px]">/Per Night</span>
          </span>
          <span className="flex items-center gap-1 font-medium text-sm">
            <BsPeople />
            {Number(camp.maxAdult) + Number(camp.maxChildren)} Guests
          </span>
        </div>
        <div className="flex flex-row items-center gap-1 text-[12px]">
          <FaStar className="text-yellow-500 text-[13px]" />
          <span>4.5 (200 reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
