"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FilterBar from "@/features/camp/ui/FilterBar";
import { IoClose } from "react-icons/io5";
import DiscountBanner from "@/features/discount/ui/DiscountBanner";
import { MdMenu } from "react-icons/md";
import Image from "next/image";

export default function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showNavBar, setShowNavBar] = useState(true);
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
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

  // Search page navbar with original branding and new search layout
  if (isSearchPage) {
    return (
      <header className="sticky top-0 z-[9999] w-full bg-white border-b border-gray-200 shadow-md">
        <div className="flex items-center justify-between py-1 px-3 sm:px-9 xl:px-10">
          {/* Logo and Search Bar Section */}
          <div className="flex items-center gap-6 flex-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold tracking-[.15em] shrink-0"
            >
              <Image src="/logo.svg" alt="Logo" width={70} height={70} />
              {/* <p className="flex flex-col gap-2">
                <span className="hidden sm:block text-primary-green">
                  CAMPORA
                </span>
                <span className="hidden sm:block text-primary-green text-sm">
                  Himalayan escapes
                </span>
              </p> */}
            </Link>

            {/* Search Bar aligned to left section */}
            <div className="hidden lg:block">
              <FilterBar />
            </div>
          </div>

          {/* Right Nav Section */}
          <div className="flex items-center gap-7 ml-auto">
            {/* Nav links hidden below 1450px */}
            <nav className="hidden min-[1450px]:flex items-center gap-7 text-sm font-semibold text-black">
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

            {/* Hamburger for search page below 1450px */}
            <MdMenu
              size={28}
              className="min-[1450px]:hidden text-gray-700 cursor-pointer hover:text-primary-green transition-colors"
              onClick={() => setShowMenu(true)}
            />
          </div>
        </div>

        {/* Mobile FilterBar Section */}
        <div className="lg:hidden px-4 pb-3 mt-5 lg:mt-0">
          <FilterBar />
        </div>

        {/* Sidebar Menu (Slide-in) */}
        <div
          className={`${
            showMenu ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-[10000] p-8 transition-transform duration-300 ease-in-out border-l border-gray-100 flex flex-col`}
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold text-primary-green">Menu</h2>
            <IoClose
              size={28}
              className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
              onClick={() => setShowMenu(false)}
            />
          </div>

          <nav className="flex flex-col gap-6">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/gallery", label: "Gallery" },
              { href: "/contact", label: "Contacts" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setShowMenu(false)}
                className="text-lg font-semibold text-gray-700 hover:text-primary-green hover:pl-2 transition-all"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-gray-50">
            <button className="w-full py-3 bg-primary-green text-white rounded-lg font-bold hover:bg-green-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>

        {/* Overlay */}
        {showMenu && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999]"
            onClick={() => setShowMenu(false)}
          />
        )}
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
      <div className="flex items-center justify-between py-1 px-3 sm:px-9 xl:px-20">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold tracking-[.15em]"
        >
          <Image src="/logo.svg" alt="Logo" width={70} height={70} />
          <p className="flex flex-col gap-2">
            <span className="hidden sm:block text-primary-green">CAMPORA</span>
            <span className="hidden sm:block text-primary-green text-sm">
              Himalayan escapes
            </span>
          </p>
        </Link>
        <nav
          className={`hidden gap-7 text-sm font-semibold text-black md:flex`}
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

        <MdMenu
          className="block md:hidden text-2xl cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>

      <div
        className={`${showMenu ? "translate-y-0" : "-translate-y-full"} ${
          isSearchPage ? " 2xl:hidden " : " md:hidden"
        } flex items-center justify-center fixed z-[9999] inset-0 w-full h-svh bg-white transition-transform duration-300 ease-in-out  `}
      >
        <IoClose
          className="absolute top-5 right-7 text-3xl cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />
        <nav className="flex flex-col gap-7 text-sm font-semibold">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About Us" },
            { href: "/gallery", label: "Gallery" },
            { href: "/contact", label: "Contacts" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setShowMenu(!showMenu)}
              className="hover:underline text-2xl text-primary-green underline-offset-4"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
