/**
 * Module DSC par constructeur — branchements et spécificités
 * Référence : NF DTU 68.3 P1-1-3, NF DTU 61.1
 * ⚠️ Réservé aux professionnels habilités
 */

(function() {
  if (typeof window.vmcContent === 'undefined') {
    window.vmcContent = {};
  }

  window.vmcContent['dsc-constructeurs'] = {
    title: 'Branchements DSC par Constructeur',
    content: `
      <div class="section-container">
        <h2 class="section-title">Guide de branchement des DSC par constructeur</h2>

        <div class="warning-box">
          <h3>⚠️ Interventions réservées aux professionnels habilités</h3>
          <p>Les DSC (Dispositifs de Sécurité Collective) sont des éléments de sécurité critique dont dépend la vie des occupants.
          Une erreur de câblage peut entraîner des risques graves d'intoxication au monoxyde de carbone.
          Seul un professionnel certifié RGE ou qualifié gaz est habilité à intervenir sur ces dispositifs.</p>
          <p><strong>Toujours vérifier le schéma de câblage fourni par le fabricant avant toute intervention.</strong></p>
        </div>

        <div class="info-block">
          <h3>Principe de fonctionnement d'un DSC</h3>
          <p>Le DSC surveille en permanence le fonctionnement de la VMC collective. Lorsqu'il détecte un arrêt, il déclenche la fermeture des électrovannes gaz des logements, évitant tout risque d'accumulation de CO.</p>
          <ul>
            <li><strong>Pressostat (PS)</strong> : mesure la dépression dans le conduit — contact NF ou NO selon le modèle</li>
            <li><strong>Tore d'intensité</strong> : mesure le courant du moteur VMC — détection indépendante de la pression</li>
            <li><strong>Électrovannes (EV)</strong> : alimentées en 12V ou 24V — se ferment en l'absence de signal du DSC</li>
            <li><strong>Temporisation</strong> : délai configurable avant déclenchement pour éviter les fausses alarmes au démarrage</li>
          </ul>
        </div>

        <h3>Tableau comparatif — vue d'ensemble</h3>

        <div class="scrollable-table">
          <table class="technical-table">
            <tr>
              <th>Constructeur</th>
              <th>Modèles courants</th>
              <th>Détection VMC</th>
              <th>Contact PS</th>
              <th>Tension EV</th>
              <th>Temporisation</th>
              <th>Spécificités</th>
            </tr>
            <tr>
              <td><strong>ALDES</strong></td>
              <td>DSC 1000, DSC 2000</td>
              <td>Pressostat</td>
              <td>NF</td>
              <td>24V AC</td>
              <td>15 s démarrage</td>
              <td>LED bicolore, bornier 1-6</td>
            </tr>
            <tr>
              <td><strong>AGER</strong></td>
              <td>DSC21B, DMV85</td>
              <td>Pressostat</td>
              <td>NF</td>
              <td>12V (DSC21B) / 24V (DMV85)</td>
              <td>Réglable 5–60 s</td>
              <td>LED tricolore, bouton test</td>
            </tr>
            <tr>
              <td><strong>ANJOS</strong></td>
              <td>Vigichauf</td>
              <td>Pressostat</td>
              <td>NO inversible</td>
              <td>24V AC</td>
              <td>Fixe</td>
              <td>Buzzer, terre obligatoire, 2 PS</td>
            </tr>
            <tr>
              <td><strong>ATLANTIC</strong></td>
              <td>SSG</td>
              <td>Pressostat</td>
              <td>NO</td>
              <td>24V AC</td>
              <td>60 s démarrage</td>
              <td>Transfo intégré, bornier fonctionnel</td>
            </tr>
            <tr>
              <td><strong>HAGER</strong></td>
              <td>TB051, TB052</td>
              <td>Pressostat</td>
              <td>NO</td>
              <td>24V AC</td>
              <td>30 s démarrage / 15 s défaut</td>
              <td>Rail DIN, AUTO/MANU, pas de neutre</td>
            </tr>
            <tr>
              <td><strong>LEGRAND</strong></td>
              <td>BAES DSC VMC</td>
              <td>Pressostat</td>
              <td>NO</td>
              <td>24V AC</td>
              <td>Fixe</td>
              <td>BAES intégré, rail DIN</td>
            </tr>
            <tr>
              <td><strong>NATHER</strong></td>
              <td>Vigitherm</td>
              <td>Pressostat + tore</td>
              <td>NF</td>
              <td>24V AC</td>
              <td>Fixe</td>
              <td>Double sécurité PS + intensité</td>
            </tr>
            <tr>
              <td><strong>Schneider</strong></td>
              <td>DSC / STD</td>
              <td>Pressostat</td>
              <td>NF</td>
              <td>Contact sec (transfo ext. requis)</td>
              <td>Réglable</td>
              <td>Sorties NO + NF, transfo externe obligatoire</td>
            </tr>
            <tr>
              <td><strong>SEIFEL</strong></td>
              <td>Vigidep, Vigico</td>
              <td>Pressostat + tore</td>
              <td>NF</td>
              <td>12V ou 24V (sélecteur cavalier)</td>
              <td>Fixe</td>
              <td>Sélecteur tension EV, 2 PS possibles</td>
            </tr>
            <tr>
              <td><strong>UNELVENT</strong></td>
              <td>Ventilar DSC</td>
              <td>Tore d'intensité</td>
              <td>NO</td>
              <td>Variable (transfo ext.)</td>
              <td>Réglable</td>
              <td>Seuil ampèremétrique réglable</td>
            </tr>
          </table>
        </div>

        <h3>Branchements détaillés par constructeur</h3>

        <div class="accordion">

          <!-- ALDES -->
          <div class="accordion-item">
            <button class="accordion-header">ALDES — DSC 1000 / DSC 2000</button>
            <div class="accordion-content">
              <pre class="ascii-art">
ALDES DSC 1000
┌────────────────────────────────┐
│  ┌─────┐            ┌─────┐   │
│  │ LED │            │ RST │   │
│  └─────┘            └─────┘   │
│                                │
│  L    N    1    2    3    4    5    6
└──┬────┬────┬────┬────┬────┬────┬───┘
   │    │    │    │    │    │    │
   │    │    │    │    │    │    └── EV - (24V AC)
   │    │    │    │    │    │
   │    │    │    │    │    └── EV + (24V AC)
   │    │    │    │    │
   │    │    │    │    └── Pressostat NF (borne 2)
   │    │    │    │
   │    │    │    └── Pressostat commun
   │    │    │
   │    │    └── Phase VMC (passage — interrompue si défaut)
   │    │
   │    └── Neutre 230V
   │
   └── Phase 230V alimentation
              </pre>
              <h4>Connexions</h4>
              <table class="small-table">
                <tr><th>Borne</th><th>Fonction</th><th>Remarque</th></tr>
                <tr><td>L</td><td>Phase 230V alimentation</td><td>Depuis tableau</td></tr>
                <tr><td>N</td><td>Neutre 230V</td><td>Depuis tableau</td></tr>
                <tr><td>1</td><td>Phase VMC entrée</td><td>Depuis tableau électrique</td></tr>
                <tr><td>2</td><td>Phase VMC sortie</td><td>Vers moteur VMC</td></tr>
                <tr><td>3</td><td>Pressostat commun</td><td>—</td></tr>
                <tr><td>4</td><td>Pressostat NF</td><td>Contact normalement fermé</td></tr>
                <tr><td>5</td><td>EV + (24V AC)</td><td>Vers électrovannes gaz</td></tr>
                <tr><td>6</td><td>EV - (24V AC)</td><td>Retour électrovannes</td></tr>
              </table>
              <h4>Particularités</h4>
              <ul>
                <li><strong>Pressostat NF</strong> : circuit fermé = VMC tourne — s'ouvre en cas d'arrêt et déclenche la fermeture des EV</li>
                <li><strong>Temporisation démarrage</strong> : 15 s, non réglable</li>
                <li><strong>LED</strong> : vert = OK, rouge = défaut VMC, clignotant = attente temporisation</li>
                <li><strong>DSC 2000</strong> : identique au 1000 + sortie relais supplémentaire pour report d'alarme</li>
              </ul>
              <h4>Test de fonctionnement</h4>
              <ol>
                <li>VMC en marche : LED verte, mesurer ~24V entre bornes 5 et 6</li>
                <li>Couper alimentation VMC : LED rouge immédiate, 0V entre 5 et 6</li>
                <li>Remettre VMC : temporisation 15 s → LED verte, EV réouvertes</li>
                <li>Appuyer sur RST si le réarmement automatique ne s'effectue pas</li>
              </ol>
            </div>
          </div>

          <!-- AGER -->
          <div class="accordion-item">
            <button class="accordion-header">AGER — DSC21B / DMV85</button>
            <div class="accordion-content">
              <pre class="ascii-art">
AGER DSC21B
┌────────────────────────────┐
│  ┌───┐         ┌─────┐    │
│  │ T │         │ RST │    │
│  └───┘         └─────┘    │
│  LED : vert / orange / rouge
│                            │
│  A    B    C    D    E    F │
└──┬────┬────┬────┬────┬────┘
   │    │    │    │    │
   │    │    │    │    └── EV - (12V DC — DSC21B / 24V — DMV85)
   │    │    │    │
   │    │    │    └── EV + (commun)
   │    │    │
   │    │    └── Pressostat NF
   │    │
   │    └── Pressostat commun
   │    │
   └────┴── Phase 230V (A) / Neutre 230V (B)
              </pre>
              <h4>Connexions</h4>
              <table class="small-table">
                <tr><th>Borne</th><th>Fonction</th><th>Remarque</th></tr>
                <tr><td>A</td><td>Phase 230V</td><td>—</td></tr>
                <tr><td>B</td><td>Neutre 230V</td><td>—</td></tr>
                <tr><td>C</td><td>Pressostat commun</td><td>—</td></tr>
                <tr><td>D</td><td>Pressostat NF</td><td>Contact normalement fermé</td></tr>
                <tr><td>E</td><td>EV + sortie</td><td>DSC21B : 12V DC / DMV85 : 24V AC</td></tr>
                <tr><td>F</td><td>EV - (commun)</td><td>—</td></tr>
              </table>
              <h4>Particularités</h4>
              <ul>
                <li><strong>DSC21B</strong> : sortie 12V DC — vérifier impérativement la tension des EV avant branchement</li>
                <li><strong>DMV85</strong> : sortie 24V AC — modèle recommandé pour les EV 24V</li>
                <li><strong>Bouton T</strong> : simule un arrêt VMC sans couper la VMC réelle — test sécurisé</li>
                <li><strong>LED tricolore</strong> : vert = OK, orange = temporisation, rouge = défaut</li>
                <li><strong>Temporisation</strong> : réglable par potentiomètre interne (5 à 60 s)</li>
              </ul>
              <h4>Test de fonctionnement</h4>
              <ol>
                <li>Après mise sous tension : attendre temporisation → LED verte</li>
                <li>Appuyer sur T : LED rouge, EV fermées (0V aux bornes E-F)</li>
                <li>Relâcher T : LED orange (temporisation) puis verte</li>
                <li>Appuyer sur RST pour réarmement manuel si configuré ainsi</li>
              </ol>
              <div class="warning-box">
                <p>Ne jamais brancher des EV 24V sur un DSC21B (sortie 12V) — risque de non-fermeture des EV et d'intoxication CO.</p>
              </div>
            </div>
          </div>

          <!-- ANJOS -->
          <div class="accordion-item">
            <button class="accordion-header">ANJOS — Vigichauf</button>
            <div class="accordion-content">
              <pre class="ascii-art">
ANJOS VIGICHAUF
┌──────────────────────────────────┐
│  ┌────────┐   ┌──────┐ ┌──────┐ │
│  │ BUZZER │   │ TEST │ │ RST  │ │
│  └────────┘   └──────┘ └──────┘ │
│                                  │
│  Ph   N    T   M1   M2   P1   P2   S+   S-
└──┬────┬────┬───┬────┬────┬────┬────┬────┘
   │    │    │   │    │    │    │    │
   │    │    │   │    │    │    │    └── EV - (24V AC)
   │    │    │   │    │    │    │
   │    │    │   │    │    │    └── EV + (24V AC)
   │    │    │   │    │    │
   │    │    │   │    │    └── Pressostat 2 NO
   │    │    │   │    │
   │    │    │   │    └── Pressostat 1 NO
   │    │    │   │
   │    │    │   └── Phase VMC sortie (vers moteur)
   │    │    │
   │    │    └── Phase VMC entrée (depuis tableau)
   │    │
   │    └── Terre (obligatoire)
   │
   └── Neutre 230V / Phase 230V (Ph)
              </pre>
              <h4>Connexions</h4>
              <table class="small-table">
                <tr><th>Borne</th><th>Fonction</th><th>Remarque</th></tr>
                <tr><td>Ph</td><td>Phase 230V</td><td>—</td></tr>
                <tr><td>N</td><td>Neutre 230V</td><td>—</td></tr>
                <tr><td>T</td><td>Terre</td><td>Obligatoire — protection interne</td></tr>
                <tr><td>M1</td><td>Phase VMC entrée</td><td>Depuis tableau électrique</td></tr>
                <tr><td>M2</td><td>Phase VMC sortie</td><td>Vers moteur VMC</td></tr>
                <tr><td>P1</td><td>Pressostat 1 NO</td><td>—</td></tr>
                <tr><td>P2</td><td>Pressostat 2 NO</td><td>Redondance ou 2e pressostat</td></tr>
                <tr><td>S+</td><td>EV + (24V AC)</td><td>Borne polarisée — respecter le sens</td></tr>
                <tr><td>S-</td><td>EV - (24V AC)</td><td>—</td></tr>
              </table>
              <h4>Particularités</h4>
              <ul>
                <li><strong>Terre obligatoire</strong> : la borne T ne doit jamais être omise</li>
                <li><strong>Double pressostat</strong> : P1 et P2 peuvent recevoir deux pressostats en redondance</li>
                <li><strong>Sorties polarisées</strong> : respecter impérativement S+ et S-</li>
                <li><strong>Contact inversible</strong> : cavalier interne pour basculer NO/NF selon le pressostat disponible</li>
                <li><strong>Buzzer</strong> : cavalier ON/OFF à l'intérieur du capot (vis centrale)</li>
              </ul>
              <h4>Configuration buzzer</h4>
              <ol>
                <li>Ouvrir le capot (vis centrale)</li>
                <li>Localiser le cavalier "BUZZER"</li>
                <li>Position ON : alarme sonore active en cas de défaut</li>
                <li>Position OFF : alarme silencieuse (voyant uniquement)</li>
              </ol>
              <div class="warning-box">
                <p>La borne T (terre) ne doit jamais être omise — le Vigichauf utilise la terre pour sa protection contre les surtensions internes.</p>
              </div>
            </div>
          </div>

          <!-- ATLANTIC -->
          <div class="accordion-item">
            <button class="accordion-header">ATLANTIC — SSG (Sécurité Gaz)</button>
            <div class="accordion-content">
              <pre class="ascii-art">
ATLANTIC SSG
┌───────────────────────────────┐
│  LED : vert / rouge           │
│                               │
│  ┌────────────────────────┐   │
│  │  VMC   │   PS   │  EV  │   │
│  └──┬──┬──┴──┬──┬──┴──┬──┘   │
│     │  │     │  │     │       │
│     │  │     │  │     └── EV neutre (24V AC)
│     │  │     │  │
│     │  │     │  └── EV phase (24V AC)
│     │  │     │
│     │  │     └── Pressostat NO borne 2
│     │  │
│     │  └── Pressostat commun (PS1)
│     │
│     └── Surveillance phase VMC (2 bornes)
│
│  L    N    (alimentation 230V)
└──┬────┬──────────────────────┘
   │    │
   │    └── Neutre 230V
   └── Phase 230V
              </pre>
              <h4>Connexions</h4>
              <table class="small-table">
                <tr><th>Bloc</th><th>Bornes</th><th>Fonction</th><th>Remarque</th></tr>
                <tr><td>Alimentation</td><td>L / N</td><td>230V alimentation</td><td>—</td></tr>
                <tr><td>VMC</td><td>VMC1 / VMC2</td><td>Phase VMC (passage)</td><td>Interrompue par le DSC en cas de défaut</td></tr>
                <tr><td>PS</td><td>PS1 / PS2</td><td>Pressostat NO</td><td>Se ferme quand la VMC tourne</td></tr>
                <tr><td>EV</td><td>EV+ / EV-</td><td>Sortie 24V AC électrovannes</td><td>Transfo intégré — pas de transfo externe</td></tr>
              </table>
              <h4>Particularités</h4>
              <ul>
                <li><strong>Bornier fonctionnel</strong> : blocs étiquetés VMC / PS / EV (pas de numéros de bornes)</li>
                <li><strong>Transformateur intégré</strong> : fournit directement le 24V AC aux EV</li>
                <li><strong>Temporisation démarrage</strong> : 60 s — prévu pour les VMC à démarrage progressif</li>
                <li><strong>Réarmement automatique</strong> : dès que la VMC repart et après la temporisation</li>
                <li><strong>Pressostat NO</strong> : se ferme quand la VMC est en fonctionnement normal</li>
              </ul>
              <h4>Test de fonctionnement</h4>
              <ol>
                <li>Mise sous tension : attendre 60 s → LED verte, ~24V mesurables aux bornes EV</li>
                <li>Couper alimentation VMC : LED rouge immédiate, 0V aux bornes EV</li>
                <li>Remettre VMC : attendre 60 s → LED verte, EV réouvertes</li>
              </ol>
              <div class="tip-box">
                <p><strong>Attention à la temporisation de 60 s</strong> : si la VMC met plus de 60 s pour atteindre sa vitesse nominale, un déclenchement en fausse alarme au démarrage est possible.</p>
              </div>
            </div>
          </div>

          <!-- HAGER -->
          <div class="accordion-item">
            <button class="accordion-header">HAGER — TB051 / TB052</button>
            <div class="accordion-content">
              <pre class="ascii-art">
HAGER TB051
┌──────────────────────────────┐
│  ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ AUTO │ │ MANU │ │ RST  │ │
│  └──────┘ └──────┘ └──────┘ │
│                              │
│  1    2    3    4    5    6    7
└──┬────┬────┬────┬────┬────┬──┘
   │    │    │    │    │    │
   │    │    │    │    │    └── EV sortie (24V AC)
   │    │    │    │    │
   │    │    │    │    └── EV commun (24V AC)
   │    │    │    │
   │    │    │    └── Pressostat NO borne 2
   │    │    │
   │    │    └── Pressostat commun
   │    │
   │    └── Phase VMC sortie (vers moteur)
   │
   └── Phase VMC entrée + alimentation 230V (borne 1)
   (Pas de neutre requis)
              </pre>
              <h4>Connexions</h4>
              <table class="small-table">
                <tr><th>Borne</th><th>Fonction</th><th>Remarque</th></tr>
                <tr><td>1</td><td>Phase 230V alimentation + entrée VMC</td><td>Pas de neutre requis</td></tr>
                <tr><td>2</td><td>Phase VMC sortie</td><td>Vers moteur VMC</td></tr>
                <tr><td>3</td><td>Pressostat commun</td><td>—</td></tr>
                <tr><td>4</td><td>Pressostat NO</td><td>Contact normalement ouvert</td></tr>
                <tr><td>5</td><td>EV commun (24V AC)</td><td>—</td></tr>
                <tr><td>6</td><td>EV sortie (24V AC)</td><td>Vers électrovannes gaz</td></tr>
              </table>
              <h4>Modes de fonctionnement</h4>
              <table class="small-table">
                <tr><th>Sélecteur</th><th>Comportement</th><th>Usage</th></tr>
                <tr><td>AUTO</td><td>Surveillance automatique active</td><td>Exploitation normale</td></tr>
                <tr><td>MANU</td><td>EV maintenues ouvertes — surveillance suspendue</td><td>Maintenance uniquement</td></tr>
              </table>
              <h4>Particularités</h4>
              <ul>
                <li><strong>Format rail DIN</strong> : 3 modules — installation en tableau électrique</li>
                <li><strong>Sans neutre</strong> : l'appareil ne nécessite pas de neutre pour son alimentation interne</li>
                <li><strong>Temporisation fixe</strong> : 30 s au démarrage, 15 s avant déclenchement sur défaut — non réglable</li>
                <li><strong>TB052</strong> : version avec 2 sorties EV indépendantes (2 circuits gaz)</li>
              </ul>
              <div class="warning-box">
                <p>Ne jamais laisser le sélecteur en position MANU en exploitation — les EV resteraient ouvertes même en cas d'arrêt total de la VMC.</p>
              </div>
            </div>
          </div>

          <!-- LEGRAND -->
          <div class="accordion-item">
            <button class="accordion-header">LEGRAND — BAES DSC VMC</button>
            <div class="accordion-content">
              <pre class="ascii-art">
LEGRAND BAES DSC
┌────────────────────────────┐
│  ┌───────┐      ┌──────┐  │
│  │ ON/OFF│      │ RST  │  │
│  └───────┘      └──────┘  │
│  (BAES : bloc éclairage intégré)
│                            │
│  L    N    1    2    3     │
└──┬────┬────┬────┬────┬─────┘
   │    │    │    │    │
   │    │    │    │    └── EV sortie (24V AC)
   │    │    │    │
   │    │    │    └── Pressostat NO (borne 2)
   │    │    │
   │    │    └── Phase VMC (surveillance alimentation moteur)
   │    │
   │    └── Neutre 230V
   │
   └── Phase 230V
              </pre>
              <h4>Connexions</h4>
              <table class="small-table">
                <tr><th>Borne</th><th>Fonction</th><th>Remarque</th></tr>
                <tr><td>L</td><td>Phase 230V</td><td>—</td></tr>
                <tr><td>N</td><td>Neutre 230V</td><td>—</td></tr>
                <tr><td>1</td><td>Phase VMC</td><td>Surveillance présence tension moteur</td></tr>
                <tr><td>2</td><td>Pressostat NO</td><td>Contact normalement ouvert</td></tr>
                <tr><td>3</td><td>EV sortie (24V AC)</td><td>Vers électrovannes gaz</td></tr>
              </table>
              <h4>Particularités</h4>
              <ul>
                <li><strong>BAES intégré</strong> : en cas de défaut VMC, le bloc d'éclairage de sécurité s'active en complément de la fermeture des EV</li>
                <li><strong>Rail DIN</strong> : format modulaire numéroté</li>
                <li><strong>Pressostat NO</strong> : se ferme quand la VMC tourne</li>
                <li><strong>Interrupteur ON/OFF</strong> : maintenir sur ON en exploitation — OFF uniquement pour maintenance</li>
              </ul>
              <h4>Test de fonctionnement</h4>
              <ol>
                <li>Voyant de charge allumé = batteries BAES en charge (normal)</li>
                <li>Voyant vert = VMC OK, ~24V entre borne 3 et N</li>
                <li>Couper VMC : voyant rouge, éclairage BAES s'active, 0V borne 3</li>
                <li>Remettre VMC, appuyer RST : voyant vert, EV réouvertes</li>
              </ol>
            </div>
          </div>

          <!-- NATHER -->
          <div class="accordion-item">
            <button class="accordion-header">NATHER — Vigitherm</button>
            <div class="accordion-content">
              <pre class="ascii-art">
NATHER VIGITHERM
┌────────────────────────────────────┐
│  ┌───────┐   ┌──────┐  ┌──────┐  │
│  │ SEUIL │   │ TEST │  │ RST  │  │
│  └───────┘   └──────┘  └──────┘  │
│                                    │
│  1    2    3    4    5    6    7    8
└──┬────┬────┬────┬────┬────┬────┬──┘
   │    │    │    │    │    │    │
   │    │    │    │    │    │    └── EV sortie 2 (24V AC)
   │    │    │    │    │    │
   │    │    │    │    │    └── EV sortie 1 (24V AC)
   │    │    │    │    │
   │    │    │    │    └── EV commun
   │    │    │    │
   │    │    │    └── Pressostat NF
   │    │    │
   │    │    └── Pressostat commun
   │    │
   │    └── Phase VMC (passer dans le tore)
   │
   └── Phase 230V (1) / Neutre 230V (2)
   Tore d'intensité à clipser sur le câble de la borne 3
              </pre>
              <h4>Connexions</h4>
              <table class="small-table">
                <tr><th>Borne</th><th>Fonction</th><th>Remarque</th></tr>
                <tr><td>1</td><td>Phase 230V alimentation</td><td>—</td></tr>
                <tr><td>2</td><td>Neutre 230V</td><td>—</td></tr>
                <tr><td>3</td><td>Phase VMC (passage tore)</td><td>Ce câble doit traverser le tore d'intensité</td></tr>
                <tr><td>4</td><td>Pressostat commun</td><td>—</td></tr>
                <tr><td>5</td><td>Pressostat NF</td><td>Contact normalement fermé</td></tr>
                <tr><td>6</td><td>EV commun (24V AC)</td><td>—</td></tr>
                <tr><td>7</td><td>EV sortie 1 (24V AC)</td><td>Circuit EV principal</td></tr>
                <tr><td>8</td><td>EV sortie 2 (24V AC)</td><td>2e circuit EV si nécessaire</td></tr>
              </table>
              <h4>Particularités</h4>
              <ul>
                <li><strong>Double détection</strong> : pressostat NF ET tore d'intensité — l'un ou l'autre suffit à déclencher</li>
                <li><strong>Tore d'intensité</strong> : à clipser sur le câble de phase VMC (borne 3) — détecte l'arrêt moteur même sans chute de pression</li>
                <li><strong>Potentiomètre SEUIL</strong> : régler en fonction de l'intensité nominale du moteur VMC</li>
                <li><strong>2 sorties EV</strong> : bornes 7 et 8 pour alimenter 2 circuits d'électrovannes indépendants</li>
              </ul>
              <h4>Réglage du seuil tore</h4>
              <ol>
                <li>VMC en fonctionnement, mesurer l'intensité moteur (ampèremètre sur la phase)</li>
                <li>Tourner le potentiomètre SEUIL au minimum</li>
                <li>Augmenter lentement jusqu'à ce que le voyant passe au vert</li>
                <li>Ajouter environ 10 % de marge au-dessus du seuil de détection</li>
                <li>Tester avec le bouton TEST : voyant rouge, EV fermées</li>
              </ol>
            </div>
          </div>

          <!-- Schneider -->
          <div class="accordion-item">
            <button class="accordion-header">Schneider Electric — DSC / STD</button>
            <div class="accordion-content">
              <pre class="ascii-art">
SCHNEIDER DSC
┌──────────────────────────────────────┐
│  ┌─────┐                ┌───┐ ┌───┐ │
│  │ POW │                │TST│ │RST│ │
│  └─────┘                └───┘ └───┘ │
│                                      │
│  A1   A2    1    2    3    4   11   12   14
└──┬────┬─────┬────┬────┬────┬────┬────┬──┘
   │    │     │    │    │    │    │    │
   │    │     │    │    │    │    │    └── Contact NF relais (fermeture EV)
   │    │     │    │    │    │    │
   │    │     │    │    │    │    └── Contact commun relais
   │    │     │    │    │    │
   │    │     │    │    │    └── Contact NO relais (report alarme)
   │    │     │    │    │
   │    │     │    │    └── Pressostat NF borne 2
   │    │     │    │
   │    │     │    └── Pressostat commun
   │    │     │
   │    │     └── Surveillance phase VMC
   │    │
   │    └── Neutre 230V
   │
   └── Phase 230V
              </pre>
              <h4>Connexions</h4>
              <table class="small-table">
                <tr><th>Borne</th><th>Fonction</th><th>Remarque</th></tr>
                <tr><td>A1</td><td>Phase 230V</td><td>—</td></tr>
                <tr><td>A2</td><td>Neutre 230V</td><td>—</td></tr>
                <tr><td>1</td><td>Surveillance phase VMC</td><td>Depuis alimentation moteur</td></tr>
                <tr><td>2</td><td>Pressostat commun</td><td>—</td></tr>
                <tr><td>3</td><td>Pressostat NF</td><td>Contact normalement fermé</td></tr>
                <tr><td>4</td><td>Contact NO libre</td><td>Report d'alarme optionnel</td></tr>
                <tr><td>11</td><td>Contact commun relais EV</td><td>Contact sec — voir note</td></tr>
                <tr><td>12</td><td>Contact NF relais EV</td><td>Alimente le primaire du transfo EV</td></tr>
                <tr><td>14</td><td>Contact NO relais EV</td><td>Non utilisé habituellement</td></tr>
              </table>
              <h4>Schéma de câblage EV avec transformateur externe</h4>
              <ol>
                <li>Installer un transformateur séparé 230V / 24V AC</li>
                <li>Relier le fil L du tableau au contact commun 11 du Schneider</li>
                <li>Relier la borne 12 (NF) au primaire 230V du transformateur</li>
                <li>Relier le neutre directement au primaire du transformateur</li>
                <li>Brancher les EV sur le secondaire 24V du transformateur</li>
              </ol>
              <h4>Particularités</h4>
              <ul>
                <li><strong>Contact sec uniquement</strong> : le DSC Schneider ne fournit aucune tension — il pilote seulement un relais</li>
                <li><strong>Transformateur externe obligatoire</strong> : 230V/24V à installer séparément</li>
                <li><strong>Double sortie relais</strong> : NO et NF disponibles, permettant un report d'alarme ou une logique inversée</li>
                <li><strong>Temporisation</strong> : réglable par potentiomètre interne (5 à 30 s)</li>
              </ul>
              <div class="warning-box">
                <p>Ce DSC ne fournit aucune tension aux EV — un transformateur 230V/24V externe est obligatoire. Ne pas tenter d'alimenter les EV directement depuis les bornes de relais.</p>
              </div>
            </div>
          </div>

          <!-- SEIFEL -->
          <div class="accordion-item">
            <button class="accordion-header">SEIFEL — VIGIDEP / VIGICO</button>
            <div class="accordion-content">
              <pre class="ascii-art">
SEIFEL VIGIDEP
┌────────────────────────────────┐
│  ┌──────┐  ┌────┐  ┌────────┐ │
│  │ 12V  │  │ TS │  │ RESET  │ │
│  │ 24V  │  └────┘  └────────┘ │
│  └──────┘                      │
│  (cavalier sélection tension EV)
│                                │
│  L    N    1    2    3    4    5    6
└──┬────┬────┬────┬────┬────┬────┬──┘
   │    │    │    │    │    │    │
   │    │    │    │    │    │    └── EV sortie 2 (12 ou 24V)
   │    │    │    │    │    │
   │    │    │    │    │    └── EV sortie 1 (12 ou 24V)
   │    │    │    │    │
   │    │    │    │    └── Pressostat 2 NF (ou pont si 1 seul PS)
   │    │    │    │
   │    │    │    └── Pressostat 1 NF (commun)
   │    │    │
   │    │    └── Phase VMC (passer dans le tore)
   │    │
   │    └── Neutre 230V
   │
   └── Phase 230V
   Tore d'intensité à clipser sur le câble de la borne 1
              </pre>
              <h4>Connexions</h4>
              <table class="small-table">
                <tr><th>Borne</th><th>Fonction</th><th>Remarque</th></tr>
                <tr><td>L</td><td>Phase 230V</td><td>—</td></tr>
                <tr><td>N</td><td>Neutre 230V</td><td>—</td></tr>
                <tr><td>1</td><td>Phase VMC (passage tore)</td><td>Fil à faire traverser le tore</td></tr>
                <tr><td>2</td><td>Pressostat 1 commun</td><td>—</td></tr>
                <tr><td>3</td><td>Pressostat 1 NF</td><td>Contact normalement fermé</td></tr>
                <tr><td>4</td><td>Pressostat 2 NF</td><td>Ponter 3-4 si un seul pressostat</td></tr>
                <tr><td>5</td><td>EV sortie 1</td><td>12V ou 24V selon cavalier</td></tr>
                <tr><td>6</td><td>EV sortie 2</td><td>2e circuit EV indépendant</td></tr>
              </table>
              <h4>Options de configuration cavalier</h4>
              <table class="small-table">
                <tr><th>Configuration</th><th>Action</th></tr>
                <tr><td>EV 12V</td><td>Cavalier en position "12V"</td></tr>
                <tr><td>EV 24V</td><td>Cavalier en position "24V"</td></tr>
                <tr><td>1 seul pressostat</td><td>Ponter bornes 3 et 4</td></tr>
                <tr><td>Détection tore seul (sans PS)</td><td>Ponter bornes 3 et 4</td></tr>
              </table>
              <h4>Particularités</h4>
              <ul>
                <li><strong>Sélecteur 12/24V</strong> : unique sur le marché — permet de s'adapter aux EV existantes sans les remplacer</li>
                <li><strong>Double détection</strong> : tore + pressostat — l'un ou l'autre déclenche la sécurité</li>
                <li><strong>2 sorties EV indépendantes</strong> : bornes 5 et 6 pour deux circuits gaz distincts</li>
                <li><strong>VIGICO</strong> : version permettant la gestion de 2 VMC distinctes avec 2 DSC dans le même boîtier</li>
              </ul>
              <div class="tip-box">
                <p>Le Vigidep est le seul DSC du marché permettant de sélectionner facilement 12V ou 24V pour les EV — idéal lors d'un remplacement sans connaître la tension des EV installées.</p>
              </div>
            </div>
          </div>

          <!-- UNELVENT -->
          <div class="accordion-item">
            <button class="accordion-header">UNELVENT — Ventilar DSC</button>
            <div class="accordion-content">
              <pre class="ascii-art">
UNELVENT VENTILAR DSC
┌───────────────────────────────┐
│  ┌───────┐  ┌──────┐ ┌──────┐│
│  │ SEUIL │  │ TEST │ │ RST  ││
│  └───────┘  └──────┘ └──────┘│
│                               │
│  BL   BR    N   RG   OR   JN  │
└──┬────┬─────┬───┬────┬────┬──┘
   │    │     │   │    │    │
   │    │     │   │    │    └── JN (jaune) : EV sortie
   │    │     │   │    │
   │    │     │   │    └── OR (orange) : EV commun
   │    │     │   │
   │    │     │   └── RG (rouge) : Pressostat NO borne 2
   │    │     │
   │    │     └── N : commun pressostat
   │    │
   │    └── BR (brun) : Phase VMC (passage tore)
   │
   └── BL (bleu) : Neutre alimentation 230V
   Tore d'intensité à clipser sur le câble BR (brun)
              </pre>
              <h4>Connexions</h4>
              <table class="small-table">
                <tr><th>Borne / couleur</th><th>Fonction</th><th>Remarque</th></tr>
                <tr><td>BL (bleu)</td><td>Neutre 230V alimentation</td><td>—</td></tr>
                <tr><td>BR (brun)</td><td>Phase VMC (passage tore)</td><td>Câble à faire traverser le tore</td></tr>
                <tr><td>N</td><td>Commun pressostat</td><td>—</td></tr>
                <tr><td>RG (rouge)</td><td>Pressostat NO</td><td>Contact normalement ouvert</td></tr>
                <tr><td>OR (orange)</td><td>EV commun</td><td>—</td></tr>
                <tr><td>JN (jaune)</td><td>EV sortie</td><td>Tension fournie par transfo externe</td></tr>
              </table>
              <h4>Particularités</h4>
              <ul>
                <li><strong>Détection par tore uniquement</strong> : mesure l'intensité moteur — pas de surveillance de pression directe</li>
                <li><strong>Code couleur</strong> : bornier identifié par couleurs (pas de numéros)</li>
                <li><strong>Seuil ampèremétrique réglable</strong> : potentiomètre SEUIL à ajuster selon l'intensité nominale de la VMC</li>
                <li><strong>Transformateur externe</strong> : l'Unelvent ne fournit pas la tension EV — prévoir un transfo 230V/24V séparé raccordé entre OR et JN</li>
              </ul>
              <h4>Réglage du seuil</h4>
              <ol>
                <li>VMC en fonctionnement normal, tore clipsé sur le câble BR</li>
                <li>Tourner le potentiomètre SEUIL au minimum</li>
                <li>Augmenter progressivement jusqu'à l'allumage du voyant vert</li>
                <li>Ajouter ~10 % au-dessus du seuil de déclenchement</li>
                <li>Tester avec le bouton TEST : voyant rouge, 0V aux bornes EV</li>
              </ol>
              <div class="tip-box">
                <p>Ce modèle est particulièrement adapté aux VMC à moteur EC (basse consommation) dont l'intensité est très faible — le seuil fin permet une détection précise sans fausses alarmes.</p>
              </div>
            </div>
          </div>

        </div>

        <h3>Tableau croisé de correspondance des bornes</h3>
        <p>Pour remplacer un DSC par un modèle d'une autre marque — repérer la fonction et trouver la borne correspondante :</p>

        <div class="scrollable-table">
          <table class="technical-table">
            <tr>
              <th>Fonction</th>
              <th>ALDES</th>
              <th>AGER</th>
              <th>ANJOS</th>
              <th>ATLANTIC</th>
              <th>HAGER</th>
              <th>LEGRAND</th>
              <th>NATHER</th>
              <th>Schneider</th>
              <th>SEIFEL</th>
              <th>UNELVENT</th>
            </tr>
            <tr>
              <td>Phase 230V</td>
              <td>L</td><td>A</td><td>Ph</td><td>L</td><td>1*</td><td>L</td><td>1</td><td>A1</td><td>L</td><td>—**</td>
            </tr>
            <tr>
              <td>Neutre 230V</td>
              <td>N</td><td>B</td><td>N</td><td>N</td><td>—</td><td>N</td><td>2</td><td>A2</td><td>N</td><td>BL</td>
            </tr>
            <tr>
              <td>Phase VMC</td>
              <td>1–2</td><td>—</td><td>M1–M2</td><td>VMC</td><td>1–2</td><td>1</td><td>3</td><td>1</td><td>1</td><td>BR (tore)</td>
            </tr>
            <tr>
              <td>Pressostat borne 1</td>
              <td>3</td><td>C</td><td>P1</td><td>PS1</td><td>3</td><td>—</td><td>4</td><td>2</td><td>2</td><td>N</td>
            </tr>
            <tr>
              <td>Pressostat borne 2</td>
              <td>4</td><td>D</td><td>P2</td><td>PS2</td><td>4</td><td>2</td><td>5</td><td>3</td><td>3</td><td>RG</td>
            </tr>
            <tr>
              <td>EV sortie</td>
              <td>5–6</td><td>E–F</td><td>S+/S-</td><td>EV</td><td>5–6</td><td>3</td><td>6–7</td><td>11–12***</td><td>5–6</td><td>OR–JN</td>
            </tr>
            <tr>
              <td>Type contact PS</td>
              <td>NF</td><td>NF</td><td>NO</td><td>NO</td><td>NO</td><td>NO</td><td>NF</td><td>NF</td><td>NF</td><td>NO</td>
            </tr>
            <tr>
              <td>Tension EV</td>
              <td>24V AC</td><td>12 ou 24V</td><td>24V AC</td><td>24V AC</td><td>24V AC</td><td>24V AC</td><td>24V AC</td><td>Contact sec</td><td>12 ou 24V</td><td>Externe</td>
            </tr>
          </table>
        </div>
        <p><small>
          * HAGER : la borne 1 est à la fois alimentation 230V et entrée VMC — pas de neutre requis.<br>
          ** UNELVENT : pas de borne phase directe — uniquement le câble VMC passant dans le tore.<br>
          *** Schneider bornes 11–12 : contact sec — un transformateur 230V/24V externe est obligatoire.
        </small></p>

        <h3>Adaptation du pressostat lors d'un remplacement</h3>

        <div class="info-block">
          <p>Si le type de contact du pressostat existant ne correspond pas au nouveau DSC :</p>
          <ul>
            <li><strong>Pressostat NO → DSC NF</strong> : utiliser les bornes C et NC du pressostat au lieu de C et NO</li>
            <li><strong>Pressostat NF → DSC NO</strong> : utiliser les bornes C et NO du pressostat au lieu de C et NC</li>
            <li>Si le pressostat n'a qu'un type de contact, le remplacer par un modèle inverseur (C/NO/NF)</li>
          </ul>
        </div>

        <h3>Procédure de test obligatoire après toute intervention</h3>

        <div class="warning-box">
          <h4>⚠️ À effectuer systématiquement</h4>
          <ol>
            <li>Mettre le DSC sous tension — attendre la fin de la temporisation de démarrage</li>
            <li>Voyant vert (ou LED OK) allumé : mesurer la tension aux bornes EV (valeur nominale selon modèle)</li>
            <li>Simuler un arrêt VMC (couper l'alimentation moteur ou appuyer sur le bouton TEST)</li>
            <li>Vérifier le déclenchement : voyant rouge, tension EV = 0V — les EV sont fermées</li>
            <li>Rétablir la VMC, attendre la temporisation, vérifier le réarmement automatique ou manuel (RST)</li>
            <li>Consigner l'intervention dans le carnet de maintenance de l'installation</li>
          </ol>
        </div>

        <h3>Documentation fabricants</h3>
        <ul>
          <li><a href="https://www.aldes.fr" target="_blank" rel="noopener">ALDES — aldes.fr</a></li>
          <li><a href="https://www.anjos-ventilation.com" target="_blank" rel="noopener">ANJOS — anjos-ventilation.com</a></li>
          <li><a href="https://www.atlantic-ventilation.fr" target="_blank" rel="noopener">ATLANTIC — atlantic-ventilation.fr</a></li>
          <li><a href="https://www.hager.fr" target="_blank" rel="noopener">HAGER — hager.fr</a></li>
          <li><a href="https://www.legrand.fr" target="_blank" rel="noopener">LEGRAND — legrand.fr</a></li>
          <li><a href="https://www.schneider-electric.fr" target="_blank" rel="noopener">Schneider Electric — schneider-electric.fr</a></li>
          <li><a href="https://www.unelvent.com" target="_blank" rel="noopener">UNELVENT — unelvent.com</a></li>
        </ul>
      </div>
    `
  };

  function whenDocumentReady(callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(callback, 1);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
    window.addEventListener('load', callback);
  }

  whenDocumentReady(function() {
    document.addEventListener('contentLoaded', function(event) {
      if (event.detail && event.detail.section === 'dsc-constructeurs') {
        setTimeout(function() {
          const accordionHeaders = document.querySelectorAll('.accordion-header');
          accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
              this.classList.toggle('active');
              const content = this.nextElementSibling;
              if (content) {
                content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
              }
            });
          });
        }, 200);
      }
    });
  });
})();
