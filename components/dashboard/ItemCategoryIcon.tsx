import { Shirt, Headphones, Tag } from "lucide-react"

const BottleIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 2v4a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-10a2 2 0 0 0 -2 -2v-4z" />
    <path d="M10 6h4" />
    <path d="M10 12h4" />
  </svg>
)

export function ItemCategoryIcon({ category }: { category: string | null }) {
  switch (category?.toLowerCase()) {
    case "bottles":
      return (
        <div className="w-[72px] h-[72px] bg-[#e6f7f4] rounded-2xl flex items-center justify-center flex-shrink-0 text-[#047857]">
          <BottleIcon className="w-8 h-8" />
        </div>
      )
    case "clothing":
      return (
        <div className="w-[72px] h-[72px] bg-[#faeedd] rounded-2xl flex items-center justify-center flex-shrink-0 text-[#92400e]">
          <Shirt className="w-8 h-8" />
        </div>
      )
    case "tech":
      return (
        <div className="w-[72px] h-[72px] bg-[#27272a] rounded-2xl flex items-center justify-center flex-shrink-0 text-zinc-400">
          <Headphones className="w-8 h-8" />
        </div>
      )
    default:
      return (
        <div className="w-[72px] h-[72px] bg-zinc-800 rounded-2xl flex items-center justify-center flex-shrink-0 text-zinc-300">
          <Tag className="w-8 h-8" />
        </div>
      )
  }
}
