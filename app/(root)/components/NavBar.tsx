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

  // Simple search page navbar with FilterBar
  if (isSearchPage) {
    return (
      <header className="sticky top-0 z-[9999] w-full bg-white border-b py-2 border-gray-200 text-black">
        <div className="mx-auto flex items-center justify-between py-1 px-4 lg:px-8">
          <div className="flex items-center gap-7">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold tracking-[.15em] text-black"
            >
              <Image src="/logo.svg" alt="Logo" width={80} height={80} />
              <p className="flex flex-col gap-2">
                <span className="text-primary-green">CAMPORA</span>
                <span className="text-primary-green text-sm">
                  Himalayan escapes
                </span>
              </p>
            </Link>
            <div className="xl:block hidden">
              <FilterBar />
            </div>
          </div>

          <nav className="hidden gap-7 text-sm font-semibold text-black 2xl:flex">
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

          <MdMenu
            className="block 2xl:hidden text-2xl cursor-pointer"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
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

  return (
    <header
      className={`${
        showNavBar ? "translate-y-0" : "-translate-y-full"
      } w-full sticky inset-x-0 top-0 z-[9999] bg-white shadow-md border-b-white/50 border-b-[0.2px] transition-all duration-500 ease-in-out`}
    >
      <DiscountBanner />
      <div className="flex items-center justify-between py-1 px-9 xl:px-20">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold tracking-[.15em]"
        >
          <Image src="/logo.svg" alt="Logo" width={70} height={70} />
          <p className="flex flex-col gap-2">
            <span className="text-primary-green">CAMPORA</span>
            <span className="text-primary-green text-sm">
              Himalayan escapes
            </span>
          </p>
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
