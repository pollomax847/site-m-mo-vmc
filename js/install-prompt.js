// install-prompt.js
// Gestion de l'installation PWA et notifications push

export function setupPWAPrompt() {
  let deferredPrompt;
  const installBtn = document.createElement('button');
  installBtn.textContent = '📲 Installer Mémo VMC';
  installBtn.className = 'btn btn-primary install-pwa-btn';
  installBtn.style.position = 'fixed';
  installBtn.style.bottom = '20px';
  installBtn.style.right = '20px';
  installBtn.style.zIndex = '10000';
  installBtn.style.display = 'none';

  document.body.appendChild(installBtn);

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        installBtn.style.display = 'none';
      }
      deferredPrompt = null;
    }
  });

  // Optionnel : masquer le bouton si déjà installé
  window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
  });
}

// Notifications push (exemple de base)
export function askNotificationPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') return;
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification('Merci d\'activer les notifications Mémo VMC !');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupPWAPrompt();
  // Demander la permission de notification après 10s
  setTimeout(askNotificationPermission, 10000);
});
