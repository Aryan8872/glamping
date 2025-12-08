"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FilterBar from "@/features/camp/ui/FilterBar";
import { IoSearch } from "react-icons/io5";
import DiscountBanner from "@/features/discount/ui/DiscountBanner";

export default function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showNavBar, setShowNavBar] = useState(true);
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setPrevScrollPos(scrollPos);
      setShowNavBar(scrollPos < prevScrollPos || scrollPos === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Simple search page navbar with FilterBar
  if (isSearchPage) {
    return (
      <header className="sticky top-0 z-[9999] w-full bg-white border-b py-2 border-gray-200 text-black">
        <div className="mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-7">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold tracking-[.15em] text-black"
            >
              Glampinghimalayas
            </Link>
            <div>
              <FilterBar />
            </div>
          </div>

          <nav className="hidden gap-7 text-sm font-semibold text-black md:flex">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/gallery", label: "Gallery" },
              { href: "/contact", label: "Contacts" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:underline underline-offset-4"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`${
        showNavBar ? "translate-y-0" : "-translate-y-full"
      } w-full sticky inset-x-0 top-0 z-[9999] bg-white shadow-md border-b-white/50 border-b-[0.2px] transition-all duration-500 ease-in-out`}
    >
      <DiscountBanner />
      <div className="flex items-center justify-between py-5 px-9 xl:px-20">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold tracking-[.15em]"
        >
          <span className={`text-black`}>Glampinghimalayas</span>
        </Link>
        <nav
          className={`hidden gap-7 text-sm font-semibold ${
            prevScrollPos >= 800 ? "text-white" : "text-black"
          } md:flex`}
        >
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About Us" },
            { href: "/gallery", label: "Gallery" },
            { href: "/contact", label: "Contacts" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:underline text-primary-green underline-offset-4"
            >
              {l.label}
            </Link>
          ))}
        </nav>
     
      </div>
    </header>
  );
}
