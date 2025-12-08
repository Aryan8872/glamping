"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Camp } from "../../camp/types/CampTypes";
import { createBooking } from "../services/bookingService";
import { format, differenceInDays } from "date-fns";
import { FaChevronDown } from "react-icons/fa";

export default function BookingPage({ campData }: { campData: Camp }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const adults = Number(searchParams.get("adults") || 1);
  const children = Number(searchParams.get("children") || 0);
  const pets = Number(searchParams.get("pets") || 0);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate guests against camp limits
  const isAdultsValid = adults <= campData.maxAdult;
  const isChildrenValid = children <= campData.maxChildren;
  const isPetsValid = pets <= campData.maxPets;

  if (!isAdultsValid || !isChildrenValid || !isPetsValid) {
    // We can render this check early or set error state.
    // Since this is a server/client component mix, let's use a simple check.
    // However, inside a render function we shouldn't cause side effects like setError loop.
    // Better to compute error derived state.
  }

  const guestError =
    !isAdultsValid || !isChildrenValid || !isPetsValid
      ? `Guest limit exceeded. Max Adults: ${campData.maxAdult}, Max Children: ${campData.maxChildren}, Max Pets: ${campData.maxPets}`
      : null;

  const nights =
    checkIn && checkOut
      ? differenceInDays(new Date(checkOut), new Date(checkIn))
      : 0;
  const totalPrice = nights * campData.pricePerNight;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (guestError) return;

    setLoading(true);
    setError(null);

    try {
      const bookingPayload = {
        campSiteId: campData.id,
        checkInDate: format(new Date(checkIn!), "yyyy-MM-dd"),
        checkOutDate: format(new Date(checkOut!), "yyyy-MM-dd"),
        adults,
        children,
        pets,
        guestUserFullName: `${formData.firstName} ${formData.lastName}`,
        guestUserEmail: formData.email,
        guestUserPhoneNumber: formData.phone,
      };
      console.log("Submitting booking payload:", bookingPayload);
      await createBooking(bookingPayload);
      // Redirect to success page or show success message
      alert("Booking successful!");
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  if (!checkIn || !checkOut) {
    return <div>Missing booking dates. Please go back and select dates.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
      {/* Left Column: Contact Information */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-3xl font-serif font-medium">
            Contact information
          </h2>
        </div>

        <div className="mb-8">
          <p className="text-sm underline cursor-pointer">
            Do you already have an account?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Country</label>
            <div className="relative">
              <input
                type="text"
                name="country"
                required
                value={formData.country}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-black"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FaChevronDown className="text-gray-400" size={12} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Phone</label>
            <div className="flex gap-4">
              <div className="w-24 relative">
                <input
                  type="text"
                  placeholder="+1"
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-black"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <FaChevronDown className="text-gray-400" size={12} />
                </div>
              </div>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Cancellation policy</h3>
            <p className="text-gray-600">
              This booking is covered by the Moderate cancellation policy.
            </p>
          </div>

          {(error || guestError) && (
            <div className="text-red-500 font-bold">{error || guestError}</div>
          )}

          {/* Mobile Submit Button (visible only on small screens) */}
          <button
            type="submit"
            disabled={loading || !!guestError}
            className="lg:hidden w-full bg-red-600 text-white font-bold py-4 rounded-lg mt-4 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book now"}
          </button>
        </form>
      </div>

      {/* Right Column: Your Adventure Summary */}
      <div className="bg-[#F3F1E6] p-8 rounded-xl h-fit sticky top-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-medium">Your adventure</h2>
          <FaChevronDown className="text-gray-600" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="mb-4">
            <h3 className="font-bold text-lg">{campData.name}</h3>
            <p className="text-gray-600 text-sm">
              {campData.location || "Location not available"}
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              {campData.images?.[0] && (
                <Image
                  src={campData.images[0]}
                  alt={campData.name}
                  fill
                  className="object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex flex-col justify-center text-sm">
              <div className="mb-2">
                <span className="font-bold block">Dates:</span>
                <span>
                  {format(new Date(checkIn), "dd MMM yyyy")} –{" "}
                  {format(new Date(checkOut), "dd MMM yyyy")}
                </span>
              </div>
              <div>
                <span className="font-bold block">Guests:</span>
                <span>
                  {adults} adults
                  {children > 0 && `, ${children} children`}
                  {pets > 0 && `, ${pets} pets`}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-bold mb-4">Price details</h4>
            <div className="flex justify-between mb-2 text-sm">
              <span className="underline">Nights</span>
              <span>Rs {totalPrice.toLocaleString()}</span>
            </div>
            {/* Add discount logic here if needed */}

            <div className="flex justify-between mt-4 pt-4 border-t font-bold text-lg">
              <span>Total</span>
              <span>Rs {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Voucher code"
                className="border border-gray-300 rounded-lg p-3 flex-1 text-sm"
              />
              <button className="bg-red-600 text-white font-bold px-6 rounded-lg text-sm">
                Apply
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="hidden lg:block w-full bg-red-600 text-white font-bold py-4 rounded-lg mt-4 disabled:opacity-50 hover:bg-red-700 transition-colors"
          >
            {loading ? "Booking..." : "Book now"}
          </button>
        </div>
      </div>
    </div>
  );
}
