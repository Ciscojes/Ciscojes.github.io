import "./scss/main.scss";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-boton-menu]");
const navLinks = [...document.querySelectorAll(".menu a")];

const closeNavigation = () => {
  nav.classList.remove("abierto");
  navToggle.classList.remove("activo");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menú");
};

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("abierto");
  navToggle.classList.toggle("activo", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

navLinks.forEach((link) => link.addEventListener("click", closeNavigation));

window.addEventListener(
  "scroll",
  () => header.classList.toggle("con-fondo", window.scrollY > 24),
  { passive: true },
);

const observedSections = [...document.querySelectorAll("main section[id]")];
const seccionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("activo", active);
      });
    });
  },
  { rootMargin: "-25% 0px -65%" },
);

observedSections.forEach((seccion) => seccionObserver.observe(seccion));

const animarTargets = document.querySelectorAll(
  ".habilidad, .proyecto, .experiencia-item, .estudios-actuales article, .academias details",
);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  animarTargets.forEach((target) => target.classList.add("animar"));

  const animarObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  animarTargets.forEach((target) => animarObserver.observe(target));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
