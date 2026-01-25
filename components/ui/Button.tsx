"use client";
import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses = "font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-[#005bbc] text-white hover:bg-[#004a9f] border-[#005bbc] hover:border-[#004a9f] focus:ring-[#005bbc]/20",
    secondary: "bg-[#ffd600] text-[#005bbc] hover:bg-[#ffd600]/90 border-[#ffd600] hover:border-[#ffd600] focus:ring-[#ffd600]/20",
    outline: "bg-transparent text-[#005bbc] hover:bg-[#005bbc]/10 border-[#005bbc]/20 hover:border-[#005bbc] focus:ring-[#005bbc]/20",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-200 focus:ring-slate-200",
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  
  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.99 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;
export { Button };
