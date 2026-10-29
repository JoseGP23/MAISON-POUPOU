type Block = { kind: "h"; text: string } | { kind: "p"; text: string };

/** Texto simple del panel → bloques: "## " es subtítulo, línea en blanco separa párrafos. */
export function parseRichText(body: string): Block[] {
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .flatMap((chunk): Block[] => {
      if (!chunk.startsWith("## ")) return [{ kind: "p", text: chunk }];
      // Un subtítulo pegado a su párrafo (sin línea en blanco) también vale
      const [first, ...rest] = chunk.split("\n");
      const blocks: Block[] = [{ kind: "h", text: first.slice(3).trim() }];
      if (rest.length) blocks.push({ kind: "p", text: rest.join("\n").trim() });
      return blocks;
    });
}

type RichTextProps = {
  body: string;
  /** "manifesto": subtítulos grandes en serif separados por filetes */
  variant?: "article" | "manifesto";
  /** Letra capital en el primer párrafo (artículos del Journal) */
  dropCap?: boolean;
  className?: string;
};

export function RichText({ body, variant = "article", dropCap = false, className = "" }: RichTextProps) {
  const blocks = parseRichText(body);
  const firstP = blocks.findIndex((b) => b.kind === "p");
  return (
    <div className={`flex flex-col ${className}`}>
      {blocks.map((b, i) => {
        if (b.kind === "h") {
          return variant === "manifesto" ? (
            <h2
              key={i}
              data-reveal
              className="mt-16 border-t border-givre pt-8 font-serif text-[1.75rem] font-light leading-tight first:mt-0 md:text-[2.25rem]"
            >
              {b.text}
            </h2>
          ) : (
            <h2 key={i} className="mt-12 mb-4 font-serif text-[1.625rem] leading-tight first:mt-0 md:text-[1.875rem]">
              {b.text}
            </h2>
          );
        }
        const cap = dropCap && i === firstP;
        return (
          <p
            key={i}
            className={[
              "mb-5 whitespace-pre-line text-[1rem] leading-[1.8] text-ink/90 md:text-[1.0625rem]",
              variant === "manifesto" ? "mt-4 max-w-xl text-ink-soft" : "",
              cap
                ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[4.25rem] first-letter:leading-[0.8] first-letter:text-ocre"
                : "",
            ].join(" ")}
          >
            {b.text}
          </p>
        );
      })}
    </div>
  );
}
