import type { CSSProperties } from "react";
import { Hero } from "@/components/home/Hero";
import { ButtonLink } from "@/components/ui/Button";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { heroScenes } from "@/lib/hero";
import { signaturePieces, whatsappUrl } from "@/lib/site";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

// Los tres pilares de la marca (CLAUDE.md §1)
const pillars = [
  {
    title: "La arquitectura",
    text: "Gallineros y mobiliario de madera noble, pensados como pequeñas arquitecturas para el jardín y la casa.",
  },
  {
    title: "La nutrición",
    text: "Recetas orgánicas de fincas de Cundinamarca, sin conservantes: nutrición gourmet para cada especie.",
  },
  {
    title: "El interior",
    text: "Lino, cerámica y latón: piezas que conviven con tus muebles en lugar de esconderse de ellos.",
  },
];

const steps = [
  { title: "Escríbenos", text: "Cuéntanos qué buscas y para quién: tus gallinas, tu perro, tu gato." },
  { title: "Te asesoramos", text: "Te enviamos fotos, medidas, precios y disponibilidad, y resolvemos tus dudas." },
  { title: "Lo llevamos a casa", text: "Coordinamos contigo el pago y la entrega, en Bogotá o en cualquier ciudad del país." },
];

const promises = [
  { title: "Envíos nacionales", text: "A toda Colombia" },
  { title: "Hecho a mano", text: "Talleres colombianos" },
  { title: "Garantía", text: "1 año en gallineros" },
  { title: "Asesoría", text: "Personal, sin bots" },
];

const materials = ["Madera sostenible", "Lino lavado a la piedra", "Cerámica de Ráquira", "Cuero vegano", "Latón macizo"];

