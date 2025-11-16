import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import Card from "../../components/Card";

const page = async ({
  params,
}: {
  params: Promise<{ adventureSlug: string }>;
}) => {
  const { adventureSlug } = await params;
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80')`,
          }}
        />

        {/* Content Overlay */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="bg-white bg-opacity-95 px-12 font-medium py-16 max-w-4xl text-center shadow-lg">
            <h1 className="text-5xl md:text-6xl font-serif leading-tight mb-2">
              Romantic Getaway Stays in
            </h1>
            <h1 className="text-5xl md:text-6xl font-serif leading-tight">
              Scandinavia{" "}
              <span className="text-gray-600">– Create Magical</span>
            </h1>
            <h1 className="text-5xl md:text-6xl font-serif leading-tight">
              Moments Together
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">
          Slow down. Reconnect. Escape together.
        </h2>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Imagine this: You wake up to birdsong and the scent of fresh coffee.
            Your partner is beside you, wrapped in a cozy blanket, while the sun
            rises gently over the trees. No distractions—just time for each
            other.
          </p>

          <p>
            That's the essence of a romantic getaway in Scandinavia. Whether
            you're celebrating love, marking a special occasion, or simply
            craving a break together, these unique stays offer something more:
            silence, presence, intimacy, and nature at its most beautiful.
          </p>
        </div>
        <div className="mt-10 w-full grid md:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>

      <button className="fixed bottom-8 right-8 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-900 transition-colors">
        <FiMessageCircle size={24} />
      </button>
    </div>
  );
};

export default page;
