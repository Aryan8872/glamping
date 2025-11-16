import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
    
    <div className="px-3">
      <NavBar />
      <div className="min-h-screen ">
        {children}
      </div>
    </div>
    <Footer/>
    </>
  );
}
