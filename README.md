samples, guidance on mobile development, and a full API reference.

# Mémo Technique VMC

Site web statique pour la documentation technique des installations VMC.

## Structure du projet

- **index.html** : page principale
- **style.css, style.min.css** : styles principaux
- **script.js, script.min.js** : logique principale
- **styles/mobile-fixes.min.css** : correctifs mobiles
- **js/**, **css/** : modules et styles additionnels
- **assets/images** : logos et icônes

## Modifier le site

1. Modifiez les fichiers HTML, CSS ou JS selon vos besoins.
2. Pour minifier les scripts, utilisez :
	```bash
	npm run minify
	```
3. Testez localement avec :
	```bash
	npm start
	# puis ouvrez http://localhost:3000
	```

## Déploiement sur Vercel

Le site est prêt à être déployé sur Vercel comme site statique. La configuration (vercel.json) publie la racine du projet.

## Contribution

Toute contribution ou suggestion d’amélioration est la bienvenue.
