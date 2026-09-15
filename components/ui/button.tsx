import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-colors disabled:opacity-50",
          variant === "default" && "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
          variant === "outline" && "border border-slate-700 hover:bg-slate-800 text-slate-100",
          variant === "ghost" && "hover:bg-slate-800 text-slate-300",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 px-3 text-xs",
          size === "lg" && "h-12 px-6",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
