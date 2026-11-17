# GTA6 Apps

Dos mini webs en español, pensadas para el celular, para compartir el hype de GTA 6. Sin backend, sin login.

- **`/laburo`** — ¿Cuántas horas de laburo te cuesta GTA 6? Calculá según tu sueldo, tus horas semanales, la edición y la cotización del dólar.
- **`/ficha`** — Tu ficha criminal en Vice City. El mismo nombre siempre genera la misma ficha. La foto es opcional y se procesa solo en el navegador.

Ambas generan una tarjeta vertical 9:16 que se puede descargar o compartir.

> Proyecto de fans, sin relación con Rockstar Games. No usa logos, tipografías ni arte de Rockstar.

## Stack

Vite + TypeScript (vanilla), CSS propio y [html-to-image](https://github.com/bubkoo/html-to-image) para exportar la tarjeta.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # chequeo de tipos + build de producción en dist/
npm run preview  # sirve el build
```

## Configuración

- `src/config/site.ts` — URL del sitio (marca de agua), perfil de Cafecito y aviso legal.
- `src/config/referencias.ts` — precios de referencia (milanesa, asado, colectivo) y precios USD del juego.
- `src/config/crimenes.ts` — delitos y alias de la ficha.

## Deploy

Pensado para Vercel: conectá el repo y desplegá. `vercel.json` incluye el rewrite para que funcionen las rutas directas.
