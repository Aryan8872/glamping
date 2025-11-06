import { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
  const [prevScrollPos,setPrevScrollPos] = useState(0)
  const [showNavBar,setShowNavBar] = useState(true)
    useEffect(()=>{
       const handleScroll = ()=>{
        const scrollPos = window.scrollY
        setPrevScrollPos(scrollPos)
        setShowNavBar(scrollPos < prevScrollPos ||scrollPos===0)   
      }
      window.addEventListener("scroll",handleScroll)
      return (()=>window.removeEventListener("scroll",handleScroll))
    },[prevScrollPos])

  return (
    <header className={`${showNavBar?'translate-y-0':'-translate-y-full'} ${prevScrollPos>=800? 'bg-black/20 border-none':'bg-none border-b-white/50 border-b-[0.2px]'} w-full sticky inset-x-0 top-0 z-50   transition-all duration-500 ease-in-out`}>
      <div className="flex w-[90%]  items-center justify-between py-5 mx-auto  px-9">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-[.15em]">
          {/* <span className="grid h-7 w-7 place-items-center rounded-md bg-(--accent) text-black">GH</span>  */}
          <span className={`${prevScrollPos>=800? 'text-white':'text-black'}`}>Glampinghimalayas</span>
        </Link>
        <nav className={`hidden gap-7 text-sm font-semibold ${prevScrollPos>=800? 'text-white':'text-black'} md:flex`}>
          {[
            ['/', 'Home'],
            ['/about', 'About Us'],
            // ['/tours', 'Tours'],
            ['/gallery', 'Gallery'],
        
            ['/contact', 'Contacts'],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                ` ${isActive ? 'underline underline-offset-4' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className=""><IoSearch color={`${prevScrollPos>=800? 'white':'black'}`} size={25} /></div>
      </div>
    </header>
  )
}
