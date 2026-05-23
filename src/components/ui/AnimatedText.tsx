"use client";

type AnimatedTextProps = {
  children: string;
  as?: "h1" | "h2" | "p" | "span";
  id?: string;
  className?: string;
  splitWords?: boolean;
};

export function AnimatedText({
  children,
  as: Tag = "span",
  id,
  className = "",
  splitWords = true,
}: AnimatedTextProps) {
  if (!splitWords) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  const words = children.split(" ").filter(Boolean);

  return (
    <Tag id={id} className={className} aria-label={children}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="animated-text-word mr-[0.28em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0"
          aria-hidden
        >
          <span className="animated-text-word-inner inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
