"use client";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";

export default function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setPrevScrollPos(scrollPos);
      setShowNavBar(scrollPos < prevScrollPos || scrollPos === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`${showNavBar ? "translate-y-0" : "-translate-y-full"} ${
        prevScrollPos >= 800 ? "bg-black/20 border-none" : "bg-none border-b-white/50 border-b-[0.2px]"
      } w-full sticky inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out`}
    >
      <div className="flex items-center justify-between py-5 mx-auto px-9">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-[.15em]">
          <span className={`${prevScrollPos >= 800 ? "text-white" : "text-black"}`}>Glampinghimalayas</span>
        </Link>
        <nav className={`hidden gap-7 text-sm font-semibold ${prevScrollPos >= 800 ? "text-white" : "text-black"} md:flex`}>
          {[{"href":"/","label":"Home"},{"href":"/about","label":"About Us"},{"href":"/gallery","label":"Gallery"},{"href":"/contact","label":"Contacts"}].map((l) => (
            <Link key={l.href} href={l.href} className="hover:underline underline-offset-4">
              {l.label}
            </Link>
          ))}
        </nav>
        <div>
          <IoSearch color={prevScrollPos >= 800 ? "white" : "black"} size={25} />
        </div>
      </div>
    </header>
  );
}
