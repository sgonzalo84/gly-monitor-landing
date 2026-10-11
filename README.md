# Proyecto: Gly Monitor Landing

Repositorio estático de la landing page de Glymo.

## Requisitos
- Node.js y npm instalados.

## Desarrollo
Para trabajar en modo desarrollo:

```bash
npm run start
```

## Antes de subir (build)
Antes de hacer push al repositorio, generar la versión de producción:

```bash
npm run build
```

Este comando genera los archivos optimizados; en particular, se minifica el CSS.

## Despliegue
El proyecto está configurado para desplegarse automáticamente en Netlify: al hacer `git push` a la rama `master`, Netlify detecta el cambio y publica la nueva versión.

## Notas
- Asegúrate de ejecutar `npm run build` antes de subir para que los assets estén minificados.
