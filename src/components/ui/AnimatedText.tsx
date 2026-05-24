"use client";

import { useId } from "react";

type AnimatedTextProps = {
  children: string;
  as?: "h1" | "h2" | "p" | "span";
  id?: string;
  className?: string;
  /**
   * Optional emphasis indices — splits the headline into "lines" you control.
   * If omitted, the entire string is one line. Multi-line behaviour is
   * accomplished by the consumer adding more `lines` via `<br />` in
   * children, or by passing the headline as one line and letting CSS wrap.
   */
  splitWords?: boolean;
  /**
   * When provided, the substring is wrapped in `<em data-emph>` for the
   * scene-headline italic accent. Match must be word-bounded.
   */
  emphasise?: string;
};

/**
 * Per-line mask reveal headline component.
 *
 * Visual pattern:
 *   • An outer `.headline-line` element clips overflow.
 *   • An inner `.headline-line-inner` lerps a `--reveal` 0..1 var driven
 *     by GSAP scrub (translateY 18px → 0, blur 6px → 0, opacity 0 → 1).
 *
 * Reduced motion forces `--reveal: 1` via globals.css.
 *
 * `splitWords` is kept as a prop for backwards compat with existing
 * timelines; setting it true now wraps each word in its own line for a
 * subtle stagger. Default (false here) is one mask per line.
 */
export function AnimatedText({
  children,
  as: Tag = "span",
  id,
  className = "",
  splitWords = false,
  emphasise,
}: AnimatedTextProps) {
  const generatedId = useId();
  const ariaId = id ?? `animated-text-${generatedId}`;

  const renderEmphasised = (text: string, key: string | number) => {
    if (!emphasise || !text.includes(emphasise)) {
      return <span key={key}>{text}</span>;
    }
    const before = text.slice(0, text.indexOf(emphasise));
    const after = text.slice(text.indexOf(emphasise) + emphasise.length);
    return (
      <span key={key}>
        {before}
        <em data-emph>{emphasise}</em>
        {after}
      </span>
    );
  };

  if (splitWords) {
    const words = children.split(" ").filter(Boolean);
    return (
      <Tag id={ariaId} className={className} aria-label={children}>
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="headline-line mr-[0.28em] inline-block align-bottom last:mr-0"
            aria-hidden
          >
            <span
              className="headline-line-inner animated-text-word-inner inline-block"
              style={{ ["--reveal" as never]: 0 } as React.CSSProperties}
            >
              {renderEmphasised(word, index)}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag id={ariaId} className={className} aria-label={children}>
      <span
        className="headline-line"
        aria-hidden
      >
        <span
          className="headline-line-inner animated-text-word-inner"
          style={{ ["--reveal" as never]: 0 } as React.CSSProperties}
        >
          {renderEmphasised(children, "single")}
        </span>
      </span>
    </Tag>
  );
}
