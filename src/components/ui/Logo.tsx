import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  href?: string | null;
  className?: string;
  taglineClassName?: string;
};

const sizes = {
  sm: { word: "text-[1.25rem]", tag: "text-[0.5rem]" },
  md: { word: "text-[1.0625rem] min-[400px]:text-[1.25rem] md:text-[1.875rem]", tag: "text-[0.5625rem]" },
  lg: { word: "text-[1.75rem] min-[400px]:text-[2rem] md:text-[3.5rem]", tag: "text-[0.625rem] md:text-[0.75rem]" },
};

/** Logo tipográfico provisional (CLAUDE.md §3). */
export function Logo({ size = "md", withTagline = true, href = "/", className = "", taglineClassName = "" }: LogoProps) {
  const s = sizes[size];
  const content = (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span
        className={`font-serif font-light uppercase tracking-[var(--tracking-logo)] whitespace-nowrap ${s.word}`}
        style={{ marginRight: "-0.15em" /* compensa el tracking final */ }}
      >
        Maison Poupou
      </span>
      {withTagline && (
        <span
          className={`mt-1.5 font-sans font-normal uppercase tracking-[0.28em] text-ink-soft whitespace-nowrap ${s.tag} ${taglineClassName}`}
          style={{ marginRight: "-0.28em" }}
        >
          Paris • Élevage d’Excellence
        </span>
      )}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="MAISON POUPOU — Inicio" className="inline-block">
      {content}
    </Link>
  );
}
