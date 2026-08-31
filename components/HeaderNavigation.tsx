"use client";
import { useRouter } from "next/navigation";

export const HeaderNavigation = ({ label }: { label: string }) => {
  const router = useRouter();
  return (
    <div className="bg-[#114b7d] w-full flex items-center gap-2 py-6 px-4 rounded-t-xl">
      <button
        onClick={() => router.back()}
        className="text-white hover:text-gray-200 transition-colors cursor-pointer"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h1 className="text-white text-2xl font-semibold tracking-tight">
        {label}
      </h1>
    </div>
  );
};
