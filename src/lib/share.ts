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

export async function compartirImagen(nodo: HTMLElement, nombre: string, texto: string): Promise<void> {
  const blob = await renderizar(nodo);
  const archivo = new File([blob], `${nombre}.png`, { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.share && nav.canShare && nav.canShare({ files: [archivo] })) {
    await nav.share({ files: [archivo], text: texto, url: window.location.origin });
    return;
  }
  await descargarImagen(nodo, nombre);
}
