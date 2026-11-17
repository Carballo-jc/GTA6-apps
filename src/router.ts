export type Pagina = (contenedor: HTMLElement) => void;

export function iniciarRouter(rutas: Record<string, Pagina>, contenedor: HTMLElement): void {
  const renderizar = () => {
    const ruta = window.location.pathname.replace(/\/+$/, '') || '/';
    const pagina = rutas[ruta] ?? rutas['/'];
    contenedor.innerHTML = '';
    pagina(contenedor);
    window.scrollTo(0, 0);
  };

  document.addEventListener('click', (e) => {
    const enlace = (e.target as HTMLElement).closest('a[data-link]') as HTMLAnchorElement | null;
    if (!enlace) return;
    e.preventDefault();
    history.pushState(null, '', enlace.getAttribute('href') ?? '/');
    renderizar();
  });
  window.addEventListener('popstate', renderizar);
  renderizar();
}
