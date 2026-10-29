import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "link";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  // Texto ink sobre oeuf: contraste 6,4:1 (blanco sobre oeuf no pasa AA)
  primary:
    "bg-oeuf text-ink hover:bg-ink hover:text-porcelaine disabled:hover:bg-oeuf disabled:hover:text-ink",
  secondary:
    "border border-ink/80 text-ink hover:bg-ink hover:text-porcelaine disabled:hover:bg-transparent disabled:hover:text-ink",
  dark: "bg-ink text-porcelaine hover:bg-ink-soft",
  link: "text-ink underline decoration-1 underline-offset-[6px] decoration-ink/40 hover:decoration-ocre hover:text-ocre",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-5",
  md: "min-h-12 px-8",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

function classes({ variant = "primary", size = "md", fullWidth, className = "" }: CommonProps) {
  const shape = variant === "link" ? "min-h-11 px-0" : sizes[size];
  return [
    "caps inline-flex items-center justify-center gap-3 select-none",
    "btn-press",
    "disabled:cursor-not-allowed disabled:opacity-45",
    shape,
    variants[variant],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");
}

export function Button({
  variant,
  size,
  fullWidth,
  icon,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes({ variant, size, fullWidth, className, children })} {...rest}>
      {children}
      {icon}
    </button>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  fullWidth,
  icon,
  className,
  children,
  external,
}: CommonProps & { href: string; external?: boolean }) {
  const cls = classes({ variant, size, fullWidth, className, children });
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}
