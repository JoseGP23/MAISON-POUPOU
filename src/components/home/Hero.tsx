"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import type { HeroScene } from "@/lib/hero";
import {
  clamp,
  createSpring,
  swapLayers,
  lerp,
  smoothstep,
  startLoop,
  trackTilt,
  useReducedMotion,
  watchVisibility,
} from "@/lib/motion";

/*
  Hero estilo página de producto de Apple.

  La sección mide varias pantallas y su "escenario" queda fijo (sticky). El
  scroll no se intercepta: su posición mueve una línea de tiempo continua
  (0 → 3, una unidad por escena) suavizada con un resorte, así que el usuario
  puede frenar, volver o soltar a mitad de camino en cualquier momento.

  La gallina es la protagonista: cambia de pose, gira en 3D (perspectiva),
  da un pequeño salto entre poses, proyecta sombra en el suelo y responde al
  cursor o al giroscopio. Fondo, gallina y texto se mueven a ritmos distintos.
  El titular deja una estela proporcional a la velocidad del scroll.
*/

type Pose = { x: number; y: number; scale: number; ry: number; rz: number; air: number };

// x e y en fracción del escenario, rotaciones en grados, air = 1 si va en el aire
const POSES_MOBILE: Pose[] = [
  { x: 0, y: -0.05, scale: 1, ry: -8, rz: -4, air: 1 },
  { x: 0.04, y: 0, scale: 0.94, ry: 10, rz: 0, air: 0 },
  { x: -0.03, y: 0.01, scale: 0.92, ry: -6, rz: 0, air: 0 },
];
const POSES_DESKTOP: Pose[] = [
  { x: 0.03, y: -0.05, scale: 1, ry: -10, rz: -4, air: 1 },
  { x: 0.1, y: 0, scale: 0.9, ry: 12, rz: 0, air: 0 },
  { x: -0.02, y: 0.01, scale: 0.94, ry: -8, rz: 0, air: 0 },
];
const TRAIL = [0, 1, 2];

/** Corta el titular en la coma ("L’Art de Vivre, / réinventé"): así nunca queda "L’Art de / Vivre". */
function TitleLines({ text }: { text: string }) {
  const [first, ...rest] = text.split(", ");
  if (!rest.length) return text;
  return (
    <>
      {first},<br />
      {rest.join(", ")}
    </>
  );
}

function mix(a: Pose, b: Pose, t: number): Pose {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    scale: lerp(a.scale, b.scale, t),
    ry: lerp(a.ry, b.ry, t),
    rz: lerp(a.rz, b.rz, t),
    air: lerp(a.air, b.air, t),
  };
}

export function Hero({ scenes }: { scenes: HeroScene[] }) {
  const reduced = useReducedMotion();

  if (reduced) return <StackedHero scenes={scenes} />;
  return <StoryHero scenes={scenes} />;
}

