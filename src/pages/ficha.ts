import type { Pagina } from '../router';
import { descargarImagen, compartirImagen, copiarEnlace } from '../lib/share';
import { crearPrng, hashString, normalizar } from '../lib/hash';
import { CRIMENES, ALIAS_NOMBRES } from '../config/crimenes';
import { SITE_URL } from '../config/site';
import { ESCENA_SVG, STICKERS_FICHA, elegir } from '../lib/arte';

interface Ficha {
  expediente: string;
  estrellas: number;
  alias: string;
  delitos: string[];
  sticker: string;
}

function generarFicha(nombre: string): Ficha {
  const rnd = crearPrng(hashString(normalizar(nombre)));
  const expediente = `VC-${String(Math.floor(rnd() * 900000) + 100000)}`;
  const estrellas = Math.floor(rnd() * 5) + 1;
  const alias = ALIAS_NOMBRES[Math.floor(rnd() * ALIAS_NOMBRES.length)];
  const pool = [...CRIMENES];
  const delitos: string[] = [];
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(rnd() * pool.length);
    delitos.push(pool.splice(idx, 1)[0]);
  }
  const sticker = elegir(STICKERS_FICHA, rnd);
  return { expediente, estrellas, alias, delitos, sticker };
}

function escapar(texto: string): string {
  const d = document.createElement('div');
  d.textContent = texto;
  return d.innerHTML;
}

export const ficha: Pagina = (el) => {
  el.innerHTML = `
    <section class="pagina">
      <a data-link href="/" class="volver">← Inicio</a>
      <h1 class="titulo-neon chico celeste-t">Tu ficha criminal en Vice City</h1>
      <form id="form" class="form" novalidate>
        <label>Tu nombre o apodo<input name="nombre" type="text" maxlength="30" autocomplete="off" required /></label>
        <label>Foto (opcional, no se sube a ningún lado)<input name="foto" type="file" accept="image/*" /></label>
        <button type="submit" class="btn">Generar ficha</button>
        <p id="error" class="error" role="alert" hidden></p>
      </form>
      <div id="salida" hidden>
        <div id="tarjeta" class="card neon-card celeste-card">
          ${ESCENA_SVG}
          <p class="sticker" id="f-sticker"></p>
          <p class="card-top">DEPARTAMENTO DE POLICÍA · VICE CITY (ficticio)</p>
          <div id="foto" class="foto" hidden></div>
          <p class="card-big" id="f-nombre"></p>
          <p class="card-mid" id="f-alias"></p>
          <p class="card-text" id="f-exp"></p>
          <p class="estrellas" id="f-estrellas" aria-label="Nivel de búsqueda"></p>
          <ul class="delitos" id="f-delitos"></ul>
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
  const fotoBox = el.querySelector('#foto') as HTMLElement;
  let fotoUrl: string | null = null;
  let nombreActual = '';

  const inputNombre = form.elements.namedItem('nombre') as HTMLInputElement;
  const inputFoto = form.elements.namedItem('foto') as HTMLInputElement;

  const enlaceFicha = (nombre: string): string =>
    `${window.location.origin}/ficha?n=${encodeURIComponent(nombre)}`;

  const mostrarFicha = (nombre: string, archivo?: File): boolean => {
    if (!nombre) {
      error.textContent = 'Poné un nombre o apodo.';
      error.hidden = false;
      salida.hidden = true;
      return false;
    }
    error.hidden = true;
    const f = generarFicha(nombre);
    (el.querySelector('#f-nombre') as HTMLElement).textContent = nombre;
    (el.querySelector('#f-alias') as HTMLElement).textContent = `Alias: "${f.alias}"`;
    (el.querySelector('#f-exp') as HTMLElement).textContent = `Expediente N° ${f.expediente}`;
    (el.querySelector('#f-estrellas') as HTMLElement).textContent = '★'.repeat(f.estrellas) + '☆'.repeat(5 - f.estrellas);
    (el.querySelector('#f-delitos') as HTMLElement).innerHTML = f.delitos.map((d) => `<li>${escapar(d)}</li>`).join('');
    (el.querySelector('#f-sticker') as HTMLElement).textContent = f.sticker;
    if (fotoUrl) URL.revokeObjectURL(fotoUrl);
    if (archivo) {
      fotoUrl = URL.createObjectURL(archivo);
      fotoBox.style.backgroundImage = `url("${fotoUrl}")`;
      fotoBox.hidden = false;
    } else {
      fotoUrl = null;
      fotoBox.hidden = true;
    }
    nombreActual = nombre;
    history.replaceState(null, '', `/ficha?n=${encodeURIComponent(nombre)}`);
    salida.hidden = false;
    return true;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (mostrarFicha(inputNombre.value.trim(), inputFoto.files?.[0])) {
      salida.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const nombreEnUrl = new URLSearchParams(window.location.search).get('n')?.trim().slice(0, 30);
  if (nombreEnUrl) {
    inputNombre.value = nombreEnUrl;
    mostrarFicha(nombreEnUrl);
  }

  el.querySelector('#descargar')?.addEventListener('click', () => descargarImagen(tarjeta, 'gta6-ficha'));
  const btnCompartir = el.querySelector('#compartir') as HTMLButtonElement;
  btnCompartir.addEventListener('click', async () => {
    const resultado = await compartirImagen(
      tarjeta,
      'gta6-ficha',
      'Mi ficha criminal de Vice City 🚨',
      enlaceFicha(nombreActual),
    );
    const mensajes = { compartido: '¡Compartido!', copiado: '¡Imagen copiada! Pegala donde quieras', descargado: 'Descargada' };
    btnCompartir.textContent = mensajes[resultado];
    setTimeout(() => (btnCompartir.textContent = 'Compartir'), 2500);
  });
  const btnCopiar = el.querySelector('#copiar') as HTMLButtonElement;
  btnCopiar.addEventListener('click', () => copiarEnlace(btnCopiar, enlaceFicha(nombreActual)));
};
