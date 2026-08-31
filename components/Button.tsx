import React from "react";
import { ButtonProps } from "@/types";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  icon,
  className = "",
  ...props
}) => {
  const baseStyles =
    "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1e1e1e]";

  const variants = {
    primary:
      "bg-[#115392] hover:bg-[#1660a5] text-white focus:ring-blue-500 border border-transparent",
    outline:
      "bg-[#1e1e1e] hover:bg-[#2a2a2a] text-white border border-[#333] focus:ring-gray-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
