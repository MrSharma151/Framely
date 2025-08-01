import React from "react";
import clsx from "clsx";

// Define available props for the Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "secondary" | "danger" | "outline" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  className,
  ...props
}) => {
  // Base style for all buttons
  const baseStyle =
    "inline-flex items-center justify-center rounded font-medium focus:outline-none transition duration-150";

  // Size variations (✅ Added "icon")
  const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
    icon: "p-2",
  };

  // Variant-based color styling (✅ Added "ghost")
  const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    gradient: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:opacity-90",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(
        baseStyle,
        sizeClasses[size],
        variantClasses[variant],
        {
          "w-full": fullWidth,
          "opacity-50 cursor-not-allowed": disabled || isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
