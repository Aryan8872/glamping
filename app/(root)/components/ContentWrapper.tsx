"use client";
import { usePathname } from "next/navigation";

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div
      className={`min-h-screen py-6 ${isHomePage ? "px-0" : "px-9 xl:px-20"}`}
    >
      {children}
    </div>
  );
}
