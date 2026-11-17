import type { Pagina } from '../router';
import { descargarImagen, compartirImagen, copiarEnlace } from '../lib/share';
import { crearPrng, hashString, normalizar } from '../lib/hash';
import { TITULOS_DUPLA, DELITOS_DUPLA, veredicto } from '../config/duplas';
import { SITE_URL } from '../config/site';
import { ESCENA_SVG, STICKERS_COMPLICES, elegir } from '../lib/arte';

interface Resultado {
  porcentaje: number;
  titulo: string;
  delito: string;
  sticker: string;
  frase: string;
}

// Simétrico: A+B da lo mismo que B+A.
function calcular(a: string, b: string): Resultado {
  const [x, y] = [normalizar(a), normalizar(b)].sort();
  const rnd = crearPrng(hashString(`${x}|${y}`));
  const porcentaje = Math.floor(rnd() * 101);
  return {
    porcentaje,
    titulo: elegir(TITULOS_DUPLA, rnd),
    delito: elegir(DELITOS_DUPLA, rnd),
    sticker: elegir(STICKERS_COMPLICES, rnd),
    frase: veredicto(porcentaje),
  };
}

export const complices: Pagina = (el) => {
  el.innerHTML = `
    <section class="pagina">
      <a data-link href="/" class="volver">← Inicio</a>
      <h1 class="titulo-neon chico">¿Qué tan buenos cómplices son?</h1>
      <form id="form" class="form" novalidate>
        <label>Primer nombre<input name="a" type="text" maxlength="30" autocomplete="off" required /></label>
        <label>Segundo nombre<input name="b" type="text" maxlength="30" autocomplete="off" required /></label>
        <button type="submit" class="btn">Ver compatibilidad</button>
        <p id="error" class="error" role="alert" hidden></p>
      </form>
      <div id="salida" hidden>
        <div id="tarjeta" class="card neon-card">
          ${ESCENA_SVG}
          <p class="sticker" id="k-sticker"></p>
          <p class="card-top">Dupla criminal de Vice City (ficticia)</p>
          <p class="card-mid" id="k-nombres"></p>
          <p class="card-big" id="k-pct"></p>
          <p class="card-text" id="k-frase"></p>
          <p class="card-mid" id="k-titulo"></p>
          <p class="card-text" id="k-delito"></p>
          <p class="marca">${SITE_URL}</p>
        </div>
        <div class="acciones">
          <button id="descargar" class="btn" type="button">Descargar imagen</button>
          <button id="compartir" class="btn alt" type="button">Compartir</button>
          <button id="copiar" class="btn alt largo" type="button">Copiar link</button>
        </div>
      </div>
    </section>
  `;

  const form = el.querySelector('#form') as HTMLFormElement;
  const salida = el.querySelector('#salida') as HTMLElement;
  const tarjeta = el.querySelector('#tarjeta') as HTMLElement;
  const error = el.querySelector('#error') as HTMLElement;
  const inputA = form.elements.namedItem('a') as HTMLInputElement;
  const inputB = form.elements.namedItem('b') as HTMLInputElement;
  let actual = { a: '', b: '' };

  const enlace = (): string =>
    `${window.location.origin}/complices?a=${encodeURIComponent(actual.a)}&b=${encodeURIComponent(actual.b)}`;

  const mostrar = (a: string, b: string): boolean => {
    if (!a || !b) {
      error.textContent = 'Poné los dos nombres.';
      error.hidden = false;
      salida.hidden = true;
      return false;
    }
    error.hidden = true;
    const r = calcular(a, b);
    actual = { a, b };
    (el.querySelector('#k-nombres') as HTMLElement).textContent = `${a} + ${b}`;
    (el.querySelector('#k-pct') as HTMLElement).textContent = `${r.porcentaje}%`;
    (el.querySelector('#k-frase') as HTMLElement).textContent = r.frase;
    (el.querySelector('#k-titulo') as HTMLElement).textContent = `"${r.titulo}"`;
    (el.querySelector('#k-delito') as HTMLElement).textContent = `Delito en pareja: ${r.delito}`;
    (el.querySelector('#k-sticker') as HTMLElement).textContent = r.sticker;
    history.replaceState(null, '', `/complices?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`);
    salida.hidden = false;
    return true;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (mostrar(inputA.value.trim(), inputB.value.trim())) {
      salida.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const params = new URLSearchParams(window.location.search);
  const a0 = params.get('a')?.trim().slice(0, 30);
  const b0 = params.get('b')?.trim().slice(0, 30);
  if (a0 && b0) {
    inputA.value = a0;
    inputB.value = b0;
    mostrar(a0, b0);
  }

  el.querySelector('#descargar')?.addEventListener('click', () => descargarImagen(tarjeta, 'gta6-complices'));
  const btnCompartir = el.querySelector('#compartir') as HTMLButtonElement;
  btnCompartir.addEventListener('click', async () => {
    const resultado = await compartirImagen(tarjeta, 'gta6-complices', 'Mirá qué tan buenos cómplices somos 😎', enlace());
    const mensajes = { compartido: '¡Compartido!', copiado: '¡Imagen copiada! Pegala donde quieras', descargado: 'Descargada' };
    btnCompartir.textContent = mensajes[resultado];
    setTimeout(() => (btnCompartir.textContent = 'Compartir'), 2500);
  });
  const btnCopiar = el.querySelector('#copiar') as HTMLButtonElement;
  btnCopiar.addEventListener('click', () => copiarEnlace(btnCopiar, enlace()));
};
