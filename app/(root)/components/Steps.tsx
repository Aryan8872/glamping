"use client";

export default function Steps() {
  const items: [string, string][] = [
    ['Search the best near you', 'Find the perfect site in the mountains, lakes or forest.'],
    ['Book and pay for your getaway', 'Instant confirmation and flexible cancellation.'],
    ['Explore and enjoy', 'Arrive, switch off and soak up the outdoors.'],
  ];
  return (
    <section className="bg-white py-14">
      <div className="mx-auto w-[92%] max-w-[1100px] text-center">
        <h3 className="text-gray-500 uppercase tracking-[.3em] text-sm">Explore the outdoors in just three steps</h3>
        <div className="relative mt-8 grid gap-8 sm:grid-cols-3">
          {items.map(([t, s], i) => (
            <div key={i} className="px-4">
              <div className="text-5xl font-extrabold text-emerald-700">{i + 1}.</div>
              <div className="mt-2 text-lg font-semibold">{t}</div>
              <p className="text-gray-600 mt-1">{s}</p>
            </div>
          ))}
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-3 sm:block">
            <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="h-full w-full">
              <path d="M0,5 C20,0 30,10 50,5 C70,0 80,10 100,5" stroke="#ef4444" strokeDasharray="4 6" fill="transparent" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
