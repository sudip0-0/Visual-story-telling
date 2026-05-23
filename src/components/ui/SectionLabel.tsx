type SectionLabelProps = {
  children: React.ReactNode;
  sceneIndex?: number;
  className?: string;
};

export function SectionLabel({
  children,
  sceneIndex,
  className = "",
}: SectionLabelProps) {
  return (
    <div
      className={`section-label flex items-center gap-3 ${className}`.trim()}
    >
      {sceneIndex !== undefined && (
        <span className="section-label-index" aria-hidden>
          {String(sceneIndex).padStart(2, "0")}
        </span>
      )}
      <span className="section-label-line" aria-hidden />
      <p className="section-label-text">{children}</p>
    </div>
  );
}
