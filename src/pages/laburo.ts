import type { Pagina } from '../router';
import { descargarImagen, compartirImagen } from '../lib/share';
import { REFERENCIAS, DIAS_LABORALES_POR_SEMANA, SEMANAS_POR_MES, PRECIOS_USD } from '../config/referencias';
import { SITE_URL } from '../config/site';

const nf = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 });
const nf0 = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });

interface Resultado {
  horas: number;
  dias: number;
  precioArs: number;
  frase: string;
}

function calcular(sueldo: number, horasSemana: number, precioUsd: number, dolar: number): Resultado | null {
  if (!(sueldo > 0 && horasSemana > 0 && precioUsd > 0 && dolar > 0)) return null;
  const precioArs = precioUsd * dolar;
  const valorHora = sueldo / (horasSemana * SEMANAS_POR_MES);
  const horas = precioArs / valorHora;
  const horasPorDia = horasSemana / DIAS_LABORALES_POR_SEMANA;
  const dias = horas / horasPorDia;
  const ref = REFERENCIAS[Math.floor(precioArs) % REFERENCIAS.length];
  const cant = precioArs / ref.precio;
  const unidad = cant >= 1.5 ? ref.plural : ref.singular;
  const frase = `Equivale a ${nf0.format(cant)} ${unidad}. Y sí, ya sabemos que preferís el juego.`;
  return { horas, dias, precioArs, frase };
}

export const laburo: Pagina = (el) => {
  el.innerHTML = `
    <section class="pagina">
      <a data-link href="/" class="volver">← Inicio</a>
      <h1 class="titulo-neon chico">¿Cuántas horas de laburo te cuesta GTA 6?</h1>
      <form id="form" class="form" novalidate>
        <label>Sueldo mensual (ARS)<input name="sueldo" type="number" inputmode="decimal" min="0" required /></label>
        <label>Horas de laburo por semana<input name="horas" type="number" inputmode="decimal" min="1" value="40" required /></label>
        <label>Edición
          <select name="edicion">
            <option value="estandar">Estándar</option>
            <option value="premium">Premium</option>
          </select>
        </label>
        <label>Precio del juego (USD)<input name="usd" type="number" inputmode="decimal" min="1" value="${PRECIOS_USD.estandar}" required /></label>
        <label>Cotización del dólar (ARS)<input name="dolar" type="number" inputmode="decimal" min="1" placeholder="Ej: 1500" required /></label>
        <button type="submit" class="btn">Calcular</button>
        <p id="error" class="error" role="alert" hidden></p>
      </form>
      <div id="salida" hidden>
        <div id="tarjeta" class="card neon-card">
          <p class="card-top">Mi GTA 6 me cuesta</p>
          <p class="card-big" id="c-horas"></p>
          <p class="card-mid" id="c-dias"></p>
          <p class="card-text" id="c-frase"></p>
          <p class="card-precio" id="c-precio"></p>
          <p class="marca">${SITE_URL}</p>
        </div>
        <div class="acciones">
          <button id="descargar" class="btn" type="button">Descargar imagen</button>
          <button id="compartir" class="btn alt" type="button">Compartir</button>
        </div>
      </div>
    </section>
  `;

  const form = el.querySelector('#form') as HTMLFormElement;
  const salida = el.querySelector('#salida') as HTMLElement;
  const tarjeta = el.querySelector('#tarjeta') as HTMLElement;
  const error = el.querySelector('#error') as HTMLElement;
  const usd = form.elements.namedItem('usd') as HTMLInputElement;
  const edicion = form.elements.namedItem('edicion') as HTMLSelectElement;

  edicion.addEventListener('change', () => {
    usd.value = String(edicion.value === 'premium' ? PRECIOS_USD.premium : PRECIOS_USD.estandar);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = (n: string) => Number((form.elements.namedItem(n) as HTMLInputElement).value);
    const r = calcular(v('sueldo'), v('horas'), v('usd'), v('dolar'));
    if (!r) {
      error.textContent = 'Completá todos los campos con números mayores a cero.';
      error.hidden = false;
      salida.hidden = true;
      return;
    }
    error.hidden = true;
    (el.querySelector('#c-horas') as HTMLElement).textContent = `${nf0.format(r.horas)} horas de laburo`;
    (el.querySelector('#c-dias') as HTMLElement).textContent = `≈ ${nf.format(r.dias)} días laborales`;
    (el.querySelector('#c-frase') as HTMLElement).textContent = r.frase;
    (el.querySelector('#c-precio') as HTMLElement).textContent = `Precio: $${nf0.format(r.precioArs)}`;
    salida.hidden = false;
    salida.scrollIntoView({ behavior: 'smooth' });
  });

  el.querySelector('#descargar')?.addEventListener('click', () => descargarImagen(tarjeta, 'gta6-laburo'));
  el.querySelector('#compartir')?.addEventListener('click', () =>
    compartirImagen(tarjeta, 'gta6-laburo', 'Calculé cuántas horas de laburo me cuesta GTA 6 😅'),
  );
};
