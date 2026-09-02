import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const carpeta = path.dirname(fileURLToPath(import.meta.url));
const salida = path.join(carpeta, "Jesus_Granados_CV_ATS.pdf");

const doc = new PDFDocument({
  size: "A4",
  margin: 0,
  info: {
    Title: "CV - Jesús Francisco Granados Mora",
    Author: "Jesús Francisco Granados Mora",
    Subject: "Desarrollador Backend Python Junior y Técnico en Redes",
    Keywords: "Python, FastAPI, Backend, Full Stack, PostgreSQL, Docker, APIs REST, Inteligencia Artificial, Redes, CCNA, CCNP",
  },
});

const archivo = fs.createWriteStream(salida);
doc.pipe(archivo);

const paginaAncho = doc.page.width;
const paginaAlto = doc.page.height;
const lateralAncho = 182;
const lateralX = 22;
const lateralTextoAncho = 138;
const contenidoX = 205;
const contenidoAncho = paginaAncho - contenidoX - 34;

const azul = "#12344d";
const acento = "#63d3cf";
const blanco = "#ffffff";
const lateralTexto = "#e5eef3";
const texto = "#1d2935";
const tenue = "#536575";
const linea = "#9bb0bd";

doc.rect(0, 0, lateralAncho, paginaAlto).fill(azul);

function posicion(x, y) {
  doc.x = x;
  doc.y = y;
}

function tituloLateral(titulo, y) {
  posicion(lateralX, y);
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(acento).text(titulo.toUpperCase(), {
    width: lateralTextoAncho,
    characterSpacing: 0.5,
  });
  const lineaY = doc.y + 1.5;
  doc.moveTo(lateralX, lineaY).lineTo(lateralX + lateralTextoAncho, lineaY).lineWidth(0.45).strokeColor(acento).strokeOpacity(0.55).stroke();
  doc.strokeOpacity(1);
  return lineaY + 5;
}

function textoLateral(contenido, y, opciones = {}) {
  posicion(lateralX, y);
  doc.font(opciones.negrita ? "Helvetica-Bold" : "Helvetica")
    .fontSize(opciones.tamaño ?? 7.6)
    .fillColor(opciones.color ?? lateralTexto)
    .text(contenido, {
      width: lateralTextoAncho,
      lineGap: opciones.espacio ?? 0.6,
      link: opciones.enlace,
      underline: false,
    });
  return doc.y;
}

function tituloContenido(titulo, y) {
  posicion(contenidoX, y);
  doc.font("Helvetica-Bold").fontSize(10.2).fillColor(azul).text(titulo.toUpperCase(), {
    width: contenidoAncho,
    characterSpacing: 0.45,
  });
  const lineaY = doc.y + 1.4;
  doc.moveTo(contenidoX, lineaY).lineTo(contenidoX + contenidoAncho, lineaY).lineWidth(0.55).strokeColor(linea).stroke();
  return lineaY + 4;
}

function textoContenido(contenido, y, opciones = {}) {
  posicion(contenidoX, y);
  doc.font(opciones.negrita ? "Helvetica-Bold" : "Helvetica")
    .fontSize(opciones.tamaño ?? 8.1)
    .fillColor(opciones.color ?? texto)
    .text(contenido, {
      width: contenidoAncho,
      lineGap: opciones.espacio ?? 0.55,
    });
  return doc.y;
}

function encabezadoTrabajo(titulo, datos, y) {
  y = textoContenido(titulo, y, { negrita: true, tamaño: 8.45 });
  y = textoContenido(datos, y + 1, { tamaño: 7.25, color: tenue, espacio: 0.25 });
  return y + 1;
}

function viñeta(contenido, y) {
  posicion(contenidoX + 2, y);
  doc.font("Helvetica").fontSize(7.6).fillColor(texto).text(`• ${contenido}`, {
    width: contenidoAncho - 2,
    indent: 7,
    lineGap: 0.4,
  });
  return doc.y + 0.7;
}

// Columna izquierda
doc.roundedRect(lateralX, 28, 44, 44, 7).fill(acento);
posicion(lateralX, 39);
doc.font("Helvetica-Bold").fontSize(16).fillColor(azul).text("JG", {
  width: 44,
  align: "center",
});

