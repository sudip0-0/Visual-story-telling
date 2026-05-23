type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-[0.28em] text-soft ${className}`.trim()}
    >
      {children}
    </p>
  );
}
