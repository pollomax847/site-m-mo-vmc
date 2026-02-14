import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/debits_reglementaires.dart';
import '../widgets/pdf_generator.dart';
import '../providers/calculation_provider.dart';
import 'calculation_history_screen.dart';

class CalculatorScreen extends StatefulWidget {
  const CalculatorScreen({super.key});

  @override
  _CalculatorScreenState createState() => _CalculatorScreenState();
}

class _CalculatorScreenState extends State<CalculatorScreen> {
  String? selectedVmcType;
  String? selectedHousingType;
  final Map<String, TextEditingController> controllers = {
    'cuisine': TextEditingController(),
    'salle-de-bain': TextEditingController(),
    'wc': TextEditingController(),
    'autre-sdb': TextEditingController(),
  };

  Map<String, int> results = {};
  int totalFlow = 0;
  int minimumFlow = 0;
  bool isCalculated = false;

  void calculate() {
    if (selectedVmcType == null || selectedHousingType == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Veuillez sélectionner le type de VMC et de logement')),
      );
      return;
    }

    bool hasValidInput = false;
    controllers.forEach((key, controller) {
      if (controller.text.isNotEmpty && int.tryParse(controller.text) != null) {
        hasValidInput = true;
      }
    });

    if (!hasValidInput) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Veuillez entrer au moins un nombre de pièces')),
      );
      return;
    }

    results.clear();
    totalFlow = 0;

    controllers.forEach((roomType, controller) {
      int count = int.tryParse(controller.text) ?? 0;
      int flowPerRoom = debitsReglementaires[selectedVmcType!]![roomType] ?? 0;
      int totalForType = count * flowPerRoom;
      results[roomType] = totalForType;
      totalFlow += totalForType;
    });

    minimumFlow = minimumDebitsParLogement[selectedHousingType!] ?? 0;

    final inputs = controllers.map((key, controller) => MapEntry(key, int.tryParse(controller.text) ?? 0));

    final calculation = Calculation(
      vmcType: selectedVmcType!,
      housingType: selectedHousingType!,
      inputs: inputs,
      results: Map.from(results),
      totalFlow: totalFlow,
      minimumFlow: minimumFlow,
      timestamp: DateTime.now(),
    );

    Provider.of<CalculationProvider>(context, listen: false).addCalculation(calculation);

    setState(() {
      isCalculated = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Calculateur de débits réglementaires'),
        actions: [
          IconButton(
            icon: const Icon(Icons.history),
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const CalculationHistoryScreen()),
            ),
          ),
        ],
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
                  children: [
                    DropdownButtonFormField<String>(
                      value: selectedVmcType,
                      decoration: const InputDecoration(labelText: 'Type de VMC'),
                      items: [
                        const DropdownMenuItem(value: 'simple-flux', child: Text('Simple Flux')),
                        const DropdownMenuItem(value: 'hygro-a', child: Text('Hygro A')),
                        const DropdownMenuItem(value: 'hygro-b', child: Text('Hygro B')),
                      ],
                      onChanged: (value) => setState(() => selectedVmcType = value),
                      validator: (value) => value == null ? 'Sélectionnez un type de VMC' : null,
                    ),
                    const SizedBox(height: 16),
                    DropdownButtonFormField<String>(
                      value: selectedHousingType,
                      decoration: const InputDecoration(labelText: 'Type de logement'),
                      items: ['T1', 'T2', 'T3', 'T4', 'T5+']
                          .map((type) => DropdownMenuItem(value: type, child: Text(type)))
                          .toList(),
                      onChanged: (value) => setState(() => selectedHousingType = value),
                    ),
                    const SizedBox(height: 16),
                    ...controllers.entries.map((entry) => Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: TextFormField(
                        controller: entry.value,
                        decoration: InputDecoration(
                          labelText: 'Nombre de ${entry.key.replaceAll('-', ' ')}',
                          hintText: '0',
                        ),
                        keyboardType: TextInputType.number,
                        validator: (value) {
                          if (value != null && value.isNotEmpty && int.tryParse(value) == null) {
                            return 'Entrez un nombre valide';
                          }
                          return null;
                        },
                      ),
                    )),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: calculate,
                      child: const Text('Calculer'),
                    ),
                  ],
                ),
              ),
            ),
            if (isCalculated) ...[
              const SizedBox(height: 24),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Résultats:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 16),
                      ...results.entries.map((entry) => Text('${entry.key.replaceAll('-', ' ')}: ${entry.value} m³/h')),
                      const SizedBox(height: 16),
                      Text('Débit total: $totalFlow m³/h'),
                      Text('Débit minimum réglementaire: $minimumFlow m³/h'),
                      Text(
                        totalFlow >= minimumFlow ? 'Conforme' : 'Non conforme',
                        style: TextStyle(
                          color: totalFlow >= minimumFlow ? Colors.green : Colors.red,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () => generatePdf(context, selectedVmcType!, selectedHousingType!, controllers, results, totalFlow, minimumFlow),
                        child: const Text('Exporter en PDF'),
                      ),
                    ],
                  ),
                ),
              ),
            ],
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