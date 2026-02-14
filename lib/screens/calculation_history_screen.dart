import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../providers/calculation_provider.dart';

class CalculationHistoryScreen extends StatelessWidget {
  const CalculationHistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Historique des calculs'),
        actions: [
          Consumer<CalculationProvider>(
            builder: (context, provider, child) => IconButton(
              icon: const Icon(Icons.clear),
              onPressed: provider.calculations.isEmpty
                  ? null
                  : () => _showClearDialog(context, provider),
            ),
          ),
        ],
      ),
      body: Consumer<CalculationProvider>(
        builder: (context, provider, child) {
          if (provider.calculations.isEmpty) {
            return const Center(
              child: Text('Aucun calcul enregistré'),
            );
          }

          return ListView.builder(
            itemCount: provider.calculations.length,
            itemBuilder: (context, index) {
              final calculation = provider.calculations[index];
              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: ExpansionTile(
                  title: Text(
                    '${calculation.vmcType} - ${calculation.housingType} (${DateFormat('dd/MM/yyyy HH:mm').format(calculation.timestamp)})',
                  ),
                  subtitle: Text('Débit total: ${calculation.totalFlow} m³/h'),
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ...calculation.inputs.entries.map((entry) =>
                            Text('${entry.key.replaceAll('-', ' ')}: ${entry.value}')),
                          const Divider(),
                          ...calculation.results.entries.map((entry) =>
                            Text('${entry.key.replaceAll('-', ' ')}: ${entry.value} m³/h')),
                          const Divider(),
                          Text('Débit total: ${calculation.totalFlow} m³/h'),
                          Text('Débit minimum: ${calculation.minimumFlow} m³/h'),
                          Text(
                            calculation.totalFlow >= calculation.minimumFlow ? 'Conforme' : 'Non conforme',
                            style: TextStyle(
                              color: calculation.totalFlow >= calculation.minimumFlow ? Colors.green : Colors.red,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }

  void _showClearDialog(BuildContext context, CalculationProvider provider) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Effacer l\'historique'),
        content: const Text('Voulez-vous effacer tout l\'historique des calculs ?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Annuler'),
          ),
          TextButton(
            onPressed: () {
              provider.clearHistory();
              Navigator.pop(context);
            },
            child: const Text('Effacer'),
          ),
        ],
      ),
    );
  }
}