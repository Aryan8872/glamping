import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function CampDetailImageGrid({ images }: { images: string[] }) {
  return (
    <div className="relative bg-primary-bg p-2 grid grid-cols-1 md:grid-cols-2 w-full max-w-full gap-2 border-[2px] border-primary-green rounded-lg">
      <div
        className="group relative block shadow-sm w-full cursor-pointer rounded-2xl border border-gray-200"
        style={{ paddingTop: "calc(61.3497%)" }}
      >
        <ImageWithFallback
          fill
          src={`${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}${images[0]}`}
          alt={images[0]}
          className="absolute inset-0 h-full w-full object-cover rounded-2xl"
          wrapperClassName="absolute inset-0 rounded-2xl"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0  bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50"></div>
      </div>

      {/* Grid of 4 smaller images */}
      <div className="hidden md:grid grid-cols-2 gap-2">
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="group relative shadow-sm rounded-2xl border border-gray-200 w-full cursor-pointer"
            style={{ paddingBottom: "calc(61.3497%)" }}
          >
            <ImageWithFallback
              fill
              src={`${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}${image}`}
              alt={`${images[0]} - Image ${index + 2}`}
              className="absolute inset-0 h-full w-full cursor-pointer rounded-2xl object-cover"
              wrapperClassName="absolute inset-0 rounded-2xl"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0  bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50"></div>
          </div>
        ))}
      </div>

      <img
        src="/green-corner.svg"
        alt="green-corner"
        className="pointer-events-none absolute bottom-0 right-0  z-10 w-[280px] md:w-[200px] h-auto "
      />
    </div>
  );
}
