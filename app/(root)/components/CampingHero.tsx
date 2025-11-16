"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Controller, Autoplay, FreeMode, Parallax, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/controller";
import "swiper/css/parallax";
import "swiper/css/pagination";

const slides = [
  {
    title: "Shaun Matthews",
    caption:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    img:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    title: "Alexis Berry",
    caption:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    img:
      "https://images.unsplash.com/photo-1500643752441-4dc90cda350a?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    title: "Billie Pierce",
    caption:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    img:
      "https://images.unsplash.com/photo-1465408953385-7c4627c29435?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
];

export default function CampingHero() {
  const [thumbs, setThumbs] = useState<any>(null);
  const [main, setMain] = useState<any>(null);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="mx-auto grid w-[92%] max-w-[1400px] gap-3 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px] py-4 md:py-10">
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[88vh] rounded-2xl overflow-hidden ring-1 ring-white/10">
          <Swiper
            modules={[Navigation, Thumbs, Controller, Autoplay, FreeMode, Parallax, Pagination]}
            onSwiper={setMain}
            speed={1000}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            parallax
            rewind
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
            className="h-full"
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i} className="relative">
                <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${s.img})` }} data-swiper-parallax="-20%" />
                <div className="absolute inset-0 bg-black/40" data-swiper-parallax="-10%" />
                <div className="relative z-10 flex h-full items-center">
                  <div className="w-[90%] max-w-[820px] px-6 sm:px-10">
                    <p className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow" data-swiper-parallax="30%" data-swiper-parallax-opacity="0">
                      {s.title}
                    </p>
                    <span className="mt-3 block max-w-[60ch] text-white/90 bg-black/20 rounded-lg backdrop-blur-sm px-3 py-2" data-swiper-parallax="40%" data-swiper-parallax-opacity="0">
                      {s.caption}
                    </span>
                    <div className="mt-6" data-swiper-parallax="50%" data-swiper-parallax-opacity="0">
                      <a href="#tours" className="inline-flex items-center rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-[#062a27] hover:bg-emerald-600">
                        Explore stays
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden md:block h-[70vh] md:h-[80vh] lg:h-[88vh]">
          <Swiper
            modules={[Navigation, Thumbs, Controller]}
            onSwiper={setThumbs}
            direction="vertical"
            slidesPerView={5}
            spaceBetween={8}
            centeredSlides
            watchSlidesProgress
            slideToClickedSlide
            className="h-full rounded-2xl overflow-hidden"
            onClick={() => {
              try {
                main?.autoplay?.start();
              } catch (e) {}
            }}
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i} className="relative cursor-pointer">
                <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${s.img})` }} />
                <div className="absolute inset-0 bg-black/35" />
                <div className="relative z-10 flex h-full items-end p-3">
                  <p className="text-white/90 text-sm font-semibold drop-shadow">{s.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
