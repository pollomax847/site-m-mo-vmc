/**
 * Module d'aide pour le câblage des relais DSC (Dispositif de Sécurité Collective) par marque
 */

(function() {
  // Définir le contenu dans le namespace vmcContent
  if (typeof window.vmcContent === 'undefined') {
    window.vmcContent = {};
  }

  // Ajouter une section sur le câblage des relais DSC
  window.vmcContent['relais-dsc'] = {
    title: 'Câblage des Relais DSC par Marque',
    content: `
      <div class="section-container">
        <h2 class="section-title">Guide de câblage des Dispositifs de Sécurité Collective (DSC)</h2>
        
        <div class="warning-box">
          <h3>⚠️ Attention : Sécurité critique</h3>
          <p>Le DSC est un élément de sécurité essentiel pour les installations de VMC Gaz. Un mauvais câblage peut entraîner des risques d'intoxication au monoxyde de carbone potentiellement mortels. Le raccordement doit être réalisé par un professionnel qualifié.</p>
        </div>
        
        <h3>Principe de fonctionnement</h3>
        <p>Le Dispositif de Sécurité Collective (DSC) a pour fonction de couper l'alimentation en gaz en cas d'arrêt de la VMC. Ce système de sécurité est obligatoire dans toutes les installations où des appareils à gaz raccordés sont desservis par une VMC.</p>
        
        <div class="diagram-section">
          <h4>Schéma de principe général</h4>
          <pre class="ascii-art">
      ┌──────────────┐                  ┌──────────────┐
      │ Alimentation │                  │    VMC       │
      │   230V~      │────────┬─────────│    Moteur    │
      └──────────────┘        │         └──────────────┘
               │              │                 │
               │              │                 │
      ┌────────▼──────┐      │          ┌──────▼──────┐
      │Transformateur │      └──────────│  Pressostat  │
      │  230V~ / 24V~ │                 │ Différentiel │
      └────────┬──────┘                 └──────┬───────┘
               │                               │
      ┌────────▼───────────────────────────────▼──────┐
      │                                               │
      │                 Relais DSC                    │
      │                                               │
      └─────────────────────┬─────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │ Électrovannes │
                    │     GAZ       │
                    └───────────────┘</pre>
        </div>

        <h3>Raccordement par marque de fabricants</h3>
        
        <div class="accordion">
          <div class="accordion-item">
            <button class="accordion-header">ALDES</button>
            <div class="accordion-content">
              <h4>Modèles principaux</h4>
              <ul>
                <li>DSC 1000</li>
                <li>DSC 2000</li>
                <li>VEC microWatt +</li>
              </ul>
              
              <h4>Schéma de câblage ALDES DSC 2000</h4>
              <div class="wiring-diagram">
                <pre class="ascii-art">
  Bornier DSC ALDES                 Connexions
  ┌──────────────────┐            
  │ N       Ph       │  ← 230V~ Alimentation
  ├──────────────────┤
  │ 1        2       │  ← VMC (phase surveillée)
  ├──────────────────┤
  │ 3        4       │  ← Pressostat (contact NF)
  ├──────────────────┤            
  │ 5        6       │  ← 24V~ Électrovannes
  └──────────────────┘</pre>
              </div>
              
              <h4>Instructions de raccordement</h4>
              <ol>
                <li><strong>Alimentation</strong> : Raccorder le 230V~ sur les bornes N et Ph</li>
                <li><strong>Circuit de puissance VMC</strong> : Interrompre la phase de la VMC et la faire passer dans les bornes 1 et 2</li>
                <li><strong>Pressostat</strong> : Raccorder le pressostat différentiel sur les bornes 3 et 4 (circuit ouvert = défaut)</li>
                <li><strong>Électrovannes</strong> : Raccorder en série avec le circuit 24V~ aux bornes 5 et 6</li>
              </ol>
              
              <h4>Points spécifiques ALDES</h4>
              <ul>
                <li>Le relais thermique est intégré et préréglé</li>
                <li>Temporisation à la mise en sécurité : 15 secondes</li>
                <li>Réarmement manuel obligatoire après déclenchement</li>
                <li>Voyant rouge = défaut VMC</li>
                <li>Voyant vert = fonctionnement normal</li>
              </ul>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header">ATLANTIC / UNELVENT</button>
            <div class="accordion-content">
              <h4>Modèles principaux</h4>
              <ul>
                <li>SSG (Système Sécurité Gaz)</li>
                <li>DSC Atlantic 24V</li>
              </ul>
              
              <h4>Schéma de câblage Atlantic SSG</h4>
              <div class="wiring-diagram">
                <pre class="ascii-art">
  Bornier SSG ATLANTIC            Connexions
  ┌──────────────────┐            
  │ N       Ph       │  ← 230V~ Alimentation
  ├──────────────────┤
  │ VMC1    VMC2     │  ← VMC (phase surveillée)
  ├──────────────────┤
  │ PS1     PS2      │  ← Pressostat (contact NO)
  ├──────────────────┤            
  │ EV1     EV2      │  ← 24V~ Électrovannes
  └──────────────────┘</pre>
              </div>
              
              <h4>Instructions de raccordement</h4>
              <ol>
                <li><strong>Alimentation</strong> : Raccorder le 230V~ sur les bornes N et Ph avec terre obligatoire</li>
                <li><strong>Circuit VMC</strong> : Raccorder la phase de la VMC aux bornes VMC1 et VMC2</li>
                <li><strong>Pressostat</strong> : Raccorder aux bornes PS1 et PS2 (circuit fermé = fonctionnement normal)</li>
                <li><strong>Électrovannes</strong> : Raccorder en série aux bornes EV1 et EV2</li>
              </ol>
              
              <h4>Points spécifiques Atlantic</h4>
              <ul>
                <li>Version avec transformateur intégré ou externe selon modèle</li>
                <li>Sélecteur de courant 0,16A à 10A selon puissance VMC</li>
                <li>Bouton test de fonctionnement</li>
                <li>Temporisation au démarrage de 60 secondes</li>
                <li>Temporisation à la coupure de 10 secondes</li>
              </ul>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header">NATHER / VIM</button>
            <div class="accordion-content">
              <h4>Modèles principaux</h4>
              <ul>
                <li>DSC NATHER</li>
                <li>Vigitherm</li>
              </ul>
              
              <h4>Schéma de câblage NATHER Vigitherm</h4>
              <div class="wiring-diagram">
                <pre class="ascii-art">
  Bornier NATHER                  Connexions
  ┌──────────────────┐            
  │ 1        2       │  ← 230V~ Alimentation (Ph/N)
  ├──────────────────┤
  │ 3        4       │  ← VMC (surveillance intensité)
  ├──────────────────┤
  │ 5        6       │  ← Pressostat (NF)
  ├──────────────────┤            
  │ 7        8       │  ← Sortie vers électrovannes
  └──────────────────┘</pre>
              </div>
              
              <h4>Instructions de raccordement</h4>
              <ol>
                <li><strong>Alimentation</strong> : Raccorder le 230V~ aux bornes 1(Ph) et 2(N)</li>
                <li><strong>Circuit VMC</strong> : Insérer le câble de phase de la VMC dans le tore du DSC puis raccorder aux bornes 3 et 4</li>
                <li><strong>Pressostat</strong> : Raccorder aux bornes 5 et 6 (contact normalement fermé)</li>
                <li><strong>Électrovannes</strong> : Raccorder aux bornes 7 et 8</li>
              </ol>
              
              <h4>Points spécifiques NATHER</h4>
              <ul>
                <li>Transformateur intégré avec protection par fusible 200mA</li>
                <li>Calibreur d'intensité minimale réglable (0,1A à 2A)</li>
                <li>Double sécurité : intensité ET pression</li>
                <li>Interrupteur de test intégré</li>
              </ul>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header">SEBICO / ANJOS</button>
            <div class="accordion-content">
              <h4>Modèles principaux</h4>
              <ul>
                <li>DSC Sebico</li>
                <li>Vigichauf Anjos</li>
              </ul>
              
              <h4>Schéma de câblage SEBICO</h4>
              <div class="wiring-diagram">
                <pre class="ascii-art">
  Bornier SEBICO                  Connexions
  ┌──────────────────┐            
  │ A1       A2      │  ← 230V~ Alimentation
  ├──────────────────┤
  │ I1       I2      │  ← Entrée intensité VMC
  ├──────────────────┤
  │ P1       P2      │  ← Pressostat
  ├──────────────────┤            
  │ S+       S-      │  ← 24V~ Électrovannes
  └──────────────────┘</pre>
              </div>
              
              <h4>Instructions de raccordement</h4>
              <ol>
                <li><strong>Alimentation</strong> : 230V~ sur bornes A1 et A2</li>
                <li><strong>Circuit VMC</strong> : Faire passer le câble de phase de la VMC à travers le transformateur d'intensité, puis raccorder aux bornes I1 et I2</li>
                <li><strong>Pressostat</strong> : Raccorder aux bornes P1 et P2</li>
                <li><strong>Électrovannes</strong> : Sortie 24V~ aux bornes S+ et S-</li>
              </ol>
              
              <h4>Points spécifiques SEBICO</h4>
              <ul>
                <li>Sélecteur pour type de VMC (standard/basse consommation)</li>
                <li>Voyant tricolore: vert (OK), orange (attente), rouge (défaut)</li>
                <li>Buzzer intégré pour alarme défaut</li>
                <li>Temporisation démarrage : 40 secondes</li>
                <li>Temporisation défaut : 6 secondes</li>
              </ul>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header">SEIFEL</button>
            <div class="accordion-content">
              <h4>Modèles principaux</h4>
              <ul>
                <li>Vigidep</li>
                <li>Vigico</li>
              </ul>
              
              <h4>Schéma de câblage SEIFEL Vigidep</h4>
              <div class="wiring-diagram">
                <pre class="ascii-art">
  Bornier SEIFEL                  Connexions
  ┌──────────────────┐            
  │ L        N       │  ← 230V~ Alimentation
  ├──────────────────┤
  │ 1        2       │  ← VMC (boucle de courant)
  ├──────────────────┤
  │ 3        4       │  ← Pressostat (NC)
  ├──────────────────┤            
  │ 5        6       │  ← 24V~ Électrovannes
  └──────────────────┘</pre>
              </div>
              
              <h4>Instructions de raccordement</h4>
              <ol>
                <li><strong>Alimentation</strong> : 230V~ sur bornes L et N (borne terre disponible)</li>
                <li><strong>Circuit VMC</strong> : Faire passer le fil de phase dans la boucle de courant puis raccorder aux bornes 1 et 2</li>
                <li><strong>Pressostat</strong> : Raccorder en contact normalement fermé aux bornes 3 et 4</li>
                <li><strong>Électrovannes</strong> : Circuit 24V~ de l'électrovanne sur les bornes 5 et 6</li>
              </ol>
              
              <h4>Points spécifiques SEIFEL</h4>
              <ul>
                <li>Sélecteur de tension (12V ou 24V) pour électrovannes</li>
                <li>Contrôle d'intensité à minimum de courant réglable</li>
                <li>Position "test" pour vérification circuit électrovanne</li>
                <li>Fusible de protection intégré pour le circuit 24V</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3>Recommandations générales de câblage</h3>
        <div class="recommendations">
          <ul>
            <li><strong>Section des câbles</strong> : Alimentation = 1,5mm², Circuit EV = 1mm² minimum</li>
            <li><strong>Protection</strong> : Disjoncteur dédié pour le DSC (2A courbe C)</li>
            <li><strong>Mise à la terre</strong> : Obligatoire sur le DSC et la VMC</li>
            <li><strong>Emplacement</strong> : Le DSC doit être accessible pour le réarmement manuel</li>
            <li><strong>Électrovanne</strong> : À rupture de courant (NF) et à réarmement manuel exclusivement</li>
          </ul>
        </div>
        
        <h3>Procédure de test obligatoire</h3>
        <div class="test-procedure">
          <ol>
            <li><strong>Installation complète</strong> : Vérifier tous les raccordements</li>
            <li><strong>Test de fonctionnement normal</strong> : Mettre sous tension, attendre fin temporisation</li>
            <li><strong>Test de coupure VMC</strong> : Couper l'alimentation de la VMC et vérifier que le DSC coupe le circuit gaz (max. 15 secondes)</li>
            <li><strong>Test pressostat</strong> : Pincer un tube de prise de pression et vérifier que le DSC coupe le circuit gaz</li>
            <li><strong>Vérification réarmement</strong> : Après rétablissement VMC, le réarmement doit être manuel</li>
          </ol>
        </div>
        
        <div class="maintenance-guide">
          <h3>Maintenance et contrôle périodique</h3>
          <ul>
            <li>Test fonctionnel obligatoire lors de l'entretien annuel de la VMC Gaz</li>
            <li>Vérification du pressostat (tubes de raccordement, propreté des prises)</li>
            <li>Contrôle visuel des connexions électriques</li>
            <li>Test complet de la chaîne de sécurité</li>
            <li>Remplacement du DSC recommandé après 10 ans ou 5 déclenchements</li>
          </ul>
        </div>
        
        <div class="troubleshooting">
          <h3>Diagnostic des pannes courantes</h3>
          <table class="technical-table">
            <tr>
              <th>Problème</th>
              <th>Cause probable</th>
              <th>Solution</th>
            </tr>
            <tr>
              <td>Le DSC se déclenche sans raison apparente</td>
              <td>Courant VMC trop faible, pressostat défectueux</td>
              <td>Vérifier calibrage intensité, nettoyer pressostat</td>
            </tr>
            <tr>
              <td>Impossible de réarmer après déclenchement</td>
              <td>VMC non rétablie, électrovanne bloquée</td>
              <td>Vérifier fonctionnement VMC, remplacer électrovanne</td>
            </tr>
            <tr>
              <td>Pas de coupure gaz lors d'un arrêt VMC</td>
              <td>Circuit DSC défectueux, câblage incorrect</td>
              <td>Vérifier connexions, remplacer DSC</td>
            </tr>
            <tr>
              <td>Voyant défaut allumé en permanence</td>
              <td>Pressostat mal réglé, câble VMC non passé dans tore</td>
              <td>Ajuster réglage pressostat, vérifier passage câble</td>
            </tr>
            <tr>
              <td>DSC non alimenté</td>
              <td>Fusible, disjoncteur, alimentation</td>
              <td>Vérifier continuité circuit, remplacer fusible</td>
            </tr>
          </table>
        </div>
        
        <div class="regulation-note">
          <h3>Réglementation applicable</h3>
          <ul>
            <li>Arrêté du 30 mai 1989 : sécurité collective VMC Gaz</li>
            <li>NF DTU 68.3 : Installation VMC Gaz</li>
            <li>NF DTU 61.1 : Installations gaz</li>
            <li>Norme XP P 50-410 : Règles maintenance VMC Gaz</li>
            <li>Arrêté du 25 avril 1985 : contrôle périodique et entretien des installations</li>
          </ul>
        </div>
      </div>
    `
  };

  // Initialiser le module lorsque le DOM est chargé
  document.addEventListener('DOMContentLoaded', function() {
    // Si la fonction loadContent existe, ajouter des options au menu
    if (typeof loadContent === 'function') {
      const mainMenu = document.getElementById('mainMenu');
      if (mainMenu) {
        const menuItem = document.createElement('li');
        menuItem.innerHTML = '<a href="#relais-dsc">Câblage DSC</a>';
        mainMenu.appendChild(menuItem);
      }
    }
    
    // Réagir aux événements de chargement de section
    document.addEventListener('contentLoaded', function(event) {
      if (event.detail.section === 'relais-dsc') {
        console.log('Section câblage DSC chargée');
        
        // Initialiser l'accordéon
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
          header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
              content.style.maxHeight = null;
            } else {
              content.style.maxHeight = content.scrollHeight + "px";
            }
          });
        });
      }
    });
  });
  
  // Ajouter au menu mobile également
  document.addEventListener('mobileMenuCreated', function() {
    const mobileMenu = document.querySelector('.side-menu nav ul');
    if (mobileMenu) {
      const mobileMenuItem = document.createElement('li');
      mobileMenuItem.innerHTML = '<a href="#" data-section="relais-dsc" style="display:block;padding:12px 15px;background-color:#f5f5f5;border-radius:8px;color:#333;text-decoration:none;font-weight:500;">Câblage DSC</a>';
      mobileMenu.appendChild(mobileMenuItem);
    }
  });
})();
