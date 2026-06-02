import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "secondary" | "ghost";
};

const variants = {
  default: "bg-foreground text-background hover:bg-foreground/90",
  secondary: "bg-muted text-foreground hover:bg-muted/80",
  ghost: "hover:bg-muted text-foreground",
};

export function Button({ asChild = false, className, variant = "default", children, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className
  );

  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
    });
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
