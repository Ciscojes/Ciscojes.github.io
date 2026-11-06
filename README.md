# CV de Jesús Granados

Landing page profesional de Jesús Francisco Granados Mora, Desarrollador de software
junior, Python y Full Stack, con IA aplicada y Cloud/DevOps en formación.

## Ver CV

[Visualizar el CV publicado en GitHub Pages](https://ciscojes.github.io/)

## Tecnologías

- HTML semántico
- Sass
- JavaScript
- Vite

## Uso local

```bash
npm install
npm run dev
```

## Compilar

```bash
npm run build
```

La publicación en GitHub Pages está preparada mediante GitHub Actions.

## Actualizar los currículos

Los generadores conservan el CV visual y la versión ATS en una columna:

```bash
cd cv-ats
npm ci
npm run generate
npm run verify
```

Los PDF publicados se guardan en `public/documentos/`. La plantilla
`cv-ats/cv.html` es una alternativa para vista e impresión.

## Contenido profesional

La web, la plantilla imprimible y ambos generadores PDF incluyen AICON Web,
JobRadar, Deciflujo, el tutor con Gemini y Brújula Máster IA, junto a tres
prácticas frontend. JobRadar utiliza Next.js como única interfaz.

Al actualizar proyectos, sincroniza `index.html`, `cv-ats/cv.html` y ambos
generadores; después regenera los PDF y ejecuta la verificación. Los estados
describen el alcance del proyecto y no certifican su lanzamiento ni que todos
los análisis de calidad estén aprobados.

## Criterio visual

La presentación usa azul oscuro, tipografía de sistema y un acento verde apagado.
Las habilidades y los proyectos se organizan con títulos y separadores; las
imágenes son capturas de los proyectos. Evitar ventanas de código decorativas,
brillos, degradados, tarjetas anidadas y movimientos de entrada o al pasar el
cursor. Las flechas de enlaces y el control de menú tienen una función concreta.

La navegación móvil debe ocultarse también del árbol de accesibilidad al cerrar
el menú, cerrarse al elegir una sección y permitir Escape para devolver el foco
al botón. El desplazamiento suave respeta la preferencia de movimiento reducido.