function StoryHero({ scenes }: { scenes: HeroScene[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const last = scenes.length - 1;
  const henScenes = scenes.filter((sc): sc is HeroScene & { subject: NonNullable<HeroScene["subject"]> } => !!sc.subject);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const q = <T extends HTMLElement>(sel: string) => Array.from(stage.querySelectorAll<T>(sel));
    const bgs = q("[data-bg]");
    const poses = q("[data-pose]");
    const henLast = poses.length - 1;
    const texts = q("[data-text]");
    const trails = texts.map((t) => Array.from(t.querySelectorAll<HTMLElement>("[data-trail]")));
    const hen = stage.querySelector<HTMLElement>("[data-hen]")!;
    const shadow = stage.querySelector<HTMLElement>("[data-shadow]")!;
    const cue = stage.querySelector<HTMLElement>("[data-cue]");

    // Línea de tiempo suavizada. En táctil casi pegada al dedo (el scroll del
    // celular ya trae su propia inercia; sumarle un resorte lento se siente
    // "flotante"); con rueda de ratón un poco más de suavizado.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const progress = createSpring(0, { damping: 1, response: coarse ? 0.16 : 0.35 });
    // Rotación con el cursor (Apple: rotación = damping 0.8, response 0.4)
    const tiltX = createSpring(0, { damping: 0.8, response: 0.4 });
    const tiltY = createSpring(0, { damping: 0.8, response: 0.4 });
    // Entrada al cargar: la gallina sube y aparece
    const intro = createSpring(0, { damping: 1, response: 0.6 });
    intro.target = 1;

    const tilt = trackTilt(stage);
    const desktop = window.matchMedia("(min-width: 768px)");
    let lastActive = -1;

    const readTarget = () => {
      const vh = stage.clientHeight;
      const scrolled = -section.getBoundingClientRect().top;
      return clamp(scrolled / vh, 0, last);
    };
    progress.value = progress.target = readTarget();

    const frame = (dt: number, time: number) => {
      progress.target = readTarget();
      tiltX.target = tilt.tilt.x;
      tiltY.target = tilt.tilt.y;
      progress.step(dt);
      tiltX.step(dt);
      tiltY.step(dt);
      intro.step(dt);

      const s = progress.value;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const tx = tiltX.value;
      const ty = tiltY.value;
      const inn = clamp(intro.value, 0, 1.2);

      // --- Fondos: cada uno cubre al anterior con un leve acercamiento de cámara
      bgs.forEach((bg, i) => {
        const op = i === 0 ? 1 : smoothstep(i - 0.7, i - 0.25, s);
        const covered = i < last && smoothstep(i + 0.3, i + 0.75, s) >= 1;
        const scale = 1.1 - 0.1 * smoothstep(i - 0.7, i + 0.4, s);
        bg.style.opacity = String(op);
        bg.style.visibility = op <= 0 || covered ? "hidden" : "visible";
        bg.style.transform = `translate3d(${-tx * 10}px, ${-ty * 6}px, 0) scale(${scale})`;
      });

      // --- Gallina: interpola entre poses con una pausa en cada escena. Las
      // escenas sin gallina van al final: ahí sale de cuadro y queda el fondo.
      const table = desktop.matches ? POSES_DESKTOP : POSES_MOBILE;
      const sh = Math.min(s, henLast);
      const i0 = Math.min(Math.floor(sh), henLast - 1);
      // Pausa amplia en cada escena: la gallina solo cambia en el tramo central
      const e = smoothstep(0.25, 0.75, sh - i0);
      const exit = smoothstep(henLast + 0.15, henLast + 0.6, s);
      const p = mix(table[i0], table[i0 + 1], e);
      const hop = Math.sin(Math.PI * e); // pequeño salto entre poses
      const bob = Math.sin(time * ((2 * Math.PI) / 3.2)) * (3 + p.air * 7);

      const x = p.x * w + tx * 16;
      const y = p.y * h - hop * h * 0.05 + bob + (1 - inn) * 70 + exit * h * 0.12;
      // En el cambio de pose se encoge un poco: se lee como un salto, no como
      // dos gallinas superpuestas
      const scale = p.scale * (1 - 0.08 * hop) * (0.94 + 0.06 * Math.min(inn, 1)) * (1 - 0.06 * exit);
      const ry = p.ry + tx * 12;
      const rx = -ty * 7;
      hen.style.transform =
        `translate3d(${x}px, ${y}px, 0) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${p.rz}deg) scale(${scale})`;
      const henAlpha = clamp(inn) * (1 - exit);
      hen.style.opacity = String(henAlpha);
      hen.style.visibility = henAlpha < 0.01 ? "hidden" : "visible";

      // Sin desenfoque en táctil: blur sobre dos PNG grandes cuesta caro por cuadro
      swapLayers(poses, i0, e, coarse ? 0 : 4);

      // Sombra en el suelo: más pequeña y tenue cuanto más alto está el ave
      const lift = p.air * 0.9 + hop * 0.6 + Math.max(0, -bob) / 40;
      shadow.style.transform = `translate3d(${x}px, 0, 0) scale(${scale * (1 - 0.45 * lift)}, 1)`;
      shadow.style.opacity = String(clamp(0.42 - 0.26 * lift) * henAlpha);

      // --- Textos: aparecen en su escena y suben al pasar; estela según velocidad
      // La estela solo en escritorio: en el celular las copias del titular se
      // leían como texto repetido.
      const v = coarse ? 0 : progress.velocity;
      const trailOffset = clamp(v * 30, -42, 42);
      texts.forEach((text, i) => {
        const d = s - i;
        let alpha = 1 - smoothstep(0.18, 0.42, Math.abs(d));
        if (i === 0) alpha *= smoothstep(0.15, 1, inn);
        text.style.opacity = String(alpha);
        text.style.visibility = alpha < 0.01 ? "hidden" : "visible";
        text.style.transform = `translate3d(${-tx * 6}px, ${-d * 70 + (i === 0 ? (1 - Math.min(inn, 1)) * 24 : 0)}px, 0)`;
        trails[i].forEach((copy, k) => {
          copy.style.transform = `translate3d(0, ${trailOffset * (k + 1) * 0.6}px, 0)`;
          copy.style.opacity = String(Math.min(0.28, Math.abs(v) * 0.35) * (1 - k * 0.35) * alpha);
        });
      });

      if (cue) cue.style.opacity = String((1 - smoothstep(0.02, 0.2, s)) * clamp(inn));

      const nowActive = Math.round(s);
      if (nowActive !== lastActive) {
        lastActive = nowActive;
        setActive(nowActive);
      }
    };

    // Solo animamos mientras el hero está cerca de la pantalla
    let stop: (() => void) | null = null;
    const unwatch = watchVisibility(section, (visible) => {
      if (visible && !stop) stop = startLoop(frame);
      if (!visible && stop) {
        stop();
        stop = null;
      }
    });

    return () => {
      unwatch();
      stop?.();
      tilt.dispose();
    };
  }, [last]);

  const goTo = (i: number) => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const top = section.getBoundingClientRect().top + window.scrollY + i * stage.clientHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Presentación de MAISON POUPOU"
      className="hero-story relative"
      // El escenario arranca debajo del header (translúcido),
      // así la primera escena ocupa la pantalla completa desde el inicio.
      style={{
        height: `calc(100svh * ${last + 1.4})`,
        marginTop: "calc(-1 * (var(--header-h)))",
      }}
    >
      {/* Puntos de anclaje para un imán suave (proximity) en cada escena */}
      {scenes.slice(1).map((scene, i) => (
        <div key={scene.id} aria-hidden className="snap-anchor absolute inset-x-0 h-px" style={{ top: `${(i + 1) * 100}svh` }} />
      ))}

      <div ref={stageRef} className="hero-stage sticky top-0 h-svh overflow-hidden bg-brume">
        {/* Capa lejana: fondos */}
        {scenes.map((scene, i) => (
          <div key={scene.id} data-bg className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
            <Image
              src={scene.background.src}
              alt={scene.background.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: scene.background.position }}
            />
          </div>
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(246,245,241,0.85)_0%,rgba(246,245,241,0.15)_32%,rgba(246,245,241,0)_50%,rgba(246,245,241,0.9)_100%)] md:bg-[linear-gradient(to_bottom,rgba(246,245,241,0.7)_0%,rgba(246,245,241,0)_40%,rgba(246,245,241,0)_52%,rgba(246,245,241,0.92)_100%)]"
        />

        {/* Capa media: la gallina, con perspectiva 3D y sombra en el suelo */}
        <div className="hero-perspective pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 bottom-[20svh] mx-auto h-[44svh] w-[min(84vw,37svh)] md:bottom-[7svh] md:h-[70svh] md:w-[59svh]">
            <div
              data-shadow
              aria-hidden
              className="absolute -bottom-[3%] left-[12%] right-[12%] h-[7%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(31,53,80,0.55),rgba(31,53,80,0))] opacity-0 will-change-transform"
            />
            <div data-hen className="absolute inset-0 will-change-transform" role="img" aria-label="La gallina de MAISON POUPOU">
              {henScenes.map((scene, i) => (
                <div key={scene.id} data-pose className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
                  <Image
                    src={scene.subject.src}
                    alt=""
                    fill
                    priority={i === 0}
                    loading={i === 0 ? undefined : "eager"}
                    sizes="(min-width: 768px) 45vw, 88vw"
                    className="object-contain object-bottom drop-shadow-[0_24px_30px_rgba(31,53,80,0.14)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capa cercana: textos de cada escena */}
        <div className="absolute inset-0 mx-auto max-w-[1320px]">
          {scenes.map((scene, i) => {
            const Heading = i === 0 ? "h1" : "h2";
            return (
              <div key={scene.id} data-text className="absolute inset-0">
                <div className="absolute inset-x-5 top-[calc(var(--header-h)+3svh)] md:inset-x-auto md:left-10 md:top-[calc(var(--header-h)+6svh)] md:max-w-[44%]">
                  <Heading className="relative font-serif text-display font-light tracking-[-0.01em] text-ink">
                    <span className="relative block"><TitleLines text={scene.title} /></span>
                    {TRAIL.map((k) => (
                      <span key={k} data-trail aria-hidden className="pointer-events-none absolute inset-0 block opacity-0">
                        <TitleLines text={scene.title} />
                      </span>
                    ))}
                  </Heading>
                </div>
                <div className="absolute inset-x-5 bottom-[5svh] flex flex-col items-start gap-5 md:inset-x-auto md:bottom-[12svh] md:right-24 md:max-w-[300px]">
                  <p className="max-w-[34ch] text-base leading-relaxed text-ink">{scene.text}</p>
                  {scene.cta && <ButtonLink href={scene.cta.href}>{scene.cta.label}</ButtonLink>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicación inicial */}
        <div data-cue aria-hidden className="caps pointer-events-none absolute bottom-[1.5svh] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.75rem] text-ink-soft opacity-0 md:flex">
          Desliza
          <span className="h-8 w-px bg-ink/40" />
        </div>

        {/* Progreso: también sirve para saltar a una escena */}
        <nav aria-label="Escenas" className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col md:flex">
          {scenes.map((scene, i) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la escena ${i + 1}: ${scene.title}`}
              aria-current={i === active ? "step" : undefined}
              className="group flex h-9 w-11 items-center justify-end pr-3"
            >
              <span
                className={`h-px w-8 origin-right bg-ink transition-[scale,opacity] duration-300 ease-out ${i === active ? "scale-x-100 opacity-100" : "scale-x-50 opacity-40 group-hover:opacity-80"}`}
              />
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}

/** prefers-reduced-motion: escenas apiladas, sin parallax, giro ni estela. */
function StackedHero({ scenes }: { scenes: HeroScene[] }) {
  return (
    <section aria-label="Presentación de MAISON POUPOU">
      {scenes.map((scene, i) => {
        const Heading = i === 0 ? "h1" : "h2";
        return (
          <div key={scene.id} className="relative min-h-[var(--hero-h)] overflow-hidden bg-brume">
            <Image src={scene.background.src} alt="" fill sizes="100vw" priority={i === 0} className="object-cover" style={{ objectPosition: scene.background.position }} />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(246,245,241,0.85)_0%,rgba(246,245,241,0)_40%,rgba(246,245,241,0)_55%,rgba(246,245,241,0.9)_100%)]" />
            {scene.subject && (
              <div className="absolute inset-x-0 bottom-[16%] mx-auto h-[48%] w-[min(80vw,38svh)] md:bottom-[6%] md:h-[66%] md:w-[52svh]">
                <Image src={scene.subject.src} alt={scene.subject.alt} fill sizes="(min-width: 768px) 40vw, 80vw" className="object-contain object-bottom" />
              </div>
            )}
            <div className="container-editorial relative flex min-h-[var(--hero-h)] flex-col justify-between py-10 md:py-16">
              <Heading className="max-w-2xl font-serif text-display font-light text-ink"><TitleLines text={scene.title} /></Heading>
              <div className="flex max-w-[300px] flex-col items-start gap-5 md:self-end">
                <p className="text-base leading-relaxed text-ink">{scene.text}</p>
                {scene.cta && <ButtonLink href={scene.cta.href}>{scene.cta.label}</ButtonLink>}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
