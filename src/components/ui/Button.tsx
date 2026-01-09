// Example UI component - Button
// This follows the OOMA design system with pill shapes and soft shadows

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "rounded-pill font-medium transition-all duration-200 shadow-soft hover:shadow-soft-md disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    secondary: "bg-secondary-200 text-secondary-foreground hover:bg-secondary-300",
    accent: "bg-accent-500 text-white hover:bg-accent-600",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
