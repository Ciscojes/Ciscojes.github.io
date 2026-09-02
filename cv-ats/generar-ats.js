import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const carpeta = path.dirname(fileURLToPath(import.meta.url));
const salida = path.join(carpeta, "Jesus_Granados_CV_ATS_una_columna.pdf");
const salidaPublica = path.join(carpeta, "..", "public", "documentos", "Jesus_Granados_CV_ATS.pdf");

const doc = new PDFDocument({
  size: "A4",
  margin: 34,
  info: {
    Title: "CV ATS - Jesús Francisco Granados Mora",
    Author: "Jesús Francisco Granados Mora",
    Subject: "Desarrollador Full Stack Junior y Técnico en Redes",
    Keywords: "Python, FastAPI, Backend, Full Stack, PostgreSQL, Docker, APIs REST, Inteligencia Artificial, Redes, CCNA, CCNP",
  },
});

const stream = fs.createWriteStream(salida);
doc.pipe(stream);

const ancho = doc.page.width - 68;
const azul = "#12344d";
const texto = "#17212b";
const tenue = "#4b5d6b";
let y = 30;

function escribir(contenido, opciones = {}) {
  doc.x = opciones.x ?? 34;
  doc.y = opciones.y ?? y;
  doc.font(opciones.negrita ? "Helvetica-Bold" : "Helvetica")
    .fontSize(opciones.tamaño ?? 7.8)
    .fillColor(opciones.color ?? texto)
    .text(contenido, {
      width: opciones.ancho ?? ancho,
      lineGap: opciones.espacio ?? 0.25,
      link: opciones.enlace,
      underline: false,
      align: opciones.alinear ?? "left",
    });
  y = doc.y;
}

function seccion(titulo) {
  y += 6;
  escribir(titulo.toUpperCase(), { negrita: true, tamaño: 8.9, color: azul, espacio: 0 });
  doc.moveTo(34, y + 1).lineTo(34 + ancho, y + 1).lineWidth(0.55).strokeColor("#8fa5b4").stroke();
  y += 4;
}

function proyecto(nombre, tecnologias, resumen) {
  escribir(nombre, { negrita: true, tamaño: 8.05 });
  y += 0.3;
  escribir(tecnologias, { tamaño: 7.05, color: tenue, espacio: 0.1 });
  y += 0.3;
  escribir(`• ${resumen}`, { tamaño: 7.45, espacio: 0.15 });
  y += 2.7;
}

escribir("JESÚS FRANCISCO GRANADOS MORA", { negrita: true, tamaño: 16.5, color: azul });
y += 1;
escribir("Desarrollador Full Stack Junior | Técnico en Redes", { negrita: true, tamaño: 9.5 });
y += 2;

const contactoY = y;
escribir("San José, Costa Rica | +506 6069 7544 | jfrangranadosmora@gmail.com", {
  tamaño: 7.8,
  enlace: "mailto:jfrangranadosmora@gmail.com",
});
y += 0.8;
const mitad = ancho / 2;
escribir("github.com/Ciscojes", {
  tamaño: 7.8,
  ancho: mitad,
  enlace: "https://github.com/Ciscojes",
});
const enlacesY = y;
escribir("linkedin.com/in/jesus-granados-ba9aab1b4", {
  x: 34 + mitad,
  y: enlacesY - 9,
  tamaño: 7.8,
  ancho: mitad,
  alinear: "right",
  enlace: "https://www.linkedin.com/in/jesus-granados-ba9aab1b4/",
});
y = Math.max(y, contactoY + 23);

seccion("Perfil profesional");
escribir(
  "Desarrollador Full Stack Junior y técnico en redes, con formación en inteligencia artificial. He construido cinco proyectos funcionales y responsive con APIs, bases de datos, pruebas, Docker, CI/CD e integración de IA. Aporto siete años de experiencia laboral, precisión, responsabilidad y resolución práctica de problemas.",
  { tamaño: 7.85 },
);

