"use client";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-black">
      <div className="mx-auto w-[92%] max-w-[1200px] py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div>
            <div className="text-black font-semibold mb-3">Our best tips</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-black hover:text-emerald-700">Romantic getaways</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Sustainable stays</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Workation</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Family friendly</a></li>
            </ul>
          </div>
          <div>
            <div className="text-black font-semibold mb-3">Explore different nature stays</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-black hover:text-emerald-700">Glamping sites</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Unique cabins</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Treehouses</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Camping domes & bubbles</a></li>
            </ul>
          </div>
          <div>
            <div className="text-black font-semibold mb-3">Where are you going?</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-black hover:text-emerald-700">Himalaya</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Lakeside</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Forests</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Rivers</a></li>
            </ul>
          </div>
          <div>
            <div className="text-black font-semibold mb-3">Discover</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-black hover:text-emerald-700">About us</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Help center</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Safety</a></li>
              <li><a href="#" className="text-black hover:text-emerald-700">Become a host</a></li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-black font-semibold mb-3">Get our newsletter</div>
            <div className="flex gap-2">
              <input className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none text-black placeholder:text-gray-500" placeholder="Your email" />
              <button className="rounded-xl bg-emerald-600 px-4 font-semibold text-white hover:bg-emerald-700">Join</button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="mx-auto w-[92%] max-w-[1200px] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-black">© 2025 Glamping Himalayas • All rights reserved</div>
          <div className="flex items-center gap-3">
            {["f","in","▶","✈"].map((s)=> (
              <a key={s} className="grid h-9 w-9 place-items-center rounded-full border border-gray-300 text-emerald-700 hover:text-emerald-800" href="#">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
