// Module Google Analytics 4
class AnalyticsManager {
  constructor(measurementId = 'G-XXXXXXXXXX') {
    this.measurementId = measurementId;
    this.isEnabled = this.checkConsent();
    this.init();
  }

  checkConsent() {
    // Vérifier le consentement (peut être étendu avec un système de cookies)
    return localStorage.getItem('analytics-consent') === 'true';
  }

  enableAnalytics() {
    localStorage.setItem('analytics-consent', 'true');
    this.isEnabled = true;
    this.loadGA();
  }

  disableAnalytics() {
    localStorage.setItem('analytics-consent', 'false');
    this.isEnabled = false;
    // Désactiver GA si chargé
    if (window.gtag) {
      window.gtag('config', this.measurementId, { 'anonymize_ip': false });
    }
  }

  init() {
    if (this.isEnabled) {
      this.loadGA();
    }
  }

  loadGA() {
    // Charger Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', this.measurementId, {
      'anonymize_ip': true,
      'allow_google_signals': false,
      'allow_ad_personalization_signals': false
    });
  }

  // Tracking des événements
  trackEvent(action, category, label = null, value = null) {
    if (!this.isEnabled || !window.gtag) return;

    const eventData = {
      event_category: category,
      event_label: label,
      value: value
    };

    window.gtag('event', action, eventData);
  }

  // Tracking des pages vues
  trackPageView(pageTitle, pagePath) {
    if (!this.isEnabled || !window.gtag) return;

    window.gtag('config', this.measurementId, {
      page_title: pageTitle,
      page_path: pagePath
    });
  }

  // Tracking des sections
  trackSectionView(section) {
    this.trackPageView(`Section: ${section}`, `/${section}`);
    this.trackEvent('section_view', 'navigation', section);
  }

  // Tracking des calculs
  trackCalculation(type, result) {
    this.trackEvent('calculation', 'tool_usage', type, result);
  }

  // Tracking des exports PDF
  trackPDFExport(filename) {
    this.trackEvent('export_pdf', 'downloads', filename);
  }

  // Tracking du changement de thème
  trackThemeChange(theme) {
    this.trackEvent('theme_change', 'user_preference', theme);
  }
}

// Bannière de consentement pour les cookies
class ConsentBanner {
  constructor(analyticsManager) {
    this.analyticsManager = analyticsManager;
    this.init();
  }

  init() {
    if (!this.analyticsManager.isEnabled && !localStorage.getItem('consent-banner-dismissed')) {
      this.showBanner();
    }
  }

  showBanner() {
    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.innerHTML = `
      <div class="consent-content">
        <p>Ce site utilise Google Analytics pour améliorer votre expérience. Acceptez-vous l'utilisation de cookies à des fins statistiques ?</p>
        <div class="consent-buttons">
          <button id="accept-analytics" class="btn btn-primary">Accepter</button>
          <button id="decline-analytics" class="btn btn-secondary">Refuser</button>
        </div>
      </div>
    `;

    // Styles de la bannière
    banner.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 15px;
      z-index: 10000;
      font-size: 14px;
    `;

    document.body.appendChild(banner);

    // Événements
    document.getElementById('accept-analytics').addEventListener('click', () => {
      this.analyticsManager.enableAnalytics();
      this.hideBanner();
    });

    document.getElementById('decline-analytics').addEventListener('click', () => {
      this.analyticsManager.disableAnalytics();
      this.hideBanner();
    });
  }

  hideBanner() {
    const banner = document.getElementById('consent-banner');
    if (banner) {
      banner.remove();
    }
    localStorage.setItem('consent-banner-dismissed', 'true');
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Remplacer par votre vrai Measurement ID GA4
  const analytics = new AnalyticsManager('G-XXXXXXXXXX');
  window.analytics = analytics;

  // Bannière de consentement
  new ConsentBanner(analytics);

  // Tracking des changements de section
  document.addEventListener('contentLoaded', (event) => {
    analytics.trackSectionView(event.detail.section);
  });
});

export { AnalyticsManager, ConsentBanner };