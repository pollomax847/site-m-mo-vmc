import 'package:flutter/material.dart';
import '../data/vmc_content.dart';

class DoubleFluxScreen extends StatelessWidget {
  const DoubleFluxScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('VMC Double Flux'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Types de VMC Double Flux',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('• Hygro-réglable A : Régulation basée sur l\'humidité relative, débit variable, économie d\'énergie'),
                Text('• Hygro-réglable B : Régulation plus précise, adaptation aux conditions intérieures, performance énergétique optimale'),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              'Principe de fonctionnement',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('• Extraction de l\'air vicié des pièces humides'),
                Text('• Insufflation d\'air frais filtré dans les pièces de vie'),
                Text('• Échangeur thermique pour récupérer la chaleur'),
                Text('• Filtration de l\'air entrant'),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              'Avantages',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('• Qualité d\'air intérieur améliorée'),
                Text('• Récupération de chaleur (jusqu\'à 90%)'),
                Text('• Filtration des polluants extérieurs'),
                Text('• Confort acoustique'),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              'Inconvénients',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('• Coût d\'installation plus élevé'),
                Text('• Maintenance plus complexe'),
                Text('• Encombrement plus important'),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              'Débits réglementaires',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text('Les débits sont similaires à la VMC simple flux pour l\'extraction, mais le système assure également l\'insufflation.'),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Retour à l\'accueil'),
            ),
          ],
        ),
      ),
    );
  }
}