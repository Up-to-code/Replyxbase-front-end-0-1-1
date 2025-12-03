import React, { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ElementType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            flex h-10 w-full rounded-xl border-2 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 
            focus:outline-none focus:ring-2 focus:ring-[#005bbc]/20 focus:bg-white 
            disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-slate-200 focus:border-[#005bbc]"}
            ${Icon ? "pl-10" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
