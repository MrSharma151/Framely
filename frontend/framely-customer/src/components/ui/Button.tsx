type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "glass";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-7 py-3 text-lg",
  };

  const variantStyles = {
    primary: `
      text-white 
      bg-[var(--accent)] 
      hover:bg-[var(--accent-hover)] 
      shadow-lg hover:shadow-[var(--accent)]/30
    `,
    secondary: `
      text-[var(--foreground)] 
      bg-[var(--background-alt)] 
      hover:bg-[var(--accent-hover)]/20 
      shadow hover:shadow-[var(--accent)]/20
    `,
    outline: `
      border border-[var(--accent)] 
      text-[var(--accent)] 
      hover:bg-[var(--accent)] hover:text-[var(--background)]
    `,
    glass: `
      glass 
      text-[var(--foreground)] 
      hover:bg-[var(--accent)]/10 
      hover:shadow-[var(--accent)]/20
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
