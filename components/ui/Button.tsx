import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  icon?: React.ElementType;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", loading = false, icon: Icon, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
    
    const variants = {
      primary: "bg-[#005bbc] text-white hover:bg-[#004a9f] focus:ring-2 focus:ring-[#005bbc]/20 border border-[#005bbc]",
      secondary: "bg-white text-slate-700 hover:bg-slate-50 focus:ring-2 focus:ring-slate-200 border-2 border-slate-200",
      outline: "bg-transparent text-slate-700 border-2 border-slate-200 hover:bg-slate-50 focus:ring-2 focus:ring-slate-200",
      ghost: "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 focus:ring-2 focus:ring-slate-200",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-200 border border-red-600",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-200 border border-green-600",
      white: "bg-white text-slate-900 hover:bg-slate-50 focus:ring-2 focus:ring-slate-200 border-2 border-slate-200"
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-xl gap-1.5",
      md: "h-10 px-4 text-sm rounded-xl gap-2",
      lg: "h-12 px-6 text-base rounded-xl gap-2.5",
      icon: "h-10 w-10 p-0 rounded-xl"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && Icon && <Icon className="w-4 h-4" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
