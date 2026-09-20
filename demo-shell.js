window.setupDemoShell = ({ translations = {}, onLanguageChange } = {}) => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('portfolio-theme');
  const systemTheme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  root.dataset.theme = storedTheme || systemTheme;

  const updateThemeMeta = () => document.querySelector('meta[name="theme-color"]')?.setAttribute('content', root.dataset.theme === 'dark' ? '#0b0d0c' : '#f3f1e9');
  updateThemeMeta();
  document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', root.dataset.theme);
    updateThemeMeta();
  });

  const applyLanguage = requestedLanguage => {
    const language = translations[requestedLanguage] ? requestedLanguage : 'es';
    root.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = translations[language]?.[element.dataset.i18n];
      if (value) element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const value = translations[language]?.[element.dataset.i18nPlaceholder];
      if (value) element.placeholder = value;
    });
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    localStorage.setItem('portfolio-lang', language);
    onLanguageChange?.(language);
  };

  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));
  const detected = (navigator.languages?.[0] || navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  applyLanguage(localStorage.getItem('portfolio-lang') || detected);
  return { applyLanguage };
};
