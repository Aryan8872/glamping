import { useEffect, useState } from 'react'
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
    <header className={`${showNavBar?'translate-y-0':'-translate-y-full'} ${prevScrollPos>=800? 'bg-black/20':'bg-none'} mx-auto flex w-[85%] px-9 sticky inset-x-0 top-0 z-50  border-b-white/50 border-b-[0.2px] transition-all duration-500 ease-in-out`}>
      <div className="flex w-full  items-center justify-between py-5">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-[.15em]">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[#3de0d5] text-black">FL</span> FLASH
        </Link>
        <nav className={`hidden gap-7 text-sm font-semibold ${prevScrollPos>=800? 'text-white':'text-black'} md:flex`}>
          {[
            ['/', 'Main'],
            ['/about', 'About Us'],
            ['/tours', 'Tours'],
            ['/gallery', 'Gallery'],
            ['/reviews', 'Reviews'],
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
        <div className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-[#8ba1ab]">⌕</div>
      </div>
    </header>
  )
}
