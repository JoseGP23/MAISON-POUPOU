import Link from "next/link";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: { href: string; label: string };
  align?: "center" | "left";
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  align = "center",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div data-reveal className={`mb-10 flex flex-col gap-4 md:mb-14 ${centered ? "items-center text-center" : "items-start"}`}>
      {eyebrow && <p className="caps text-ocre">{eyebrow}</p>}
      <Tag className="font-serif text-title font-light">{title}</Tag>
      {intro && <p className="max-w-xl text-base text-ink-soft">{intro}</p>}
      {action && (
        <Link href={action.href} className="caps link-underline mt-1 pb-1 text-ink">
          {action.label}
        </Link>
      )}
    </div>
  );
}
