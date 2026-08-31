"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export function ReportView({
  categories,
  zones,
  onBack,
  onSubmit,
}: {
  categories: string[];
  zones: string[];
  onBack: () => void;
  onSubmit: (data: {
    name: string;
    category: string;
    zone: string;
    image?: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [zone, setZone] = useState("");
  const [customCategory, setCustomCategory] = useState(true);
  const [customCategoryValue, setCustomCategoryValue] = useState("");
  const [customZone, setCustomZone] = useState(true);
  const [customZoneValue, setCustomZoneValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const convertGDriveLink = (url: string): string => {
    const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    return match
      ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`
      : url;
  };

  const handleCategoryChange = (value: string) => {
    if (value === "other") {
      setCustomCategory(true);
      setCategory("");
    } else {
      setCustomCategory(false);
      setCategory(value);
      setCustomCategoryValue("");
    }
  };

  const handleZoneChange = (value: string) => {
    if (value === "other") {
      setCustomZone(true);
      setZone("");
    } else {
      setCustomZone(false);
      setZone(value);
      setCustomZoneValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const finalCategory = customCategory
      ? customCategoryValue.trim()
      : category;
    const finalZone = customZone ? customZoneValue.trim() : zone;
    if (!finalCategory || !finalZone) return;
    const finalImage = imageUrl.trim()
      ? convertGDriveLink(imageUrl.trim())
      : "";
    onSubmit({
      name,
      category: finalCategory,
      zone: finalZone,
      image: finalImage,
    });
  };

  return (
    <>
      <header className="bg-[#0f3d79] px-4 pt-12 pb-4 flex items-center gap-3 shrink-0">
        <button
          onClick={onBack}
          className="text-white p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Report Missing Item</h1>
      </header>

      <main className="flex-1 overflow-y-auto bg-[#131315] p-5 flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-1.5">
              Item Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Black umbrella"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:border-[#2563eb]"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-1.5">
              Category *
            </label>
            <select
              value={customCategory ? "other" : category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:border-[#2563eb]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="other">Other (type custom)</option>
            </select>
            {customCategory && (
              <input
                type="text"
                required
                placeholder="Type your category"
                value={customCategoryValue}
                onChange={(e) => setCustomCategoryValue(e.target.value)}
                className="w-full mt-2 bg-[#1c1c1e] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:border-[#2563eb]"
              />
            )}
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-1.5">
              Zone / Location *
            </label>
            <select
              value={customZone ? "other" : zone}
              onChange={(e) => handleZoneChange(e.target.value)}
              className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:border-[#2563eb]"
            >
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
              <option value="other">Other (type custom)</option>
            </select>
            {customZone && (
              <input
                type="text"
                required
                placeholder="Type your zone / location"
                value={customZoneValue}
                onChange={(e) => setCustomZoneValue(e.target.value)}
                className="w-full mt-2 bg-[#1c1c1e] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:border-[#2563eb]"
              />
            )}
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-1.5">
              Photo (Google Drive link)
            </label>
            <input
              type="text"
              placeholder="Paste Google Drive share link"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:border-[#2563eb]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-[#0f3d79] hover:bg-[#154fa1] text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg"
          >
            Submit to Database
          </button>
        </form>
      </main>
    </>
  );
}
