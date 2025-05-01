/**
 * Module spécifique pour les branchements des relais DSC par constructeur
 * Compare les différentes marques et leur spécificités
 */

(function() {
  // Définir le contenu dans le namespace vmcContent
  if (typeof window.vmcContent === 'undefined') {
    window.vmcContent = {};
  }

  // Ajouter une section sur les branchements DSC par constructeur
  window.vmcContent['dsc-constructeurs'] = {
    title: 'Branchements DSC par Constructeur',
    content: `
      <div class="section-container">
        <h2 class="section-title">Guide de branchement des DSC par constructeur</h2>
        
        <div class="warning-box">
          <h3>⚠️ Interventions réservées aux professionnels</h3>
          <p>Les DSC (Dispositifs de Sécurité Collective) sont des éléments de sécurité critiques dont dépend la vie des occupants.
          Toute erreur de câblage peut entraîner des risques mortels d'intoxication au monoxyde de carbone. Seul un professionnel certifié est habilité à intervenir sur ces dispositifs.</p>
        </div>
        
        <h3>Tableau comparatif des branchements par constructeur</h3>
        
        <div class="scrollable-table">
          <table class="technical-table">
            <tr>
              <th>Constructeur</th>
              <th>Modèles</th>
              <th>Bornier principal</th>
              <th>Type de pressostat</th>
              <th>Type d'alimentation</th>
              <th>Spécificités</th>
            </tr>
            <tr>
              <td>LEGRAND</td>
              <td>BAES DSC VMC</td>
              <td>Format DIN rail, numéroté</td>
              <td>Contact NO (normalement ouvert)</td>
              <td>230V direct</td>
              <td>Intègre un bloc d'éclairage de sécurité</td>
            </tr>
            <tr>
              <td>AGER</td>
              <td>DSC21B, DMV85</td>
              <td>Bornes à vis repérées par lettres</td>
              <td>Contact NF (normalement fermé)</td>
              <td>230V + transfo 12V interne</td>
              <td>Bouton test intégré, LED multicolore</td>
            </tr>
            <tr>
              <td>ALDES</td>
              <td>DSC 1000, DSC 2000</td>
              <td>Bornier numéroté 1 à 6</td>
              <td>Contact NF</td>
              <td>230V + transfo 24V</td>
              <td>LED rouge/vert, temporisation fixe 15s</td>
            </tr>
            <tr>
              <td>UNELVENT</td>
              <td>VENTILAR</td>
              <td>Bornes à code couleur</td>
              <td>Contact NO</td>
              <td>230V + transfo externe</td>
              <td>Relais thermique réglable</td>
            </tr>
            <tr>
              <td>ATLANTIC</td>
              <td>SSG</td>
              <td>Bornier fonctionnel (VMC, PS, EV)</td>
              <td>Contact NO</td>
              <td>230V + transfo intégré</td>
              <td>Temporisation au démarrage (60s)</td>
            </tr>
            <tr>
              <td>NATHER</td>
              <td>Vigitherm</td>
              <td>Bornier numéroté 1 à 8</td>
              <td>Contact NF</td>
              <td>230V + tore intensité</td>
              <td>Double sécurité: intensité + pressostat</td>
            </tr>
            <tr>
              <td>SEIFEL</td>
              <td>Vigidep, Vigico</td>
              <td>Bornier L,N + numéroté</td>
              <td>Contact NF</td>
              <td>230V multitension sortie (12V/24V)</td>
              <td>Sélecteur tension électrovanne</td>
            </tr>
            <tr>
              <td>ANJOS</td>
              <td>Vigichauf</td>
              <td>Bornier à détrompeur</td>
              <td>Contact NO inversible</td>
              <td>230V + transfo 24V</td>
              <td>Buzzer intégré</td>
            </tr>
          </table>
        </div>
        
        <h3>Branchements détaillés par constructeur</h3>
        
        <div class="accordion">
          <div class="accordion-item">
            <button class="accordion-header">LEGRAND (BAES DSC)</button>
            <div class="accordion-content">
              <div class="wiring-diagram">
                <h4>Schéma de branchement LEGRAND</h4>
                <img src="images/dsc-legrand.png" alt="Schéma LEGRAND" class="diagram-image" onerror="this.style.display='none'">
                <pre class="ascii-art">
LEGRAND BAES DSC
┌───────────────────────────┐
│                           │
│    ┌───┐      ┌───┐      │
│    │ON │      │   │      │
│    │OFF│      │RST│      │
│    └───┘      └───┘      │
│                           │
│  L   N   1    2    3     │
└──┬───┬───┬────┬────┬─────┘
   │   │   │    │    │
   │   │   │    │    └── Sortie électrovannes (24V)
   │   │   │    │
   │   │   │    └── Entrée pressostat (contact NO)
   │   │   │
   │   │   └── Alimentation VMC (phase)
   │   │
   │   └── Alimentation 230V (neutre)
   │
   └── Alimentation 230V (phase)
                </pre>
              
              <h4>Particularités de câblage Legrand</h4>
              <ul>
                <li><strong>Position interrupteur ON/OFF</strong> : Mettre sur ON pour fonctionnement normal</li>
                <li><strong>Pressostat</strong> : Se connecte entre les bornes 2 et 3 (contact NO, se ferme quand la VMC fonctionne)</li>
                <li><strong>Électrovannes</strong> : Directement alimentées par la borne 3, plus efficace en 24V</li>
                <li><strong>Reset</strong> : Bouton de réarmement externe à connecter entre borne 1 et L</li>
              </ul>
              
              <h4>Contrôle du bon fonctionnement</h4>
              <ol>
                <li>Vérifier le voyant de charge allumé (batteries BAES)</li>
                <li>Vérifier le voyant vert (VMC en fonctionnement)</li>
                <li>Couper l'alimentation VMC : vérifier que le voyant passe au rouge</li>
                <li>Réarmer après remise en route de la VMC</li>
              </ol>
              
              <div class="tip-box">
                <p><strong>Conseil</strong> : Le système Legrand intègre une fonction BAES (éclairage de sécurité). En cas d'arrêt VMC, il peut déclencher un éclairage d'urgence en plus de couper les électrovannes gaz.</p>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header">AGER (DSC21B / DMV85)</button>
            <div class="accordion-content">
              <div class="wiring-diagram">
                <h4>Schéma de branchement AGER</h4>
                <img src="images/dsc-ager.png" alt="Schéma AGER" class="diagram-image" onerror="this.style.display='none'">
                <pre class="ascii-art">
AGER DSC21B
┌─────────────────────────┐
│       ┌─┐     ┌───┐    │
│       │T│     │RST│    │
│       └─┘     └───┘    │
│                         │
│ A  B  C  D   E   F     │
└─┬──┬──┬──┬───┬───┬─────┘
  │  │  │  │   │   │
  │  │  │  │   │   └── Sortie électrovannes (12V)
  │  │  │  │   │
  │  │  │  │   └── Commun électrovannes
  │  │  │  │
  │  │  │  └── Pressostat (contact NF)
  │  │  │
  │  │  └── Commun pressostat
  │  │
  │  └── Neutre 230V
  │
  └── Phase 230V
                </pre>
              
              <h4>Particularités de câblage AGER</h4>
              <ul>
                <li><strong>Pressostat</strong> : Contact normalement fermé qui s'ouvre quand la VMC s'arrête</li>
                <li><strong>Tension électrovannes</strong> : 12V (vérifier compatibilité électrovannes)</li>
                <li><strong>Bouton T</strong> : Test du système (simule un arrêt VMC)</li>
                <li><strong>Témoin lumineux</strong> : Tricolore (vert=OK, orange=attente, rouge=défaut)</li>
              </ul>
              
              <h4>Procédure de vérification</h4>
              <ol>
                <li>Après branchement, attendre la fin de la temporisation (voyant passe au vert)</li>
                <li>Appuyer sur bouton T : vérifier que le voyant devient rouge et que l'électrovanne se ferme</li>
                <li>Relâcher bouton T : le voyant passe à l'orange pendant la temporisation</li>
                <li>Appuyer sur bouton RST pour réarmer après test</li>
              </ol>
              
              <div class="warning-box">
                <p>L'AGER DSC21B dispose d'une sortie 12V pour les électrovannes. Pour les électrovannes 24V, un adaptateur ou un modèle différent (AGER DMV85) est nécessaire.</p>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header">UNELVENT (VENTILAR)</button>
            <div class="accordion-content">
              <div class="wiring-diagram">
                <h4>Schéma de branchement UNELVENT</h4>
                <img src="images/dsc-unelvent.png" alt="Schéma UNELVENT" class="diagram-image" onerror="this.style.display='none'">
                <pre class="ascii-art">
UNELVENT VENTILAR
┌───────────────────────────┐
│   ┌───┐                   │
│   │AMP│    ┌───┐  ┌───┐  │
│   │ADJ│    │TST│  │RST│  │
│   └───┘    └───┘  └───┘  │
│                           │
│ BL  BR  N  RG  OR  JN    │
└──┬───┬──┬───┬───┬────────┘
   │   │  │   │   │
   │   │  │   │   └── Sortie jaune (électrovanne)
   │   │  │   │
   │   │  │   └── Entrée rouge (pressostat)
   │   │  │
   │   │  └── Neutre pressostat
   │   │
   │   └── Phase VMC (à travers tore)
   │
   └── Neutre alimentation 230V
                </pre>
              
              <h4>Particularités câblage UNELVENT</h4>
              <ul>
                <li><strong>Code couleur</strong> : Bornier repéré par couleurs (BL=bleu, BR=brun, etc.)</li>
                <li><strong>Ajustement intensité</strong> : Potentiomètre AMP ADJ pour régler le seuil de détection</li>
                <li><strong>Phase VMC</strong> : Doit passer par le transformateur d'intensité (tore externe)</li>
                <li><strong>Pressostat</strong> : Contact NO entre bornes RG (rouge) et N</li>
              </ul>
              
              <h4>Réglage du seuil d'intensité</h4>
              <ol>
                <li>VMC en fonctionnement normal</li>
                <li>Tourner le potentiomètre AMP ADJ au minimum</li>
                <li>Augmenter progressivement jusqu'à ce que la LED verte s'allume</li>
                <li>Continuer d'augmenter légèrement (environ 10%) pour éviter les déclenchements intempestifs</li>
              </ol>
              
              <div class="tip-box">
                <p><strong>Astuce</strong> : Ce modèle est particulièrement adapté aux VMC basse consommation car le seuil de détection d'intensité est réglable très précisément.</p>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header">SEIFEL (VIGIDEP)</button>
            <div class="accordion-content">
              <div class="wiring-diagram">
                <h4>Schéma de branchement SEIFEL</h4>
                <img src="images/dsc-seifel.png" alt="Schéma SEIFEL" class="diagram-image" onerror="this.style.display='none'">
                <pre class="ascii-art">
SEIFEL VIGIDEP
┌───────────────────────────┐
│ ┌─────┐  ┌──┐    ┌──────┐ │
│ │12/24│  │  │    │ RESET│ │
│ │ V   │  │TS│    │      │ │
│ └─────┘  └──┘    └──────┘ │
│                           │
│ L  N  1  2  3  4  5  6   │
└─┬──┬──┬──┬──┬──┬──┬──────┘
  │  │  │  │  │  │  │
  │  │  │  │  │  │  └── Sortie 2 électrovannes
  │  │  │  │  │  │
  │  │  │  │  │  └── Sortie 1 électrovannes
  │  │  │  │  │
  │  │  │  │  └── Pressostat 2
  │  │  │  │
  │  │  │  └── Pressostat 1
  │  │  │
  │  │  └── Phase VMC (avec tore)
  │  │
  │  └── Neutre 230V
  │
  └── Phase 230V
                </pre>
              
              <h4>Particularités câblage SEIFEL</h4>
              <ul>
                <li><strong>Sélecteur de tension</strong> : Choix entre 12V ou 24V pour les électrovannes (cavalier)</li>
                <li><strong>Double pressostat</strong> : Possibilité de connecter 2 pressostats en parallèle</li>
                <li><strong>VMC</strong> : La phase doit passer à travers le tore puis se connecter à la borne 1</li>
                <li><strong>Intensité réglable</strong> : Potentiomètre interne pour ajustement fin</li>
              </ul>
              
              <h4>Options de configuration</h4>
              <table class="small-table">
                <tr>
                  <th>Configuration</th>
                  <th>Réglage cavalier</th>
                </tr>
                <tr>
                  <td>Électrovannes 12V</td>
                  <td>Position "12V"</td>
                </tr>
                <tr>
                  <td>Électrovannes 24V</td>
                  <td>Position "24V"</td>
                </tr>
                <tr>
                  <td>Un seul pressostat</td>
                  <td>Ponter bornes 3-4</td>
                </tr>
                <tr>
                  <td>Sans pressostat</td>
                  <td>Ponter bornes 3-4</td>
                </tr>
              </table>
              
              <div class="tip-box">
                <p>Le SEIFEL VIGIDEP est le seul modèle du marché permettant de choisir facilement entre 12V et 24V pour les électrovannes, ce qui le rend compatible avec pratiquement toutes les installations.</p>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header">ANJOS (VIGICHAUF)</button>
            <div class="accordion-content">
              <div class="wiring-diagram">
                <h4>Schéma de branchement ANJOS</h4>
                <img src="images/dsc-anjos.png" alt="Schéma ANJOS" class="diagram-image" onerror="this.style.display='none'">
                <pre class="ascii-art">
ANJOS VIGICHAUF
┌─────────────────────────────┐
│                             │
│   ┌───────┐   ┌────┐ ┌────┐ │
│   │BUZZER │   │TEST│ │RST │ │
│   └───────┘   └────┘ └────┘ │
│                             │
│ Ph N T  M1 M2  P1 P2  S+ S- │
└──┬─┬─┬──┬─┬───┬─┬───┬──┬────┘
   │ │ │  │ │   │ │   │  │
   │ │ │  │ │   │ │   │  └── Sortie - électrovannes (24V)
   │ │ │  │ │   │ │   │
   │ │ │  │ │   │ │   └── Sortie + électrovannes
   │ │ │  │ │   │ │
   │ │ │  │ │   │ └── Pressostat 2
   │ │ │  │ │   │
   │ │ │  │ │   └── Pressostat 1
   │ │ │  │ │
   │ │ │  │ └── Phase VMC sortie
   │ │ │  │
   │ │ │  └── Phase VMC entrée
   │ │ │
   │ │ └── Terre
   │ │
   │ └── Neutre 230V
   │
   └── Phase 230V
                </pre>
              
              <h4>Particularités câblage ANJOS</h4>
              <ul>
                <li><strong>Buzzer intégré</strong> : Alarme sonore en cas de défaut (désactivable)</li>
                <li><strong>Raccordement VMC</strong> : Interrompt la phase avec bornes M1 et M2</li>
                <li><strong>Pressostat</strong> : Double entrée (P1-P2) pour redondance</li>
                <li><strong>Sortie polarisée</strong> : Bornes S+ et S- pour les électrovannes</li>
                <li><strong>Terre obligatoire</strong> : Borne T à raccorder impérativement</li>
              </ul>
              
              <h4>Configuration du buzzer</h4>
              <ol>
                <li>Ouvrir le capot (vis centrale)</li>
                <li>Repérer le cavalier "BUZZER"</li>
                <li>Position ON : alarme sonore active</li>
                <li>Position OFF : alarme sonore désactivée</li>
              </ol>
              
              <div class="warning-box">
                <p>Le DSC ANJOS nécessite une connexion de terre pour sa protection interne. Ne jamais omettre de raccorder la terre au bornier T.</p>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header">HAGER (TB051 / TB052)</button>
            <div class="accordion-content">
              <div class="wiring-diagram">
                <h4>Schéma de branchement HAGER</h4>
                <img src="images/dsc-hager.png" alt="Schéma HAGER" class="diagram-image" onerror="this.style.display='none'">
                <pre class="ascii-art">
HAGER TB051
┌────────────────────────────┐
│                            │
│  ┌───┐  ┌───┐  ┌───┐      │
│  │AUTO│  │MODE│  │RST│     │
│  │MANU│  │    │  │   │     │
│  └───┘  └───┘  └───┘      │
│                            │
│  1  2  3  4  5  6  7  8   │
└──┬──┬──┬──┬──┬──┬──┬──────┘
   │  │  │  │  │  │  │
   │  │  │  │  │  │  └── Sortie électrovannes 24V
   │  │  │  │  │  │
   │  │  │  │  │  └── Commun électrovannes
   │  │  │  │  │
   │  │  │  │  └── Pressostat (NO)
   │  │  │  │
   │  │  │  └── Commun pressostat
   │  │  │
   │  │  └── Phase sortie VMC
   │  │
   │  └── Phase entrée VMC
   │
   └── Phase alimentation 230V
                </pre>
              
              <h4>Particularités câblage HAGER</h4>
              <ul>
                <li><strong>Format modulaire</strong> : Installation sur rail DIN (3 modules)</li>
                <li><strong>Mode AUTO/MANU</strong> : Sélecteur de mode de fonctionnement</li>
                <li><strong>Tension électrovannes</strong> : 24V AC uniquement</li>
                <li><strong>Pressostat</strong> : Contact NO (normalement ouvert)</li>
                <li><strong>Connexion neutre</strong> : Non requise (appareil alimenté en phase seulement)</li>
              </ul>
              
              <h4>Mode de fonctionnement</h4>
              <table class="small-table">
                <tr>
                  <th>Sélecteur</th>
                  <th>Fonction</th>
                </tr>
                <tr>
                  <td>AUTO</td>
                  <td>Surveillance automatique (normal)</td>
                </tr>
                <tr>
                  <td>MANU</td>
                  <td>Test/Forçage (pour maintenance)</td>
                </tr>
              </table>
              
              <div class="tip-box">
                <p><strong>Important</strong> : Le module HAGER possède une temporisation fixe de 30s au démarrage et de 15s à la détection de panne, non ajustable.</p>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header">Schneider Electric (DSC)</button>
            <div class="accordion-content">
              <div class="wiring-diagram">
                <h4>Schéma de branchement Schneider</h4>
                <img src="images/dsc-schneider.png" alt="Schéma Schneider" class="diagram-image" onerror="this.style.display='none'">
                <pre class="ascii-art">
SCHNEIDER DSC
┌────────────────────────────────┐
│                                │
│  ┌───┐            ┌───┐ ┌───┐ │
│  │POW│            │TST│ │RST│ │
│  │   │            │   │ │   │ │
│  └───┘            └───┘ └───┘ │
│                                │
│  A1 A2  1  2  3  4  11 12 14  │
└──┬──┬───┬──┬──┬──┬──┬──┬──────┘
   │  │   │  │  │  │  │  │
   │  │   │  │  │  │  │  └── Contact NF (électrovannes)
   │  │   │  │  │  │  │
   │  │   │  │  │  │  └── Contact commun (électrovannes)
   │  │   │  │  │  │
   │  │   │  │  │  └── Contact NO (non utilisé)
   │  │   │  │  │
   │  │   │  │  └── Pressostat (NF)
   │  │   │  │
   │  │   │  └── Pressostat commun
   │  │   │
   │  │   └── Surveillance phase VMC
   │  │
   │  └── Neutre 230V
   │
   └── Phase 230V
                </pre>
              
              <h4>Particularités câblage Schneider</h4>
              <ul>
                <li><strong>Format industriel</strong> : Boîtier 45mm pour rail DIN</li>
                <li><strong>Surveillance multiple</strong> : Intensité, tension et pression</li>
                <li><strong>Contact inverseur</strong> : Sorties NO et NF disponibles (bornes 11, 12, 14)</li>
                <li><strong>Surveillance VMC</strong> : Connecter phase VMC à la borne 1</li>
                <li><strong>Tension électrovannes</strong> : Nécessite un transformateur externe</li>
              </ul>
              
              <h4>Branchement des électrovannes</h4>
              <p>Contrairement aux autres modèles, le DSC Schneider ne fournit pas directement la tension pour les électrovannes. Il faut :</p>
              <ol>
                <li>Installer un transformateur 230V/24V séparé</li>
                <li>Alimenter le primaire (230V) du transformateur via le contact du DSC (bornes 11 et 12)</li>
                <li>Connecter les électrovannes au secondaire (24V) du transformateur</li>
              </ol>
              
              <div class="warning-box">
                <p>Le DSC Schneider utilise un contact sec et ne fournit pas la tension aux électrovannes. Un transformateur externe 230V/24V est nécessaire.</p>
              </div>
            </div>
          </div>
        </div>
        
        <h3>Conversion entre modèles</h3>
        <p>En cas de remplacement d'un DSC par un modèle d'une autre marque, voici un tableau de correspondance des bornes :</p>
        
        <div class="scrollable-table">
          <table class="technical-table">
            <tr>
              <th>Fonction</th>
              <th>LEGRAND</th>
              <th>AGER</th>
              <th>ALDES</th>
              <th>UNELVENT</th>
              <th>SEIFEL</th>
              <th>ANJOS</th>
              <th>HAGER</th>
            </tr>
            <tr>
              <td>Alimentation Phase</td>
              <td>L</td>
              <td>A</td>
              <td>Ph</td>
              <td>BR</td>
              <td>L</td>
              <td>Ph</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Alimentation Neutre</td>
              <td>N</td>
              <td>B</td>
              <td>N</td>
              <td>BL</td>
              <td>N</td>
              <td>N</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Phase VMC</td>
              <td>1</td>
              <td>-</td>
              <td>1-2</td>
              <td>BR(Tore)</td>
              <td>1</td>
              <td>M1-M2</td>
              <td>2-3</td>
            </tr>
            <tr>
              <td>Pressostat</td>
              <td>2-3</td>
              <td>C-D</td>
              <td>3-4</td>
              <td>N-RG</td>
              <td>3-4</td>
              <td>P1-P2</td>
              <td>4-5</td>
            </tr>
            <tr>
              <td>Sortie électrovannes</td>
              <td>3</td>
              <td>E-F</td>
              <td>5-6</td>
              <td>OR-JN</td>
              <td>5-6</td>
              <td>S+ S-</td>
              <td>6-7</td>
            </tr>
            <tr>
              <td>Type contact pressostat</td>
              <td>NO</td>
              <td>NF</td>
              <td>NF</td>
              <td>NO</td>
              <td>NF</td>
              <td>NO</td>
              <td>NO</td>
            </tr>
          </table>
        </div>
        
        <h3>Adaptation du pressostat</h3>
        <p>Si vous remplacez un DSC par une marque différente et que le type de contact du pressostat ne correspond pas :</p>
        
        <div class="info-box">
          <h4>Conversion de contact pressostat</h4>
          <ul>
            <li><strong>De NO vers NF</strong> : Utiliser les contacts C et NC du pressostat au lieu de C et NO</li>
            <li><strong>De NF vers NO</strong> : Utiliser les contacts C et NO du pressostat au lieu de C et NC</li>
            <li>Si le pressostat n'a qu'un type de contact, il faudra le remplacer par un modèle compatible</li>
          </ul>
        </div>
        
        <div class="warning-box">
          <h4>⚠️ Important</h4>
          <p>Après remplacement d'un DSC, toujours effectuer un test complet de fonctionnement :</p>
          <ol>
            <li>Vérifier le fonctionnement normal (voyant vert/OK allumé)</li>
            <li>Simuler un arrêt VMC (débrancher ou couper l'alimentation)</li>
            <li>Vérifier que le DSC se déclenche et coupe les électrovannes</li>
            <li>Rétablir la VMC et vérifier que le réarmement manuel fonctionne correctement</li>
          </ol>
        </div>
        
        <h3>Documentation spécifique par fabricant</h3>
        <ul>
          <li><a href="https://www.legrand.fr/pro/catalogue/40664-dispositifs-de-securite-collective-dsc/dispositif-de-securite-collective-dsc-pour-vmc-gaz-associe-a-un-baes" target="_blank">Documentation LEGRAND</a></li>
          <li><a href="https://www.aldes.fr/gammes/aeration/ventilation-gaz/dispositif-de-securite-collective/" target="_blank">Documentation ALDES</a></li>
          <li><a href="https://www.atlantic-ventilation.fr/content/download/5273/55673/file/FPS" target="_blank">Documentation ATLANTIC</a></li>
          <li><a href="https://www.anjos-ventilation.com/produit/vigichauf/" target="_blank">Documentation ANJOS</a></li>
          <li><a href="https://www.hager.fr/produits/distribution-energie/protection/dispositif-securite-collective-dsc/tb051/18427.htm" target="_blank">Documentation HAGER</a></li>
        </ul>
      </div>
    `
  };

  // Initialiser le module lorsque le DOM est chargé
  document.addEventListener('DOMContentLoaded', function() {
    // Si la fonction loadContent existe, ajouter une option au menu
    if (typeof loadContent === 'function') {
      const mainMenu = document.getElementById('mainMenu');
      if (mainMenu) {
        const menuItem = document.createElement('li');
        menuItem.innerHTML = '<a href="#dsc-constructeurs">DSC par constructeur</a>';
        mainMenu.appendChild(menuItem);
      }
    }
    
    // Réagir aux événements de chargement de section
    document.addEventListener('contentLoaded', function(event) {
      if (event.detail.section === 'dsc-constructeurs') {
        console.log('Section DSC par constructeur chargée');
        
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
      mobileMenuItem.innerHTML = '<a href="#" data-section="dsc-constructeurs" style="display:block;padding:12px 15px;background-color:#f5f5f5;border-radius:8px;color:#333;text-decoration:none;font-weight:500;">DSC par constructeur</a>';
      mobileMenu.appendChild(mobileMenuItem);
    }
  });
})();
