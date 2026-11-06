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
    Subject: "Desarrollador de software junior | Python y Full Stack",
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
    .fontSize(opciones.tamaño ?? 8.89)
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
  escribir(titulo.toUpperCase(), { negrita: true, tamaño: 10.15, color: azul, espacio: 0 });
  doc.moveTo(34, y + 1).lineTo(34 + ancho, y + 1).lineWidth(0.55).strokeColor("#8fa5b4").stroke();
  y += 4;
}

function proyecto(nombre, tecnologias, resumen) {
  escribir(nombre, { negrita: true, tamaño: 9.18 });
  y += 0.3;
  escribir(tecnologias, { tamaño: 8.04, color: tenue, espacio: 0.1 });
  y += 0.3;
  escribir(`• ${resumen}`, { tamaño: 8.49, espacio: 0.15 });
  y += 2.7;
}

escribir("JESÚS FRANCISCO GRANADOS MORA", { negrita: true, tamaño: 16.5, color: azul });
y += 1;
escribir("Desarrollador de software junior | Python · Full Stack", { negrita: true, tamaño: 10.83 });
y += 2;

const contactoY = y;
escribir("San José, Costa Rica | +506 6069 7544 | jfrangranadosmora@gmail.com", {
  tamaño: 8.89,
  enlace: "mailto:jfrangranadosmora@gmail.com",
});
y += 0.8;
const mitad = ancho / 2;
escribir("github.com/Ciscojes", {
  tamaño: 8.89,
  ancho: mitad,
  enlace: "https://github.com/Ciscojes",
});
const enlacesY = y;
escribir("linkedin.com/in/jesus-granados-ba9aab1b4", {
  x: 34 + mitad,
  y: enlacesY - 9,
  tamaño: 8.89,
  ancho: mitad,
  alinear: "right",
  enlace: "https://www.linkedin.com/in/jesus-granados-ba9aab1b4/",
});
y = Math.max(y, contactoY + 23);
escribir("Portafolio: ciscojes.github.io", { enlace: "https://ciscojes.github.io/", tamaño: 8.89 });

seccion("Perfil profesional");
escribir(
  "Desarrollador de software junior y Técnico en Redes. En ORQENTIVA desarrollo una API de reservas con FastAPI y PostgreSQL. En JobRadar colaboré en la interfaz con Next.js, las notificaciones y las pruebas. Me interesan los puestos junior de backend Python y Full Stack. Mi próxima formación en AI Engineering (Commit Academy) incluye el desarrollo de agentes de IA.",
  { tamaño: 8.95 },
);

seccion("Habilidades técnicas");
escribir("Backend y Full Stack: Python, FastAPI, APIs REST, JavaScript, TypeScript, React, Next.js, Node.js, Express, HTML y CSS.");
y += 0.4;
escribir("Datos y calidad: PostgreSQL, SQLite, SQLAlchemy, Alembic, migraciones, Pytest y documentación técnica.");
y += 0.4;
escribir("IA: Gemini, APIs de IA, RAG, OCR y bases de conocimiento. MCP en profundización.");
y += 0.4;
escribir("Entrega, redes y seguridad: Git, GitHub, Linux, Docker, GitHub Actions, CI/CD, routing, switching y ciberseguridad. Cloud/AWS y DevOps en formación.");

seccion("Proyectos técnicos");
proyecto("AICON Web - Gestión inmobiliaria y CRM", "Next.js · React · TypeScript · Supabase", "Catálogo y CRM con roles y políticas RLS. Especificaciones, migraciones, pruebas y seguridad en CI. En desarrollo.");
proyecto("JobRadar - Seguimiento y alertas de empleo", "Next.js · Python · FastAPI · PostgreSQL · Docker", "Proyecto colaborativo. Mi aporte: frontend Next.js, experiencia de producto, notificaciones y pruebas. API FastAPI y alertas Telegram.");
proyecto("Deciflujo - Control financiero para pymes", "Next.js · TypeScript · SQLite · PostgreSQL", "Finanzas multiempresa con roles, auditoría y cierres. Pruebas unitarias y E2E con SQLite y PostgreSQL. MVP en validación.");
proyecto("Tutor HTML y CSS con Gemini", "Node.js · Express · Gemini · SQLite FTS5 · RAG · OCR", "Consulta documentos con fuentes y genera ejercicios y tarjetas; extracción PDF/OCR, progreso y repaso espaciado.");
proyecto("Brújula Máster IA - Estudio de arquitectura y calidad", "JavaScript · PWA · Cloudflare Workers AI", "Tutor con fuentes, repaso espaciado y progreso local. Estudio sin conexión y tutor local de respaldo.");
escribir("Otros proyectos frontend: GathSession, Beauty Spa y Adam Keyes Portfolio. Demos en ciscojes.github.io.");

seccion("Experiencia");
proyecto(
  "Carpintero - AICON Edificadora | 2019-actualidad, Costa Rica",
  "Responsabilidad · Trabajo en equipo · Precisión · Resolución de problemas",
  "Instalación de puertas, muebles, gradas, artesonados y revestimientos según medidas, planos y requerimientos.",
);
proyecto(
  "Desarrollo de proyectos de software | 2026-actualidad",
  "Backend · Frontend · Bases de datos · Pruebas · Automatización · IA",
  "Desarrollo de AICON Web, JobRadar, Deciflujo, Brújula Máster IA y el tutor con IA, con código, documentación y pruebas.",
);

seccion("Educación");
escribir(
  "Máster en Desarrollo de Software con IA - BIG School | fase final: últimos módulos y entrega del proyecto final.\nPrograma de Desarrollo Web Full Stack - Conquer Blocks | en curso.\nCloud / AWS - Commit Academy | en curso, con prácticas de DevOps.\nTécnico en Redes - Universidad Castro Carazo | 2023, 450 horas, nota 91,66.\nBachiller en Educación Media - CONED, UNED y MEP | 2025.",
  { tamaño: 8.38, espacio: 0.15 },
);

seccion("Certificaciones destacadas");
escribir(
  "Fundamentos de AWS: Cloud, Serverless y Operación - Commit Academy (completado). Formación Cisco CCNAv7 y CCNP Enterprise; Cybersecurity Essentials; Full Stack con Python - VTEK; Chatbots y Agentes Inteligentes - TEC/FUNDATEC.",
  { tamaño: 8.09, espacio: 0.15 },
);

seccion("Idiomas y datos adicionales");
escribir(
  "Inglés: Ejecutivo en Inglés para Servicios, INA, 987 horas (2010-2012). Disponibilidad: remoto internacional o remoto/híbrido en Costa Rica. Licencia de motocicleta.",
  { tamaño: 8.26 },
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
