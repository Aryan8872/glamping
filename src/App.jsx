import { Routes, Route, Outlet } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/home/Home.jsx'
import About from './pages/About.jsx'
import Tours from './pages/Tours.jsx'
import Gallery from './pages/gallery/Gallery.jsx'
import Reviews from './pages/Reviews.jsx'
import Contact from './pages/Contact.jsx'
import { ReactLenis } from 'lenis/react'
import GalleryDetail from './pages/gallery/GalleryDetail.jsx'
import Search from './pages/search/Search.jsx'

function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <NavBar />
      <main className="flex-1 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, smoothTouch: false, syncTouch: true }}>
      <Routes>
        <Route element={<Layout />}> 
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="tours" element={<Tours />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="gallery/:slug" element={<GalleryDetail />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="contact" element={<Contact />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </ReactLenis>
  )
}

