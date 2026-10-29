import type { SVGProps } from "react";

// Iconos de trazo fino (1.25) para mantener la ligereza editorial.
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 22, ...props }: IconProps): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

export const MenuIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h11" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h15M14 7l5 5-5 5" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);

export const TikTokIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 3.5v11.25a3.75 3.75 0 11-3.75-3.75" />
    <path d="M14 3.5c.4 2.6 2.2 4.4 5 4.7" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 20l1.2-4.2A8.2 8.2 0 1112 20.2a8.1 8.1 0 01-3.9-1L4 20z" />
    <path d="M9 8.6c.2 2.9 2.5 5.3 5.5 5.7l.9-1.3-1.6-.9-.7.6c-.9-.4-1.7-1.2-2.1-2.1l.6-.7-.9-1.6-1.3.9z" />
  </svg>
);

/** Silueta simple de gallina para placeholders mientras no haya fotos. */
export const HenSilhouette = ({ size = 120, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="currentColor"
    aria-hidden
    {...props}
  >
    <path d="M38 22c3-6 9-8 13-4 2-5 9-5 10 1 5-1 7 4 4 8 4 3 4 9 1 13l9 3c-2 3-5 4-8 4 2 6 2 12 0 18 8-6 13-17 15-31 9 8 13 22 11 35-2 18-17 31-37 31-19 0-33-12-33-29 0-12 6-21 15-27-4-5-4-13 0-22z" />
    <path d="M47 99h4v9h6v3H45v-3h2v-9zM63 99h4v9h6v3H61v-3h2v-9z" />
  </svg>
);
