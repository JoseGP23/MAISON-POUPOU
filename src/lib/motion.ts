"use client";

import { useEffect, useState } from "react";

/*
  Utilidades de movimiento estilo Apple:
  - Resortes con los dos parámetros que usa Apple (damping + response), que
    siempre parten del valor actual y conservan la velocidad: nunca saltan.
  - Un solo bucle por componente con requestAnimationFrame, que escribe
    transform/opacity directo al DOM (sin re-render de React por cuadro).
*/

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 0 → 1 suave entre edge0 y edge1 (Hermite). */
export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export type Spring = {
  value: number;
  velocity: number;
  target: number;
  step: (dt: number) => void;
  atRest: () => boolean;
};

/**
 * Resorte con damping (1 = sin rebote) y response (segundos para llegar).
 * Valores de Apple: mover 1.0/0.4 · rotación 0.8/0.4 · drawer 0.8/0.3.
 */
export function createSpring(initial: number, { damping = 1, response = 0.4 } = {}): Spring {
  const stiffness = (2 * Math.PI / response) ** 2;
  const friction = (4 * Math.PI * damping) / response;
  const s: Spring = {
    value: initial,
    velocity: 0,
    target: initial,
    step(dt) {
      // Sub-pasos fijos: estable aunque un cuadro llegue tarde
      let remaining = Math.min(dt, 1 / 20);
      while (remaining > 0) {
        const h = Math.min(remaining, 1 / 240);
        const accel = -stiffness * (s.value - s.target) - friction * s.velocity;
        s.velocity += accel * h;
        s.value += s.velocity * h;
        remaining -= h;
      }
    },
    atRest() {
      return Math.abs(s.value - s.target) < 1e-4 && Math.abs(s.velocity) < 1e-3;
    },
  };
  return s;
}

/**
 * Cambio de pose en relevo: la capa i0 se va antes de que llegue la siguiente
 * (solape mínimo y desenfocado en el punto medio). No se leen
 * como dos gallinas a la vez.
 */
export function swapLayers(layers: HTMLElement[], i0: number, e: number, maxBlur = 4) {
  // Solape mínimo (y desenfocado) para que, si el usuario se detiene justo
  // en el medio, la gallina no desaparezca del todo
  const out = 1 - smoothstep(0.35, 0.6, e);
  const inn = smoothstep(0.4, 0.65, e);
  const blur = maxBlur * clamp(1 - Math.abs(e - 0.5) / 0.2);
  layers.forEach((layer, i) => {
    const op = i === i0 ? out : i === i0 + 1 ? inn : 0;
    layer.style.opacity = String(op);
    layer.style.visibility = op <= 0 ? "hidden" : "visible";
    layer.style.filter = op > 0 && blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";
  });
}

/** Bucle de animación que solo corre mientras `active()` sea verdadero. */
export function startLoop(frame: (dt: number, time: number) => void) {
  let id = 0;
  let last = performance.now();
  const tick = (now: number) => {
    const dt = Math.min((now - last) / 1000, 1 / 20);
    last = now;
    frame(dt, now / 1000);
    id = requestAnimationFrame(tick);
  };
  id = requestAnimationFrame((now) => {
    last = now;
    tick(now);
  });
  return () => cancelAnimationFrame(id);
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

/**
 * Inclinación con el cursor (escritorio) o el giroscopio (Android; iOS pide
 * permiso explícito y no lo forzamos). Devuelve un objeto mutable en -1…1.
 */
export function trackTilt(target: HTMLElement) {
  const tilt = { x: 0, y: 0 };
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const onPointer = (e: PointerEvent) => {
    const r = target.getBoundingClientRect();
    tilt.x = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
    tilt.y = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
  };
  const onLeave = () => {
    tilt.x = 0;
    tilt.y = 0;
  };
  const onOrientation = (e: DeviceOrientationEvent) => {
    if (e.gamma == null || e.beta == null) return;
    tilt.x = clamp(e.gamma / 25, -1, 1);
    tilt.y = clamp((e.beta - 45) / 25, -1, 1);
  };

  if (fine) {
    target.addEventListener("pointermove", onPointer);
    target.addEventListener("pointerleave", onLeave);
  } else {
    window.addEventListener("deviceorientation", onOrientation);
  }
  return {
    tilt,
    dispose() {
      target.removeEventListener("pointermove", onPointer);
      target.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("deviceorientation", onOrientation);
    },
  };
}

/** Observa si el elemento está (cerca de estar) en pantalla. */
export function watchVisibility(el: Element, onChange: (visible: boolean) => void, margin = "20% 0px") {
  const io = new IntersectionObserver(([entry]) => onChange(entry.isIntersecting), { rootMargin: margin });
  io.observe(el);
  return () => io.disconnect();
}
