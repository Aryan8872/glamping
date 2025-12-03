import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <div className="">
        <Suspense
          fallback={
            <div className="h-[72px] bg-white border-b border-gray-200" />
          }
        >
          <NavBar />
        </Suspense>
        <div className="min-h-screen py-6 px-9 xl:px-20">{children}</div>
      </div>
      <Footer />
    </>
  );
}
