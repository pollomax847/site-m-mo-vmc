# Mémo Technique VMC

Une application Flutter web pour la documentation technique et le calcul des débits réglementaires pour les installations de Ventilation Mécanique Contrôlée (VMC).

## Fonctionnalités

- **Documentation technique** pour VMC Simple Flux et Double Flux
- **Calculateur de débits** réglementaires selon le type de logement et de VMC
- **Export PDF** des résultats de calcul
- **Thème sombre/clair** avec persistance des préférences
- **Interface responsive** adaptée aux mobiles et ordinateurs

## Types de VMC supportés

- Simple Flux
- Hygro A
- Hygro B

## Calcul des débits

Le calculateur prend en compte :

- Type de VMC
- Type de logement (T1 à T5+)
- Nombre de pièces (cuisine, salle de bain, WC, etc.)

## Installation

1. Cloner le repository
2. Installer les dépendances : `flutter pub get`
3. Lancer l'application : `flutter run`

## Build pour le web

```bash
flutter build web
```

## Technologies utilisées

- Flutter
- Dart
- PDF generation (package pdf)
- State management (Provider)
- Shared Preferences

## Licence

Ce projet est sous licence MIT.
