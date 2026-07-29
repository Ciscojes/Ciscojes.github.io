import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const carpeta = path.dirname(fileURLToPath(import.meta.url));
const archivo = path.join(carpeta, "Jesus_Granados_CV_ATS.pdf");
const datos = new Uint8Array(fs.readFileSync(archivo));
const pdf = await getDocument({ data: datos }).promise;

let texto = "";
let enlaces = 0;
for (let pagina = 1; pagina <= pdf.numPages; pagina += 1) {
  const paginaPdf = await pdf.getPage(pagina);
  const contenido = await paginaPdf.getTextContent();
  const anotaciones = await paginaPdf.getAnnotations();
  enlaces += anotaciones.filter((anotacion) => anotacion.url).length;
  texto += contenido.items.map((item) => item.str).join(" ");
}

const requisitos = [
  "JESÚS FRANCISCO GRANADOS MORA",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "AICON Edificadora",
  "JobRadar",
  "Tutor HTML y CSS",
  "BIG School",
  "Conquer Blocks",
  "Ejecutivo en Inglés para Servicios",
];

const faltantes = requisitos.filter((requisito) => !texto.includes(requisito));

console.log(`Páginas: ${pdf.numPages}`);
console.log(`Caracteres extraídos: ${texto.length}`);
console.log(`Campos requeridos encontrados: ${requisitos.length - faltantes.length}/${requisitos.length}`);
console.log(`Enlaces detectados: ${enlaces}`);

if (pdf.numPages !== 1 || faltantes.length > 0 || enlaces < 3) {
  if (faltantes.length > 0) console.error(`Faltantes: ${faltantes.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log("Validación ATS correcta: una página y texto extraíble.");
}