let yIzquierda = 84;
yIzquierda = textoLateral("JESÚS FRANCISCO\nGRANADOS MORA", yIzquierda, {
  negrita: true,
  tamaño: 16.2,
  color: blanco,
  espacio: 0,
});
yIzquierda = textoLateral("Desarrollador Backend\nPython Junior", yIzquierda + 9, {
  negrita: true,
  tamaño: 9.5,
  color: acento,
  espacio: 0.8,
});
yIzquierda = textoLateral("Técnico en Redes", yIzquierda + 4, {
  tamaño: 8.3,
  color: lateralTexto,
});

yIzquierda = tituloLateral("Contacto", yIzquierda + 18);
yIzquierda = textoLateral("San José, Costa Rica", yIzquierda);
yIzquierda = textoLateral("+506 6069 7544", yIzquierda + 3, {
  color: blanco,
  enlace: "tel:+50660697544",
});
yIzquierda = textoLateral("jfrangranadosmora@gmail.com", yIzquierda + 3, {
  tamaño: 6.9,
  color: blanco,
  enlace: "mailto:jfrangranadosmora@gmail.com",
});
yIzquierda = textoLateral("github.com/Ciscojes", yIzquierda + 3, {
  color: blanco,
  enlace: "https://github.com/Ciscojes",
});
yIzquierda = textoLateral("LinkedIn: Jesús Granados", yIzquierda + 3, {
  color: blanco,
  enlace: "https://www.linkedin.com/in/jesus-granados-ba9aab1b4/",
});

yIzquierda = tituloLateral("Habilidades", yIzquierda + 18);
const habilidades = [
  ["Backend y Full Stack", "Python · FastAPI · APIs REST · Pydantic · JavaScript · Node.js · Express · HTML · Sass/CSS · Vite"],
  ["Datos", "PostgreSQL · SQLite · SQLAlchemy · Alembic · Migraciones"],
  ["Inteligencia artificial", "Gemini · APIs de IA · Prompt engineering · RAG · OCR · Bases de conocimiento · MCP · Chatbots · Agentes IA"],
  ["Calidad y entrega", "Pytest · Git · GitHub · Linux · Docker · GitHub Actions · CI/CD · Spec-Driven Development"],
  ["Redes y seguridad", "CCNA · CCNP · Switching · Routing · Ciberseguridad"],
];

for (const [grupo, herramientas] of habilidades) {
  yIzquierda = textoLateral(grupo, yIzquierda + 5, {
    negrita: true,
    tamaño: 7.25,
    color: blanco,
  });
  yIzquierda = textoLateral(herramientas, yIzquierda + 1.5, {
    tamaño: 6.65,
    color: lateralTexto,
    espacio: 0.45,
  });
}

yIzquierda = tituloLateral("Idiomas", yIzquierda + 17);
yIzquierda = textoLateral("Ejecutivo en Inglés para Servicios", yIzquierda, {
  negrita: true,
  color: blanco,
});
yIzquierda = textoLateral("INA · 987 horas", yIzquierda + 2);

yIzquierda = tituloLateral("Disponibilidad", yIzquierda + 17);
yIzquierda = textoLateral("Remoto internacional.", yIzquierda);
yIzquierda = textoLateral("Remoto o híbrido en Costa Rica.", yIzquierda + 3);
yIzquierda = textoLateral("Licencia de motocicleta.", yIzquierda + 3);

// Columna derecha
let yDerecha = 31;
yDerecha = tituloContenido("Perfil profesional", yDerecha);
yDerecha = textoContenido(
  "Desarrollador backend Python junior y técnico en redes, con formación Full Stack e inteligencia artificial. He construido cinco proyectos funcionales y responsive con APIs, bases de datos, pruebas, Docker, CI/CD e integración de IA. Aporto siete años de experiencia laboral, precisión, responsabilidad y resolución práctica de problemas.",
  yDerecha,
  { tamaño: 8.05, espacio: 0.55 },
);

yDerecha = tituloContenido("Proyectos técnicos", yDerecha + 11);
yDerecha = encabezadoTrabajo(
  "JobRadar — Plataforma SaaS de alertas de empleo",
  "Python · FastAPI · PostgreSQL · Streamlit · Docker · Pytest · Telegram",
  yDerecha,
);
yDerecha = viñeta("Dashboard, Docker, pruebas y notificaciones con Telegram; API REST multiusuario con JWT, SQLAlchemy/Alembic, 69 pruebas y CI exitoso.", yDerecha);