seccion("Habilidades técnicas");
escribir("Backend y Full Stack: Python, FastAPI, APIs REST, Pydantic, JavaScript, Node.js, Express, HTML, Sass/CSS, Vite y Spec-Driven Development.");
y += 0.4;
escribir("Datos y calidad: PostgreSQL, SQLite, SQLAlchemy, Alembic, migraciones, Pytest y documentación técnica.");
y += 0.4;
escribir("IA: Gemini, APIs de IA, prompt engineering, RAG, OCR, bases de conocimiento, MCP, chatbots y agentes IA.");
y += 0.4;
escribir("Entrega, redes y seguridad: Git, GitHub, Linux, Docker, GitHub Actions, CI/CD, CCNA, CCNP, switching, routing y ciberseguridad.");

seccion("Proyectos técnicos");
proyecto(
  "JobRadar — Plataforma SaaS de alertas de empleo",
  "Python · FastAPI · PostgreSQL · Streamlit · Docker · Pytest · Telegram",
  "Dashboard, Docker, pruebas y notificaciones con Telegram; API REST multiusuario con JWT, SQLAlchemy/Alembic, 69 pruebas y CI exitoso.",
);
proyecto(
  "Tutor HTML y CSS con Gemini",
  "JavaScript · Node.js · Express · Gemini · SQLite FTS5 · RAG · OCR",
  "Tutor con fuentes, PDF/OCR, búsqueda documental, flashcards y seguimiento de progreso; API segura y 43 pruebas automatizadas.",
);
proyecto(
  "GathSession — Landing page de comunidad",
  "HTML5 · Sass · CSS Grid · Flexbox · JavaScript · Vite",
  "Interfaz responsive para escritorio, tablet y móvil, con HTML semántico y navegación accesible mediante teclado.",
);
proyecto(
  "Beauty Spa — Landing page desde Figma",
  "HTML5 · Sass · CSS Grid · Flexbox · JavaScript · Vite",
  "Adaptación responsive de un diseño de 1920 × 1080, con navegación móvil accesible y contenido sin desbordamiento horizontal.",
);
proyecto(
  "Adam Keyes Portfolio — Portafolio responsive",
  "HTML5 · Sass · CSS Grid · Flexbox · Vite",
  "Reproducción desde Figma con presentación, habilidades, galería de proyectos y contacto, adaptada a escritorio, tableta y móvil.",
);

seccion("Experiencia");
proyecto(
  "Carpintero — AICON Edificadora | 2019–actualidad, Costa Rica",
  "Responsabilidad · Trabajo en equipo · Precisión · Resolución de problemas",
  "Instalación de puertas, muebles, gradas, artesonados y revestimientos según medidas, planos y requerimientos.",
);
proyecto(
  "Desarrollo de proyectos de software | 2026–actualidad",
  "Backend · Frontend · Bases de datos · Pruebas · Automatización · IA",
  "Construcción de JobRadar, Tutor HTML y CSS, GathSession, Beauty Spa y Adam Keyes Portfolio como experiencia tecnológica comprobable.",
);

seccion("Educación");
escribir(
  "Máster en Desarrollo de Software con IA — BIG School | jun. 2026–sept. 2026, en curso.\nPrograma de Desarrollo Web Full Stack — Conquer Blocks | ago. 2025–dic. 2026, en curso.\nTécnico en Redes — Universidad Castro Carazo | 2023, 450 horas, nota 91,66.\nBachiller en Educación Media — CONED, UNED y MEP | 2025.",
  { tamaño: 7.35, espacio: 0.15 },
);

seccion("Certificaciones destacadas");
escribir(
  "CCNP Enterprise Core Networking y Advanced Routing (2025) · CCNAv7 Introducción a Redes, Switching/Routing/Wireless y Redes Empresariales (2022–2023) · Cybersecurity Essentials (2023) · Full Stack con Python, VTEK (2026) · Chatbots y Agentes Inteligentes, TEC/FUNDATEC (2026) · Electrónica General, COSVIC, 108 horas (2020–2021).",
  { tamaño: 7.1, espacio: 0.15 },
);

seccion("Idiomas y datos adicionales");
escribir(
  "Inglés: Ejecutivo en Inglés para Servicios, INA, 987 horas (2010–2012). Disponibilidad: remoto internacional o remoto/híbrido en Costa Rica. Licencia de motocicleta.",
  { tamaño: 7.25 },
);

console.log(`CV ATS: contenido hasta Y=${Math.round(y)} de ${Math.round(doc.page.height)}`);
doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

fs.copyFileSync(salida, salidaPublica);
console.log(`PDF ATS generado: ${salida}`);
console.log("CV ATS público actualizado.");
