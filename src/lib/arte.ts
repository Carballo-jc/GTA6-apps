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

export const STICKERS_COMPLICES = ['🤝', '🕶️', '🚗', '💥', '🔥', '🌴', '🎭', '💰'];

// Fondo de ciudad neón (skyline, palmeras y reflejo en el asfalto). Dibujo propio.
export const FONDO_SVG = `
<svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="f-ciudad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3b1260"/><stop offset="1" stop-color="#12062a"/>
    </linearGradient>
    <linearGradient id="f-asfalto" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2a0f4a"/><stop offset="1" stop-color="#0b0418"/>
    </linearGradient>
  </defs>
  <g fill="url(#f-ciudad)" opacity="0.9">
    <rect x="0" y="560" width="34" height="170"/><rect x="30" y="520" width="26" height="210"/>
    <rect x="54" y="580" width="38" height="150"/><rect x="88" y="540" width="24" height="190"/>
    <rect x="296" y="550" width="28" height="180"/><rect x="320" y="500" width="30" height="230"/>
    <rect x="348" y="570" width="26" height="160"/><rect x="370" y="530" width="30" height="200"/>
  </g>
  <g fill="#ffd36e" opacity="0.55">
    <rect x="36" y="540" width="3" height="3"/><rect x="44" y="556" width="3" height="3"/><rect x="38" y="580" width="3" height="3"/>
    <rect x="60" y="600" width="3" height="3"/><rect x="72" y="620" width="3" height="3"/><rect x="94" y="565" width="3" height="3"/>
    <rect x="302" y="575" width="3" height="3"/><rect x="326" y="530" width="3" height="3"/><rect x="336" y="560" width="3" height="3"/>
    <rect x="354" y="600" width="3" height="3"/><rect x="378" y="560" width="3" height="3"/><rect x="384" y="600" width="3" height="3"/>
  </g>
  <rect y="730" width="400" height="70" fill="url(#f-asfalto)"/>
  <g stroke="#ff4fa3" stroke-width="1.5" opacity="0.35"><path d="M20 745h60M310 752h70"/></g>
  <g stroke="#5ef2ff" stroke-width="1.5" opacity="0.3"><path d="M110 760h50M250 768h60"/></g>
  <g fill="#0b0418">
    <path d="M18 730c-2-110 4-200 22-270h5c-14 70-18 160-16 270z"/>
    <path d="M42 458c-22-4-40 6-52 22 18-9 34-11 52-6zM42 458c20-14 40-14 58-4-18 0-36 4-58 10zM42 458c-10-18-8-34 6-44-4 16 0 30 4 44zM42 458c6-14 22-20 36-16-14 4-24 10-32 22z"/>
    <path d="M384 730c2-100-4-180-20-240h-5c12 60 16 140 14 240z"/>
    <path d="M360 488c22-4 40 6 52 22-18-9-34-11-52-6zM360 488c-20-14-40-14-58-4 18 0 36 4 58 10zM360 488c10-18 8-34-6-44 4 16 0 30-4 44z"/>
  </g>
</svg>`;

// Íconos de las herramientas (trazo simple, color heredado).
export const ICONO_CALC = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2.5" width="14" height="19" rx="2.5"/><rect x="8" y="5.5" width="8" height="3.5" rx="0.8"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01"/></svg>`;
export const ICONO_FICHA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="9" cy="10.5" r="2.2"/><path d="M5.5 17c.6-2 2-3 3.5-3s2.9 1 3.5 3M14.5 9.5h4M14.5 13h4"/></svg>`;
export const ICONO_COMPLICES = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M5.5 10h13M6 10c0 2.2 1.6 3.5 3.2 3.5S12 12.2 12 10M12 10c0 2.2 1.2 3.5 2.8 3.5S18 12.2 18 10M9 17c1 .8 2 1.2 3 1.2s2-.4 3-1.2"/></svg>`;
export const ICONO_TAZA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10.5h1.5a2.5 2.5 0 0 1 0 5H16.5"/><path d="M9 3.5c-.8 1 .8 1.8 0 3M12.5 3.5c-.8 1 .8 1.8 0 3"/></svg>`;
