type AnimatedTextProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "p";
  className?: string;
};

/** Text reveal animations — implemented in Phase 5. */
export function AnimatedText({
  children,
  as: Tag = "p",
  className = "",
}: AnimatedTextProps) {
  return <Tag className={className}>{children}</Tag>;
}
