"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "Safety Information", href: "/about" },
      { label: "Cancellation Options", href: "/about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/contact" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaLinkedinIn, href: "#" },
  { icon: FaYoutube, href: "#" },
  { icon: FaInstagram, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.svg" alt="Campora" width={50} height={50} />
              <div className="flex flex-col">
                <span className="font-extrabold tracking-widest text-primary-green text-xl">
                  CAMPORA
                </span>
                <span className="text-xs text-primary-green tracking-wide">
                  Himalayan Escapes
                </span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              Discover the most breathtaking camping destinations in the
              Himalayas. Escape the ordinary and reconnect with nature.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 transition-all hover:bg-primary-green hover:text-white"
                >
                  <item.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          {FOOTER_LINKS.map((col, idx) => (
            <div key={idx} className="col-span-1">
              <h4 className="font-bold text-gray-900 mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-primary-green transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Campora. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-green">
              Privacy
            </Link>
            <Link href="/" className="hover:text-primary-green">
              Terms
            </Link>
            <Link href="/" className="hover:text-primary-green">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
