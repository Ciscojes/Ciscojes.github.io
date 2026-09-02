import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const carpeta = path.dirname(fileURLToPath(import.meta.url));
const fuentesEstandar = `${path.join(carpeta, "node_modules", "pdfjs-dist", "standard_fonts")}${path.sep}`;
const archivos = [
  ["CV visual", path.join(carpeta, "Jesus_Granados_CV_ATS.pdf")],
  ["CV ATS", path.join(carpeta, "Jesus_Granados_CV_ATS_una_columna.pdf")],
];

const datosCanonicos = [
  "Jesús Francisco Granados Mora",
  "Desarrollador Full Stack Junior",
  "Técnico en Redes",
  "AICON Edificadora",
  "2019",
  "Desarrollo de proyectos de software",
  "JobRadar",
  "Tutor HTML y CSS",
  "GathSession",
  "Beauty Spa",
  "Adam Keyes Portfolio",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "SQLAlchemy",
  "Docker",
  "Pytest",
  "GitHub Actions",
  "JavaScript",
  "Node.js",
  "Express",
  "Sass",
  "Vite",
  "Gemini",
  "RAG",
  "OCR",
  "MCP",
  "CCNA",
  "CCNP",
  "BIG School",
  "Conquer Blocks",
  "Ejecutivo en Inglés para Servicios",
];

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

async function extraerPdf(archivo) {
  const datos = new Uint8Array(fs.readFileSync(archivo));
  const pdf = await getDocument({ data: datos, standardFontDataUrl: fuentesEstandar }).promise;
  let texto = "";
  let enlaces = 0;

  for (let pagina = 1; pagina <= pdf.numPages; pagina += 1) {
    const paginaPdf = await pdf.getPage(pagina);
    const contenido = await paginaPdf.getTextContent();
    const anotaciones = await paginaPdf.getAnnotations();
    enlaces += anotaciones.filter((anotacion) => anotacion.url).length;
    texto += `${contenido.items.map((item) => item.str).join(" ")} `;
  }

  return { paginas: pdf.numPages, texto, enlaces };
}

const html = fs.readFileSync(path.join(carpeta, "..", "index.html"), "utf8");
const textoWeb = normalizar(html.replace(/<[^>]+>/g, " "));
const ausentesWeb = datosCanonicos.filter((dato) => !textoWeb.includes(normalizar(dato)));

console.log(`Datos canónicos presentes en la web: ${datosCanonicos.length - ausentesWeb.length}/${datosCanonicos.length}`);
if (ausentesWeb.length > 0) {
  console.error(`Ausentes en la web: ${ausentesWeb.join(", ")}`);
  process.exitCode = 1;
}

for (const [nombre, archivo] of archivos) {
  const resultado = await extraerPdf(archivo);
  const textoPdf = normalizar(resultado.texto);
  const faltantes = datosCanonicos.filter((dato) => !textoPdf.includes(normalizar(dato)));
  const cobertura = ((datosCanonicos.length - faltantes.length) / datosCanonicos.length) * 100;

  console.log(`\n${nombre}`);
  console.log(`Páginas: ${resultado.paginas}`);
  console.log(`Caracteres extraídos: ${resultado.texto.length}`);
  console.log(`Enlaces detectados: ${resultado.enlaces}`);
  console.log(`Similitud por cobertura de datos web: ${cobertura.toFixed(1)}% (${datosCanonicos.length - faltantes.length}/${datosCanonicos.length})`);

  if (faltantes.length > 0) {
    console.error(`Faltantes: ${faltantes.join(", ")}`);
  }
  if (resultado.paginas !== 1 || resultado.enlaces < 3 || cobertura < 100) {
    process.exitCode = 1;
  }
}

if (!process.exitCode) {
  console.log("\nValidación correcta: ambos CV tienen una página, texto extraíble y 100% de cobertura de los datos canónicos de la web.");
}
