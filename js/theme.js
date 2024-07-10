document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  const logo = document.getElementById('logo');

  // Função para atualizar a logo com base no tema
  function updateLogo(theme) {
    if (theme === 'dark') {
      logo.src = 'src/Logo_tema_escuro144px.png';
    } else {
      logo.src = 'src/Logo_tema_claro144px.png';
    }
  }

  // Inicializa o tema e a logo
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.classList.add(currentTheme);
    updateLogo(currentTheme);

    if (currentTheme === 'dark') {
      themeToggle.checked = true;
    }
  }

  // Adiciona o listener para alternar entre temas
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.replace('light', 'dark');
      localStorage.setItem('theme', 'dark');
      updateLogo('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.replace('dark', 'light');
      localStorage.setItem('theme', 'light');
      updateLogo('light');
    }
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/js/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }, err => {
        console.log('Service Worker registration failed:', err);
      });
  });
}
