// Module de gestion du thème (mode sombre/clair)
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme();
    this.setupToggle();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateToggleButton();
    localStorage.setItem('theme', this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    
    // Tracker le changement de thème
    if (window.analytics) {
      window.analytics.trackThemeChange(this.theme);
    }
  }

  updateToggleButton() {
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.textContent = this.theme === 'light' ? '🌙' : '☀️';
      toggleBtn.setAttribute('aria-label',
        this.theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'
      );
    }
  }

  setupToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleTheme());
    }
  }

  // Méthode pour détecter la préférence système
  static getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

// Initialisation du gestionnaire de thème
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});

// Export pour utilisation dans d'autres modules
export { ThemeManager };