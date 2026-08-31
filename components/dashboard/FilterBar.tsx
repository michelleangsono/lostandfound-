"use client"

export function FilterBar({
  categories,
  selected,
  onSelect,
}: {
  categories: string[]
  selected: string
  onSelect: (cat: string) => void
}) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selected === cat
              ? "bg-[#2563eb] text-white"
              : "bg-transparent border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
