// Ilustración propia (sin assets de terceros): atardecer, palmeras y grilla neón.
export const ESCENA_SVG = `
<svg class="card-escena" viewBox="0 0 300 150" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
  <defs>
    <linearGradient id="sol-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffd36e"/><stop offset="1" stop-color="#ff4fa3"/>
    </linearGradient>
    <mask id="sol-m"><rect width="300" height="150" fill="#fff"/>
      <rect y="62" width="300" height="2.5"/><rect y="70" width="300" height="3.5"/><rect y="79" width="300" height="4.5"/>
    </mask>
  </defs>
  <circle cx="150" cy="82" r="46" fill="url(#sol-g)" mask="url(#sol-m)"/>
  <rect y="100" width="300" height="50" fill="#1a0b2e"/>
  <g stroke="#5ef2ff" stroke-width="0.8" opacity="0.8" fill="none">
    <path d="M0 100H300M0 112H300M0 128H300M0 150H300"/>
    <path d="M150 100L-40 150M150 100L40 150M150 100L110 150M150 100L190 150M150 100L260 150M150 100L340 150"/>
  </g>
  <g fill="#0b0418">
    <path d="M38 100c0-30 2-50 6-70h3c-2 20-4 40-4 70z"/>
    <path d="M45 30c-14-2-26 4-34 14 12-6 22-8 34-4zM45 30c12-8 26-8 38-2-12 0-24 2-38 6zM45 30c-6-12-4-22 4-28-2 10 0 18 2 28zM45 30c4-8 14-12 22-10-8 2-14 6-20 14z"/>
    <path d="M258 100c0-24 2-42 5-58h3c-2 16-3 34-3 58z"/>
    <path d="M264 42c-12-2-22 3-29 12 10-5 18-6 29-3zM264 42c10-7 22-7 32-2-10 0-20 2-32 6zM264 42c-5-10-3-18 4-23-2 8 0 15 2 23z"/>
  </g>
</svg>`;

export const STICKERS_LABURO = ['🎮', '🕶️', '🌴', '🚗', '💸', '🔥', '🏖️', '😵‍💫', '🧉', '🍖'];
export const STICKERS_FICHA = ['🚨', '🕶️', '🌴', '🚓', '🔦', '🧢', '💼', '🌅'];

export function elegir<T>(lista: T[], azar: () => number): T {
  return lista[Math.floor(azar() * lista.length)];
}
