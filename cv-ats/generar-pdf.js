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
    Subject: "Desarrollador de software junior | Python y Full Stack",
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
yIzquierda = textoLateral("Desarrollador de software\njunior", yIzquierda + 9, {
  negrita: true,
  tamaño: 9.5,
  color: acento,
  espacio: 0.8,
});
yIzquierda = textoLateral("Técnico en Redes", yIzquierda + 4, {
  tamaño: 8.3,
  color: lateralTexto,
});

yIzquierda = textoLateral("Python · Full Stack · IA aplicada", yIzquierda + 5, { tamaño: 7.3 });

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

yIzquierda = textoLateral("ciscojes.github.io", yIzquierda + 3, { enlace: "https://ciscojes.github.io/", color: blanco });

yIzquierda = tituloLateral("Habilidades", yIzquierda + 18);
const habilidades = [
  ["Backend y Full Stack", "Python · FastAPI · JavaScript · TypeScript · React · Next.js · Node.js · HTML · CSS"],
  ["Datos", "PostgreSQL · SQLite · SQLAlchemy · Alembic · Migraciones"],
  ["Inteligencia artificial", "Gemini · APIs de IA · RAG · OCR · Bases de conocimiento; MCP en profundización"],
  ["Calidad y entrega", "Pytest · Git · GitHub · Linux · Docker · GitHub Actions · CI/CD · Spec-Driven Development"],
  ["Redes y seguridad", "Técnico en Redes · Routing · Switching · Ciberseguridad"],
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

yIzquierda = tituloLateral("Formación actual", yIzquierda + 14);
yIzquierda = textoLateral("Cloud / AWS y DevOps", yIzquierda);
yIzquierda = textoLateral("Commit Academy · En curso", yIzquierda + 2);

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
  "Desarrollador de software junior y Técnico en Redes. Construyo aplicaciones con Python, TypeScript, APIs, bases de datos, pruebas e IA aplicada. Mis proyectos abarcan gestión inmobiliaria, empleo, finanzas y educación. Estoy en la fase final del máster de software con IA y amplío mi formación en Cloud/AWS y DevOps.",
  yDerecha,
  { tamaño: 8.05, espacio: 0.55 },
);

yDerecha = tituloContenido("Proyectos técnicos", yDerecha + 11);
yDerecha = encabezadoTrabajo("AICON Web - Gestión inmobiliaria y CRM", "Next.js · React · TypeScript · Supabase", yDerecha + 5);
yDerecha = viñeta("Catálogo, panel administrativo y gestión comercial; roles, migraciones, pruebas y desarrollo guiado por especificaciones. En desarrollo.", yDerecha);
yDerecha = encabezadoTrabajo("JobRadar - Seguimiento y alertas de empleo", "Next.js · Python · FastAPI · PostgreSQL · Docker", yDerecha + 5);
yDerecha = viñeta("Proyecto colaborativo. Mi aportación: frontend, experiencia del producto, notificaciones, pruebas e ingeniería del proyecto.", yDerecha);
yDerecha = encabezadoTrabajo("Deciflujo - Control financiero para pymes", "Next.js · TypeScript · SQLite · PostgreSQL", yDerecha + 5);
yDerecha = viñeta("Movimientos, presupuestos, reportes y cierres; espacios multiempresa, roles y auditoría. MVP en validación con pruebas unitarias y E2E.", yDerecha);
yDerecha = encabezadoTrabajo("Tutor HTML y CSS con Gemini", "Node.js · Express · Gemini · SQLite FTS5 · RAG · OCR", yDerecha + 5);
yDerecha = viñeta("Consulta documentos con fuentes y genera ejercicios y tarjetas; extracción PDF/OCR, progreso y repaso espaciado.", yDerecha);
yDerecha = textoContenido("Otros proyectos frontend: GathSession, Beauty Spa y Adam Keyes Portfolio. Código y demos en mi portafolio.", yDerecha + 4, { tamaño: 7.3 });

yDerecha = tituloContenido("Experiencia", yDerecha + 11);
yDerecha = encabezadoTrabajo("Carpintero - AICON Edificadora", "2019-actualidad · Costa Rica", yDerecha);
yDerecha = viñeta("Instalación de puertas, muebles, gradas, artesonados y revestimientos; trabajo preciso según medidas y requerimientos.", yDerecha);
yDerecha = encabezadoTrabajo("Desarrollo de proyectos de software", "2026-actualidad · Experiencia práctica", yDerecha + 4);
yDerecha = viñeta("Proyectos propios y colaborativos con backend, frontend, datos, pruebas, automatización e IA; código y documentación públicos.", yDerecha);

yDerecha = tituloContenido("Educación", yDerecha + 10);
const estudios = [
  ["Máster en Desarrollo de Software con IA", "BIG School · Fase final: últimos módulos y proyecto final"],
  ["Programa de Desarrollo Web Full Stack", "Conquer Blocks · En curso"],
  ["Cloud / AWS", "Commit Academy · En curso; prácticas de DevOps"],
  ["Técnico en Redes", "Universidad Castro Carazo · 2023 · 450 horas · Nota 91,66"],
  ["Bachiller en Educación Media", "CONED, UNED y MEP · 2025"],
];

for (const [estudio, datos] of estudios) {
  yDerecha = textoContenido(estudio, yDerecha + 3, { negrita: true, tamaño: 7.85 });
  yDerecha = textoContenido(datos, yDerecha + 0.5, { tamaño: 7.1, color: tenue });
}

yDerecha = tituloContenido("Certificaciones destacadas", yDerecha + 10);
yDerecha = textoContenido(
  "Fundamentos de AWS: Cloud, Serverless y Operación - Commit Academy (completado). Formación Cisco CCNAv7 y CCNP Enterprise; Cybersecurity Essentials; Full Stack con Python - VTEK; Chatbots y Agentes Inteligentes - TEC/FUNDATEC.",
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