export default function Home() {
  const [hero, ...pieces] = signaturePieces;

  return (
    <>
      <Hero scenes={heroScenes} />

      {/* Nuestra visión */}
      <section id="vision" className="container-editorial py-20 md:py-32" aria-labelledby="vision-title">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          {/* El lema es la pieza tipográfica de la página: siempre en itálica completa */}
          <h2 id="vision-title" data-reveal className="font-serif text-display font-light italic">
            Vida de gallina, pero a la francesa.
          </h2>
          <p data-reveal style={delay(120)} className="max-w-2xl text-[1.0625rem] text-ink-soft">
            Una casa nacida en Bogotá con alma de taller parisino. Creemos que el bienestar animal es el verdadero
            lujo, y que lo cotidiano —un gallinero, un comedero, una cama— merece belleza.
          </p>
        </div>

        <ul className="mt-16 grid gap-10 border-t border-givre pt-12 md:mt-20 md:grid-cols-3 md:gap-12">
          {pillars.map((p, i) => (
            <li key={p.title} data-reveal style={delay(i * 80)} className="flex flex-col gap-3">
              <h3 className="font-serif text-[1.75rem] font-light leading-tight">{p.title}</h3>
              <p className="text-base text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-12 flex justify-center">
          <ButtonLink href="/our-story" variant="link" icon={<ArrowRightIcon size={16} />}>
            Leer nuestra historia
          </ButtonLink>
        </div>
      </section>

      {/* Piezas insignia: vitrina sin precios; todo se consulta por WhatsApp */}
      <section id="signature" className="bg-brume py-20 md:py-28" aria-labelledby="signature-title">
        <div className="container-editorial">
          <SectionHeading
            title={<span id="signature-title">Piezas insignia</span>}
            intro="Una selección de nuestras piezas más queridas. El catálogo completo, los precios y la disponibilidad te los compartimos por WhatsApp."
          />

          {/* Pieza destacada */}
          <article className="grid items-center gap-8 md:grid-cols-[7fr_5fr] md:gap-16">
            <div data-reveal="mask">
              <EditorialImage
                src={hero.image}
                alt={hero.name}
                label={hero.name}
                ratio="landscape"
                parallax
                sizes="(min-width: 768px) 58vw, 100vw"
              />
            </div>
            <div data-reveal style={delay(120)} className="flex flex-col gap-4">
              <p className="label">{hero.line}</p>
              <h3 className="font-serif text-title font-light text-balance">{hero.name}</h3>
              <p className="text-base text-ink-soft">{hero.text}</p>
            </div>
          </article>

          <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-24 md:gap-x-6 lg:grid-cols-4">
            {pieces.map((p, i) => (
              <li key={p.id} data-reveal style={delay(i * 70)} className="flex flex-col gap-4">
                <EditorialImage src={p.image} alt={p.name} label={p.name} ratio="portrait" />
                <div className="flex flex-col gap-1.5">
                  <p className="label">{p.line}</p>
                  <h3 className="font-serif text-[1.25rem] leading-tight text-balance md:text-[1.375rem]">{p.name}</h3>
                  <p className="text-sm text-ink-soft">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-16 flex flex-col items-center gap-4 text-center md:mt-20">
            <ButtonLink href={whatsappUrl()} external icon={<WhatsAppIcon size={18} />}>
              Ver el catálogo por WhatsApp
            </ButtonLink>
            <p className="text-sm text-ink-soft">Te respondemos personalmente, con fotos, tallas y precios.</p>
          </div>
        </div>
      </section>

      {/* El taller */}
      <section id="atelier" className="container-editorial py-20 md:py-28" aria-labelledby="atelier-title">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div data-reveal="mask">
            <EditorialImage
              src="/images/coleccion-atelier.jpg"
              alt="Taller artesanal de MAISON POUPOU"
              label="El taller"
              ratio="portrait"
              tone="brume"
              parallax
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div data-reveal style={delay(120)} className="flex flex-col items-start gap-5">
            <h2 id="atelier-title" className="font-serif text-title font-light">
              Hecho a mano, materiales nobles
            </h2>
            <p className="max-w-md text-base text-ink-soft">
              Cada pieza nace en pequeños talleres de Bogotá, Boyacá y Ráquira. Producimos poco, con calma y para que
              dure: nuestros gallineros tienen un año de garantía y todo admite reparación.
            </p>
            <ul className="mt-2 flex w-full max-w-md flex-col border-t border-givre">
              {materials.map((m) => (
                <li key={m} className="border-b border-givre py-3 font-serif text-[1.25rem] italic">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cómo pedir: la venta vive en WhatsApp, así que se explica en tres pasos */}
      <section id="commander" className="bg-brume py-20 md:py-28" aria-labelledby="commander-title">
        <div className="container-editorial">
          <SectionHeading
            title={<span id="commander-title">Todo pasa por WhatsApp</span>}
            intro="Sin carritos ni formularios: una conversación con nuestro equipo, como en una boutique de barrio en París."
          />

          {/* En el celular el número va al lado del título; en escritorio, encima */}
          <ol className="grid gap-8 md:grid-cols-3 md:gap-12">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={delay(i * 80)}
                className="grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-2 border-t border-ink/15 pt-5 md:grid-cols-1 md:gap-3 md:pt-6"
              >
                <span aria-hidden className="row-span-2 font-serif text-[2.5rem] font-light italic leading-none text-ocre md:row-span-1">
                  {i + 1}
                </span>
                <h3 className="font-serif text-[1.625rem] font-light leading-tight">{s.title}</h3>
                <p className="text-base text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>

          <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-6 border-y border-ink/15 py-8 md:mt-20 md:grid-cols-4">
            {promises.map((p) => (
              <li key={p.title} className="flex flex-col gap-1 text-center">
                <span className="font-serif text-[1.25rem] leading-tight">{p.title}</span>
                <span className="text-sm text-ink-soft">{p.text}</span>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-12 flex justify-center">
            <ButtonLink href={whatsappUrl()} external icon={<WhatsAppIcon size={18} />}>
              Empezar la conversación
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
