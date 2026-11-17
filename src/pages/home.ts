import type { Pagina } from '../router';
import { FECHA_LANZAMIENTO } from '../config/site';

const dos = (n: number): string => String(n).padStart(2, '0');

export const home: Pagina = (el) => {
  el.innerHTML = `
    <section class="hero">
      <div class="sol"></div>
      <h1 class="titulo-neon">Hype GTA 6</h1>
      <div class="cuenta" id="cuenta" aria-live="off"></div>
      <p class="sub">Tres herramientas de 10 segundos para compartir con tus amigos.</p>
      <nav class="menu">
        <a data-link href="/laburo" class="tarjeta-link rosa">
          <strong>¿Cuántas horas de laburo te cuesta GTA 6?</strong>
          <span>Calculá y compartí el resultado</span>
        </a>
        <a data-link href="/ficha" class="tarjeta-link celeste">
          <strong>Tu ficha criminal en Vice City</strong>
          <span>Mismo nombre, misma ficha</span>
        </a>
        <a data-link href="/complices" class="tarjeta-link rosa">
          <strong>¿Qué tan buenos cómplices son?</strong>
          <span>Poné dos nombres y mirá el porcentaje</span>
        </a>
      </nav>
    </section>
  `;

  const cuenta = el.querySelector('#cuenta') as HTMLElement;
  const destino = new Date(FECHA_LANZAMIENTO).getTime();

  const actualizar = (): void => {
    // El router vacía el contenedor al navegar: si ya no estamos en la home, cortamos el timer.
    if (!cuenta.isConnected) {
      clearInterval(timer);
      return;
    }
    const resto = destino - Date.now();
    if (!(resto > 0)) {
      cuenta.innerHTML = '<p class="cuenta-fin">¡Ya salió GTA 6!</p>';
      return;
    }
    const s = Math.floor(resto / 1000);
    const celdas: [string, number][] = [
      ['días', Math.floor(s / 86400)],
      ['horas', Math.floor((s % 86400) / 3600)],
      ['min', Math.floor((s % 3600) / 60)],
      ['seg', s % 60],
    ];
    cuenta.innerHTML =
      '<p class="cuenta-titulo">Faltan para el lanzamiento</p><div class="cuenta-celdas">' +
      celdas.map(([u, v]) => `<div class="celda"><strong>${dos(v)}</strong><span>${u}</span></div>`).join('') +
      '</div>';
  };

  const timer = window.setInterval(actualizar, 1000);
  actualizar();
};
