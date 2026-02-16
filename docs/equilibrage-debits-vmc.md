# Équilibrage des débits d'air pour VMC — approche terrain

> Version pratique et vérifiable : procédures de mesure, erreurs fréquentes rencontrées en chantier et actions correctives.

## Pourquoi remettre à plat l'équilibrage ? 🔧
Les valeurs nominales inscrites sur les modules sont des indications issuess de bancs d'essai. En situation réelle (étanchéité du logement, vents, cheminées, filtres encrassés, conduits obstrués), les débits mesurés diffèrent souvent — parfois fortement — des débits théoriques. Cette fiche donne une méthode simple pour mesurer, diagnostiquer et corriger l'équilibrage in situ.

## Avant de commencer — prérequis ✅
- Fermer fenêtres et ouvrants extérieurs.
- Couper hotte, ventilations ponctuelles et dispositifs susceptibles d'influencer le test.
- Mettre la VMC en régime normal de fonctionnement (pas en boost).
- Filtre(s) propre(s) et accès dégagé aux bouches et grilles.

## Outils recommandés
- Anémomètre/vane (ou débitmètre de gaine) pour mesurer m/s → m³/h
- Manomètre différentiel (pour détecter surpressions/dépressions)
- Fiche de relevé (tableau simple)
- Crayon de fumée ou tube fumigène pour visualiser les flux

## Procédure de vérification et d'équilibrage (terrain) — étapes simples
1. Mesurer chaque bouche d'extraction (m³/h) et noter la valeur.
2. Mesurer chaque entrée d'air (grille/menuiserie) en conditions réelles.
3. Faire la somme extraction = S_extr et la somme entrée = S_ent.
4. Comparer : objectif opérationnel ±10% (valeur cible), tolérance pratique ±20%.
5. Si |S_extr − S_ent| > tolérance : identifier cause (bouche bouchée, module mal dimensionné, hygroréglable collé, fuite). Corriger -> retester.

## Actions correctives rapides (cas courants)
- Extraction > Entrées :
  - Vérifier bouches d'extraction et conduit (débouchage, filtre encrassé).
  - Augmenter section d'entrée (module plus grand) ou ajouter une entrée supplémentaire.
  - Remplacer hygroréglable collé / colmaté.
- Entrées > Extraction :
  - Rechercher prises d'air parasites (fuites, sous-face de balcon, soupiraux).
  - Réduire section d'entrée (insert restrictif) ou répartir sur plusieurs grilles.
  - Vérifier que l'extracteur n'a pas été remplacé par un modèle de moindre débit.
- Sens de flux inversé / phénomènes de retour d'air :
  - Contrôler chapeaux, déflecteurs et présence d'un clapet anti-retour.

## Retours terrain (problèmes fréquents) ⚠️
- Hygroréglables collés par la poussière → débit réduit en permanence.
- Entrées d'air mal dimensionnées par rapport aux débits extraits (installations « au doigt mouillé »).
- Ventilation de cuisine/foyers et dispositifs ponctuels perturbant les mesures.
- Dégagement sous-porte insuffisant empêchant transfert d'air entre pièces.

## Règles réglementaires (rappel)
L'arrêté du 24 mars 1982 fixe des minima d'extraction selon la taille du logement — ces minima restent une base légale, mais en pratique il faut mesurer et adapter l'installation pour assurer un renouvellement d'air effectif et un confort hygro-thermique.

| Type de logement | Débit total minimal extrait (m³/h) |
|------------------|-------------------------------------|
| T1               | 35                                  |
| T2               | 60                                  |
| T3               | 75                                  |
| T4               | 90                                  |
| T5               | 105                                 |
| T6               | 120                                 |
| T7 et plus       | 135                                 |

> Note : ces chiffres sont des minima réglementaires — l'équilibrage doit être vérifié en situation réelle et documenté.

## Exemple de fiche de mesure (à remplir sur chantier)
| Local | Débit cible (m³/h) | Débit mesuré (m³/h) | Écart (%) | Action |
|-------|--------------------:|---------------------:|---------:|--------|
| SdB   | 30                 | 27                  | −10%     | OK     |
| WC    | 15                 | 10                  | −33%     | Vérifier bouche |
| Séjour| 45                 | 50                  | +11%     | Répartir entrées |

## Conseils pratiques et limites 💡
- Visez ±10% en première passe ; documentez toute tolérance supérieure.
- Ne pas obstruer les dispositifs pour « améliorer » des mesures — corriger la source.
- Pour déséquilibres persistants, vérifier l'étanchéité du réseau et la compatibilité des matériels (ex. débit nominal de l'extracteur).

## Quand appeler un spécialiste
- Forte différence (>20%) après nettoyage et réglages simples.
- Présence de courants d'air significatifs ou problèmes d'humidité/mauvaises odeurs persistantes.

---

Si vous voulez, j'applique cette version dans `docs/equilibrage-debits-vmc.md` (déjà fait) et peux :
1. Commiter et ouvrir une PR, ou
2. Faire d'autres ajustements sur le texte.
Dites-moi la suite souhaitée.
