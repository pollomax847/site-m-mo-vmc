import 'package:flutter/material.dart';
import '../data/vmc_content.dart';

class SimpleFluxScreen extends StatelessWidget {
  const SimpleFluxScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('VMC Simple Flux'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Principe de fonctionnement',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 16),
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('• Extraction mécanique de l\'air dans les pièces de service (cuisine, salle de bain, WC)'),
                        Text('• Entrée d\'air naturel par des grilles d\'aération dans les pièces de vie'),
                        Text('• Débit d\'extraction constant ou variable selon les besoins'),
                      ],
                    ),
                  ],
                ),
              ),
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
                Text('• Simple à installer'),
                Text('• Coût modéré'),
                Text('• Efficace pour l\'extraction des polluants'),
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
                Text('• Pas de filtration de l\'air entrant'),
                Text('• Dépendance aux conditions extérieures'),
                Text('• Risque de surpression en cas de vent fort'),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              'Débits réglementaires (NF DTU 68.3)',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('• Cuisine : 75 m³/h'),
                Text('• Salle de bain : 50 m³/h'),
                Text('• WC : 30 m³/h'),
                Text('• Autre salle d\'eau : 50 m³/h'),
              ],
            ),
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