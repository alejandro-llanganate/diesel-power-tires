# Diesel Power Tires

Sitio de catálogo y ventas de llantas **Double Coin** para camión y bus — distribuidor **Diesel Power Tires** (Ecuador).

## Características

- Catálogo Double Coin con filtros por aplicación y medida
- Pedidos por **WhatsApp** con carrito
- **Cotización Premium** (pago con tarjeta o Deuna)
- Mapa interactivo con dos sucursales (Daule y Durán)
- Secciones: descargas, videos, soporte, nosotros, contacto

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Despliegue en GitHub Pages

El sitio se publica como sitio estático (`output: export`) con GitHub Actions.

### URL en producción

**https://alejandro-llanganate.github.io/diesel-power-tires/**

### Configuración en GitHub (una sola vez)

1. Repositorio → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. Tras el primer push a `main`, el workflow `Deploy GitHub Pages` genera y publica `out/`

### Cómo funciona

- Workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
- `basePath` automático: `/nombre-del-repo` (vacío si el repo es `usuario.github.io`)
- Imágenes sin optimización de servidor (requerido en Pages estático)
- La ruta `/api/tires` no se despliega (el catálogo usa datos e imágenes locales)

### Probar el build de Pages en local

```bash
npm run build:pages
npx serve out
```

Abre la URL que indique `serve` (las rutas usan el prefijo `/diesel-power-tires`).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build estándar (export estático) |
| `npm run build:pages` | Build con `basePath` de GitHub Pages |
| `npm run lint` | ESLint |

## Ubicaciones

- Vía a Daule km 5.5 y Calle Quinta — 0999660912
- Vía Durán Tambo km 26 — 0999660912
