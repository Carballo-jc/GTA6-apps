import type { Pagina } from '../router';
import { CAFECITO_URL, FECHA_LANZAMIENTO } from '../config/site';
import { ICONO_CALC, ICONO_COMPLICES, ICONO_FICHA, ICONO_TAZA } from '../lib/arte';

const dos = (n: number): string => String(n).padStart(2, '0');
const flecha = '<span class="flecha" aria-hidden="true">›</span>';

export const home: Pagina = (el) => {
  const cafecitoTexto = CAFECITO_URL.replace(/^https?:\/\//, '');
  el.innerHTML = `
    <section class="hero">
      <div class="sol"></div>
      <h1 class="logo"><span class="logo-hype">Hype</span> <span class="logo-gta">GTA 6</span></h1>
      <div class="cuenta" id="cuenta" aria-live="off"></div>
      <p class="sub">Tres herramientas de <strong>10 segundos</strong> para compartir con tus amigos.</p>
      <nav class="menu">
        <a data-link href="/laburo" class="herramienta h-rosa">
          <span class="h-icono">${ICONO_CALC}</span>
          <span class="h-texto"><strong>¿Cuántas horas de laburo te cuesta GTA 6?</strong><span>Calculá y compartí el resultado</span></span>
          ${flecha}
        </a>
        <a data-link href="/ficha" class="herramienta h-celeste">
          <span class="h-icono">${ICONO_FICHA}</span>
          <span class="h-texto"><strong>Tu ficha criminal en Vice City</strong><span>Mismo nombre, misma ficha</span></span>
          ${flecha}
        </a>
        <a data-link href="/complices" class="herramienta h-violeta">
          <span class="h-icono">${ICONO_COMPLICES}</span>
          <span class="h-texto"><strong>¿Qué tan buenos cómplices son?</strong><span>Poné dos nombres y mirá el porcentaje</span></span>
          ${flecha}
        </a>
      </nav>
      <aside class="cafe">
        <p class="cafe-pregunta">¿Te gustó?</p>
        <div class="cafe-caja">
          <span class="cafe-icono">${ICONO_TAZA}</span>
          <strong class="cafe-texto">Invitame un cafecito</strong>
          <a class="cafe-boton" href="${CAFECITO_URL}" target="_blank" rel="noopener">${cafecitoTexto} ↗</a>
        </div>
      </aside>
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
