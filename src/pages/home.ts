import type { Pagina } from '../router';

export const home: Pagina = (el) => {
  el.innerHTML = `
    <section class="hero">
      <div class="sol"></div>
      <h1 class="titulo-neon">Hype GTA 6</h1>
      <p class="sub">Dos herramientas de 10 segundos para compartir con tus amigos.</p>
      <nav class="menu">
        <a data-link href="/laburo" class="tarjeta-link rosa">
          <strong>¿Cuántas horas de laburo te cuesta GTA 6?</strong>
          <span>Calculá y compartí el resultado</span>
        </a>
        <a data-link href="/ficha" class="tarjeta-link celeste">
          <strong>Tu ficha criminal en Vice City</strong>
          <span>Mismo nombre, misma ficha</span>
        </a>
      </nav>
    </section>
  `;
};
