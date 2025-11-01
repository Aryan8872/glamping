export default function Footer() {
  return (
    <footer className="border-t bg-primary-black border-white/10 py-10 text-center text-[#8ba1ab]">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        <div>© 2025 Flash Travel</div>
        <div className="mt-3 flex justify-center gap-3">
          {['f','in','▶','✈'].map((s)=> (
            <a key={s} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[#3de0d5]" href="#">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
