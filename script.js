const translations = {
  es: {
    skip: 'Saltar al contenido', menu: 'Abrir menú', navWork: 'Proyectos', navExperience: 'Experiencia', navAbout: 'Perfil', navContact: 'Contacto',
    availability: 'Disponibilidad inmediata', heroKicker: 'Desarrollo productos digitales de punta a punta',
    heroTitle: 'Convierto operaciones<br />complejas en software<br /><em>simple de usar.</em>',
    heroBody: 'Desarrollador full-stack con más de cuatro años creando interfaces, APIs y flujos críticos para una plataforma SaaS hotelera.',
    viewWork: 'Ver proyectos', emailMe: 'Escríbeme', years: 'años construyendo SaaS', modules: 'módulos de negocio',
    endToEnd: 'frontend, API, datos y pruebas', localized: 'productos internacionalizados', selectedWork: 'Trabajo seleccionado',
    workTitle: 'Demos que enseñan<br />cómo <em>pienso y construyo.</em>',
    workIntro: 'Tres productos originales con datos sintéticos. Cada uno demuestra una parte distinta de mi experiencia sin exponer trabajo confidencial.',
    liveDemo: 'Demo interactiva', dashboardDescription: 'Panel operativo para priorizar solicitudes, explorar métricas y exportar información. Incluye filtros, búsqueda y estados reales de interfaz.',
    responsiveUi: 'Interfaz responsive y accesible', exportCsv: 'Exportación CSV', openDemo: 'Abrir demo',
    chatDescription: 'Bandeja de mensajería con conversaciones, estados de entrega, conexión inestable, reintentos y comportamiento móvil.',
    apiDescription: 'Explorador de una API de check-in: contratos REST, validación, respuestas HTTP, autenticación simulada y casos de error.',
    experience: 'Experiencia', experienceTitle: 'Más de cuatro años<br />entregando <em>producto real.</em>',
    experienceSummary: 'Toda mi experiencia profesional corresponde a Norelian, donde trabajé de punta a punta en una plataforma multi-tenant para operaciones hoteleras.',
    roleTitle: 'Desarrollador Full-Stack',
    roleBody: 'Desarrollo y mantenimiento de GuestHub, una plataforma SaaS para reservaciones, solicitudes, tareas, check-in, comunicaciones, reseñas, restaurantes, reportes y administración de propiedades.',
    product: 'Producto', productBody: 'Interfaces complejas, formularios, buscadores, dashboards, chat, reportes y flujos para huéspedes.',
    engineering: 'Ingeniería', engineeringBody: 'APIs REST, MongoDB, validación, autenticación, migraciones, pruebas y soporte de producción.',
    collaboration: 'Colaboración', collaborationBody: 'Git, Azure DevOps, pull requests, resolución de conflictos y entregas frecuentes.',
    stackTitle: 'Herramientas que uso para<br /><em>llevar ideas a producción.</em>', profile: 'Perfil',
    aboutTitle: 'Me gusta entender el sistema<br />completo, no sólo <em>mi pantalla.</em>',
    aboutBody: 'Puedo seguir una funcionalidad desde la experiencia del usuario hasta la API y los datos. Me siento cómodo entrando en código existente, reproduciendo un problema, encontrando la causa raíz y protegiendo la solución con pruebas.',
    aboutGoal: 'Busco un equipo donde pueda aportar experiencia práctica, seguir elevando la calidad técnica y construir productos que resuelvan problemas reales.',
    contact: 'Contacto', availabilityShort: 'Disponibilidad inmediata', contactKicker: '¿Estás formando un equipo o construyendo algo útil?',
    contactTitle: 'Hablemos de la<br /><em>próxima oportunidad.</em>', backTop: 'Volver arriba'
  },
  en: {
    skip: 'Skip to content', menu: 'Open menu', navWork: 'Projects', navExperience: 'Experience', navAbout: 'Profile', navContact: 'Contact',
    availability: 'Available immediately', heroKicker: 'I build digital products end to end',
    heroTitle: 'I turn complex<br />operations into software<br /><em>people can use.</em>',
    heroBody: 'Full-stack developer with 4+ years building interfaces, APIs, and critical workflows for a hospitality SaaS platform.',
    viewWork: 'View projects', emailMe: 'Email me', years: 'years building SaaS', modules: 'business modules',
    endToEnd: 'frontend, API, data, and tests', localized: 'localized products', selectedWork: 'Selected work',
    workTitle: 'Demos that show<br />how I <em>think and build.</em>',
    workIntro: 'Three original products using synthetic data. Each one demonstrates a different part of my experience without exposing confidential work.',
    liveDemo: 'Interactive demo', dashboardDescription: 'An operations dashboard for prioritizing requests, exploring metrics, and exporting data, with filters, search, and complete UI states.',
    responsiveUi: 'Responsive, accessible UI', exportCsv: 'CSV export', openDemo: 'Open demo',
    chatDescription: 'A messaging inbox with conversations, delivery states, unstable-connection simulation, retries, and mobile behavior.',
    apiDescription: 'A check-in API explorer covering REST contracts, validation, HTTP responses, simulated authentication, and error cases.',
    experience: 'Experience', experienceTitle: 'Over four years<br />shipping <em>real product.</em>',
    experienceSummary: 'My entire professional experience is at Norelian, where I worked end to end on a multi-tenant platform for hotel operations.',
    roleTitle: 'Full-Stack Developer',
    roleBody: 'Development and maintenance of GuestHub, a SaaS platform for reservations, requests, tasks, check-in, communications, reviews, restaurants, reporting, and property administration.',
    product: 'Product', productBody: 'Complex interfaces, forms, search, dashboards, chat, reports, and guest-facing workflows.',
    engineering: 'Engineering', engineeringBody: 'REST APIs, MongoDB, validation, authentication, migrations, testing, and production support.',
    collaboration: 'Collaboration', collaborationBody: 'Git, Azure DevOps, pull requests, conflict resolution, and frequent releases.',
    stackTitle: 'Tools I use to take ideas<br /><em>all the way to production.</em>', profile: 'Profile',
    aboutTitle: 'I like understanding the whole<br />system, not just <em>my screen.</em>',
    aboutBody: 'I can follow a feature from the user experience down to the API and data. I am comfortable entering an existing codebase, reproducing a problem, finding the root cause, and protecting the solution with tests.',
    aboutGoal: 'I am looking for a team where I can contribute practical experience, keep raising technical quality, and build products that solve real problems.',
    contact: 'Contact', availabilityShort: 'Available immediately', contactKicker: 'Building a team or working on something useful?',
    contactTitle: 'Let’s talk about the<br /><em>next opportunity.</em>', backTop: 'Back to top'
  }
};

const root = document.documentElement;
const storedTheme = localStorage.getItem('portfolio-theme');
const systemTheme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
root.dataset.theme = storedTheme || systemTheme;

const updateThemeMeta = () => {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', root.dataset.theme === 'dark' ? '#0b0d0c' : '#f3f1e9');
};
updateThemeMeta();

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  updateThemeMeta();
});

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation?.classList.toggle('open', !open);
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const setLanguage = language => {
  const lang = translations[language] ? language : 'es';
  root.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = translations[lang][element.dataset.i18n];
    if (value) element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const value = translations[lang][element.dataset.i18nHtml];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  localStorage.setItem('portfolio-lang', lang);
};
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
const browserLanguage = navigator.languages?.[0] || navigator.language || 'es';
setLanguage(localStorage.getItem('portfolio-lang') || (browserLanguage.toLowerCase().startsWith('en') ? 'en' : 'es'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));

const updateClock = () => {
  const clock = document.querySelector('#local-time');
  if (clock) clock.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Montevideo', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
};
document.querySelector('#year').textContent = String(new Date().getFullYear());
updateClock();
setInterval(updateClock, 30_000);
