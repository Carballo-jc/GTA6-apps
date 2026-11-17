import { toBlob } from 'html-to-image';

async function renderizar(nodo: HTMLElement): Promise<Blob> {
  const blob = await toBlob(nodo, { pixelRatio: 2, cacheBust: true });
  if (!blob) throw new Error('No se pudo generar la imagen');
  return blob;
}

export async function descargarImagen(nodo: HTMLElement, nombre: string): Promise<void> {
  const blob = await renderizar(nodo);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${nombre}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export type ResultadoCompartir = 'compartido' | 'copiado' | 'descargado';

export async function compartirImagen(nodo: HTMLElement, nombre: string, texto: string): Promise<ResultadoCompartir> {
  const blob = await renderizar(nodo);
  const archivo = new File([blob], `${nombre}.png`, { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };

  if (nav.share && nav.canShare && nav.canShare({ files: [archivo] })) {
    try {
      await nav.share({ files: [archivo], text: texto, url: window.location.origin });
      return 'compartido';
    } catch (e) {
      if ((e as DOMException).name === 'AbortError') return 'compartido';
    }
  }

  if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      return 'copiado';
    } catch {
      // sin permiso de portapapeles: se cae a la descarga
    }
  }

  await descargarImagen(nodo, nombre);
  return 'descargado';
}
