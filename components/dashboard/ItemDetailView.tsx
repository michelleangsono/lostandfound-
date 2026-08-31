"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ImageOff,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Item } from "@/lib/types";

export function ItemDetailView({
  item,
  onBack,
  onToggleClaim,
}: {
  item: Item;
  onBack: () => void;
  onToggleClaim: (id: number) => void;
}) {
  const isAvailable = !item.isclaim;
  const [imageLoading, setImageLoading] = useState(!!item.image);

  return (
    <div className="flex flex-col h-full bg-[#141415] text-white">
      <header className="bg-[#0f3d79] px-4 pt-12 pb-4 flex items-center gap-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="text-white p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Item details
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Image */}
        <div className="w-full h-56 bg-[#18181a] flex flex-col items-center justify-center border-b border-zinc-800/50 relative">
          {item.image ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Loader2 size={32} className="text-zinc-500 animate-spin" />
                </div>
              )}
              <img
                src={`/api/proxy-image?url=${encodeURIComponent(item.image)}`}
                alt={item.name}
                className={`w-full h-full object-cover transition-opacity ${imageLoading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
            </>
          ) : (
            <div className="flex flex-col items-center text-zinc-400 gap-3">
              <ImageOff size={48} strokeWidth={1.5} className="text-zinc-500" />
              <span className="text-base font-medium text-zinc-300">
                No photo uploaded
              </span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Title & Status */}
          <div>
            <div className="flex justify-between items-start gap-3 mb-2">
              <h2 className="text-[24px] font-bold text-white leading-tight">
                {item.name}
              </h2>
              {isAvailable ? (
                <span className="bg-[#eaf4d9] text-[#4d7c0f] px-3 py-1 rounded-full text-[13px] font-bold tracking-wide flex-shrink-0 mt-0.5">
                  Available
                </span>
              ) : (
                <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-[13px] font-medium flex-shrink-0 mt-0.5">
                  Claimed
                </span>
              )}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-[#fcf5e9] text-[#542d10] p-4 rounded-2xl flex gap-3.5 items-start border border-[#f5e6ce]">
            <AlertCircle size={22} className="text-[#92400e] shrink-0 mt-0.5" />
            <p className="text-[14px] leading-snug font-medium text-[#713f12]">
              Read the description carefully before claiming — there&apos;s no
              photo to compare against.
            </p>
          </div>

          {/* Info box */}
          <div className="bg-[#1c1c1e] rounded-2xl p-4 flex flex-col gap-3.5 border border-zinc-800/40">
            <div className="flex justify-between items-center text-[15px]">
              <span className="text-zinc-400">Category</span>
              <span className="text-white font-semibold">
                {item.category || "Other"}
              </span>
            </div>
            <div className="flex justify-between items-center text-[15px]">
              <span className="text-zinc-400">Found at</span>
              <span className="text-white font-semibold">
                {item.zone || "Main reception"}
              </span>
            </div>
          </div>

          {/* Claimed by */}
          {!isAvailable && item.claimant_name && (
            <div className="bg-[#1c1c1e] rounded-2xl p-4 flex flex-col gap-1 border border-zinc-800/40">
              <span className="text-zinc-400 text-[15px]">Claimed by</span>
              <span className="text-white font-semibold text-[15px]">
                {item.claimant_name}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2 mb-6">
            <button
              onClick={() => onToggleClaim(item.id)}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-[16px] transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-md ${
                isAvailable
                  ? "bg-[#0f3d79] text-white hover:bg-[#13498f]"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
              }`}
            >
              {isAvailable ? (
                "This is mine, claim it"
              ) : (
                <>
                  <CheckCircle2 size={20} className="text-emerald-400" />
                  Claimed by you (Click to unclaim)
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