yDerecha = encabezadoTrabajo(
  "Tutor HTML y CSS con Gemini",
  "JavaScript · Node.js · Express · Gemini · SQLite FTS5 · RAG · OCR",
  yDerecha + 5,
);
yDerecha = viñeta("Tutor con fuentes, PDF/OCR, búsqueda documental, flashcards y seguimiento de progreso; API segura y 43 pruebas automatizadas.", yDerecha);

yDerecha = encabezadoTrabajo(
  "GathSession — Landing page de comunidad",
  "HTML5 · Sass · CSS Grid · Flexbox · JavaScript · Vite",
  yDerecha + 5,
);
yDerecha = viñeta("Interfaz responsive para escritorio, tablet y móvil, con HTML semántico y navegación accesible mediante teclado.", yDerecha);

yDerecha = encabezadoTrabajo(
  "Beauty Spa — Landing page desde Figma",
  "HTML5 · Sass · CSS Grid · Flexbox · JavaScript · Vite",
  yDerecha + 5,
);
yDerecha = viñeta("Adaptación responsive de un diseño de 1920 × 1080, con navegación móvil accesible y contenido sin desbordamiento horizontal.", yDerecha);

yDerecha = encabezadoTrabajo(
  "Adam Keyes Portfolio — Portafolio responsive",
  "HTML5 · Sass · CSS Grid · Flexbox · Vite",
  yDerecha + 5,
);
yDerecha = viñeta("Reproducción desde Figma con presentación, habilidades, galería de proyectos y contacto, adaptada a escritorio, tableta y móvil.", yDerecha);

yDerecha = tituloContenido("Experiencia", yDerecha + 11);
yDerecha = encabezadoTrabajo("Carpintero — AICON Edificadora", "2019–actualidad · Costa Rica", yDerecha);
yDerecha = viñeta("Instalación de puertas, muebles, gradas, artesonados y revestimientos; trabajo preciso según medidas y requerimientos.", yDerecha);
yDerecha = encabezadoTrabajo("Desarrollo de proyectos de software", "2026–actualidad · Experiencia práctica", yDerecha + 4);
yDerecha = viñeta("Construcción de cinco proyectos para aplicar backend, frontend, datos, pruebas, automatización e inteligencia artificial.", yDerecha);

yDerecha = tituloContenido("Educación", yDerecha + 10);
const estudios = [
  ["Máster en Desarrollo de Software con IA", "BIG School · jun. 2026–sept. 2026 · En curso"],
  ["Programa de Desarrollo Web Full Stack", "Conquer Blocks · ago. 2025–dic. 2026 · En curso"],
  ["Técnico en Redes", "Universidad Castro Carazo · 2023 · 450 horas · Nota 91,66"],
  ["Bachiller en Educación Media", "CONED, UNED y MEP · 2025"],
];

for (const [estudio, datos] of estudios) {
  yDerecha = textoContenido(estudio, yDerecha + 3, { negrita: true, tamaño: 7.85 });
  yDerecha = textoContenido(datos, yDerecha + 0.5, { tamaño: 7.1, color: tenue });
}

yDerecha = tituloContenido("Certificaciones destacadas", yDerecha + 10);
yDerecha = textoContenido(
  "CCNP Enterprise Core Networking y Advanced Routing (2025) · CCNAv7 Introducción a Redes, Switching/Routing/Wireless y Redes Empresariales (2022–2023) · Cybersecurity Essentials (2023) · Full Stack con Python, VTEK (2026) · Chatbots y Agentes Inteligentes, TEC/FUNDATEC (2026) · Electrónica General, COSVIC, 108 horas (2020–2021).",
  yDerecha,
  { tamaño: 7.35, espacio: 0.4 },
);

console.log(`Contenido lateral hasta Y=${Math.round(yIzquierda)} de ${Math.round(paginaAlto)}`);
console.log(`Contenido principal hasta Y=${Math.round(yDerecha)} de ${Math.round(paginaAlto)}`);

doc.end();

archivo.on("finish", () => {
  fs.copyFileSync(salida, path.join(carpeta, "..", "public", "documentos", "Jesus_Granados_CV.pdf"));
  console.log(`PDF generado: ${salida}`);
  console.log("CV visual público actualizado.");
});
