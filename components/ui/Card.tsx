"use client";
import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "accent" | "gradient";
}

const Card: React.FC<CardProps> = ({
  children,
  hover = true,
  className = "",
  onClick,
  variant = "default",
}) => {
  const variantClasses = {
    default: "bg-white border-slate-200 hover:border-slate-300",
    primary: "bg-slate-50 border-slate-200 hover:border-slate-300",
    accent: "bg-slate-50 border-slate-200 hover:border-slate-300",
    gradient: "bg-slate-50 border-slate-200 hover:border-slate-300",
  };
  
  const baseClasses = `rounded-xl border border-slate-200 transition-colors duration-200 ${variantClasses[variant]}`;
  const hoverClasses = hover ? "hover:border-slate-300 cursor-pointer" : "";
  
  const Component = onClick ? motion.div : "div";
  const motionProps = onClick ? {
    whileTap: { scale: 0.99 },
    onClick,
  } : {};
  
  return (
    <Component
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-6 pt-0 ${className}`}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardContent };
export default Card;
