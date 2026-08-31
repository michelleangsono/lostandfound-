import React from "react";
import { InputProps } from "@/types";

export const Input: React.FC<InputProps> = ({
  label,
  rightElement,
  id,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-200">
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <input
          id={id}
          className={`w-full bg-[#161616] border ${error ? "border-[#e25c5c]" : "border-transparent"} focus:border-blue-500 rounded-lg px-3 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 text-gray-500 cursor-pointer hover:text-gray-300">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-[#e25c5c]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
};
