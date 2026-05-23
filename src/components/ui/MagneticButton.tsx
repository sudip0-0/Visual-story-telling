type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

/** Magnetic CTA — implemented in Phase 5. */
export function MagneticButton({
  children,
  href = "#",
  className = "",
}: MagneticButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent ${className}`.trim()}
    >
      {children}
    </a>
  );
}
