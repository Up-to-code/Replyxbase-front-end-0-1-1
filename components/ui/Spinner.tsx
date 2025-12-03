import React, { HTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", className = "", ...props }, ref) => {
    const sizes = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center justify-center ${className}`}
        {...props}
      >
        <Loader2 className={`${sizes[size]} animate-spin text-[#005bbc]`} />
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };

