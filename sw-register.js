// Enregistrement du Service Worker seulement si le protocole est http ou https
if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
  let deferredPrompt = null;
  let isInstalling = false;
  
  window.addEventListener('load', () => {
    // Création et affichage du spinner de progression
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container hidden';
    progressContainer.innerHTML = `
      <div class="progress-overlay"></div>
      <div class="progress-box">
        <h3>Téléchargement en cours</h3>
        <div class="spinner"></div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: 0%"></div>
        </div>
        <div class="progress-text">0%</div>
      </div>
    `;
    document.body.appendChild(progressContainer);
    
    // Enregistrement du service worker
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('Service Worker enregistré avec succès:', registration.scope);
        
        // Vérifier l'état d'installation
        verifierStatutInstallation(registration);
        
        // Gérer les mises à jour du service worker
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            isInstalling = true;
            afficherConteneurProgression();
            
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('Nouveau contenu disponible, rechargement nécessaire');
                  afficherNotificationMiseAJour();
                } else {
                  console.log('Application prête pour une utilisation hors ligne');
                  cacherConteneurProgression();
                }
                isInstalling = false;
              }
            };
          }
        };
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
        cacherConteneurProgression();
      });
      
    // Écouteur pour les messages du service worker (pour la progression)
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.type === 'DOWNLOAD_PROGRESS') {
        miseAJourBarreProgression(event.data.progress);
      }
      
      if (event.data && event.data.type === 'DOWNLOAD_COMPLETE') {
        setTimeout(() => {
          cacherConteneurProgression();
        }, 500);
      }
      
      if (event.data && event.data.type === 'INSTALLATION_STATUS') {
        if (event.data.isInstalled) {
          console.log('Service worker déjà installé');
        }
      }
    });
    
    // Création de la bannière d'installation
    const bannierInstallation = document.createElement('div');
    bannierInstallation.className = 'install-banner hidden';
    bannierInstallation.innerHTML = `
      <div class="install-message">
        <img src="./logo.png" alt="Logo Mémo VMC" class="install-logo">
        <p>Installez cette application pour un accès hors ligne et une meilleure expérience.</p>
      </div>
      <div class="install-actions">
        <button class="btn-dismiss">Pas maintenant</button>
        <button class="btn-install">Installer</button>
      </div>
    `;
    document.body.appendChild(bannierInstallation);
    
    // Écouteur pour l'événement beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // Empêcher Chrome 67+ de montrer automatiquement la bannière d'installation
      e.preventDefault();
      // Stocker l'événement pour pouvoir le déclencher plus tard
      deferredPrompt = e;
      
      // Vérifier si l'utilisateur a déjà refusé l'installation
      if (!localStorage.getItem('installationRefusee')) {
        setTimeout(() => {
          afficherBanniereInstallation();
        }, 3000);
      }
    });
    
    // Écouter le bouton d'installation
    document.querySelector('.btn-install')?.addEventListener('click', () => {
      const banniere = document.querySelector('.install-banner');
      if (banniere) banniere.classList.add('hidden');
      
      if (deferredPrompt) {
        deferredPrompt.prompt();
        
        deferredPrompt.userChoice.then((choixUtilisateur) => {
          if (choixUtilisateur.outcome === 'accepted') {
            console.log('Utilisateur a accepté l\'installation');
          } else {
            console.log('Utilisateur a refusé l\'installation');
          }
          deferredPrompt = null;
        });
      }
    });
    
    // Écouter le bouton de rejet
    document.querySelector('.btn-dismiss')?.addEventListener('click', () => {
      cacherBanniereInstallation();
      // Stocker le rejet pour ne pas redemander immédiatement
      localStorage.setItem('installationRefusee', 'true');
      // Programmer une nouvelle tentative dans 3 jours
      const maintenant = new Date();
      localStorage.setItem('dateRefusInstallation', maintenant.getTime());
    });
    
    // Vérifier si on doit afficher à nouveau la bannière d'installation (après 3 jours)
    const verifierInvitationInstallation = () => {
      if (localStorage.getItem('installationRefusee')) {
        const dateRefus = parseInt(localStorage.getItem('dateRefusInstallation') || '0');
        const maintenant = new Date();
        const troisJours = 3 * 24 * 60 * 60 * 1000; // 3 jours en millisecondes
        
        if (maintenant.getTime() - dateRefus > troisJours) {
          // Réinitialiser les paramètres de rejet après 3 jours
          localStorage.removeItem('installationRefusee');
          localStorage.removeItem('dateRefusInstallation');
        }
      }
    };
    
    verifierInvitationInstallation();
  });
  
  // Fonctions utilitaires
  function verifierStatutInstallation(registration) {
    if (registration.active) {
      // Service worker actif - demander l'état d'installation
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          action: 'GET_INSTALLATION_STATUS'
        });
      }
    }
  }
  
  function afficherConteneurProgression() {
    const conteneur = document.querySelector('.progress-container');
    if (conteneur) conteneur.classList.remove('hidden');
  }
  
  function cacherConteneurProgression() {
    const conteneur = document.querySelector('.progress-container');
    if (conteneur) conteneur.classList.add('hidden');
  }
  
  function miseAJourBarreProgression(progression) {
    const barreProgression = document.querySelector('.progress-fill');
    const texteProgression = document.querySelector('.progress-text');
    
    if (barreProgression && texteProgression) {
      barreProgression.style.width = `${progression}%`;
      texteProgression.textContent = `${progression}%`;
      
      if (progression === 100) {
        setTimeout(() => {
          cacherConteneurProgression();
        }, 1000);
      }
    }
  }
  
  function afficherNotificationMiseAJour() {
    // On pourrait ajouter une notification de mise à jour disponible
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
      <p>Une nouvelle version est disponible !</p>
      <button onclick="window.location.reload()">Mettre à jour</button>
    `;
    document.body.appendChild(notification);
  }
  
  function afficherBanniereInstallation() {
    const banniere = document.querySelector('.install-banner');
    if (banniere) banniere.classList.remove('hidden');
  }
  
  function cacherBanniereInstallation() {
    const banniere = document.querySelector('.install-banner');
    if (banniere) banniere.classList.add('hidden');
  }
} // Close the outermost block