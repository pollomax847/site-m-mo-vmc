import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/theme_provider.dart';
import 'simple_flux_screen.dart';
import 'double_flux_screen.dart';
import 'calculator_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';

  final List<Map<String, dynamic>> _sections = [
    {
      'title': 'VMC Simple Flux',
      'subtitle': 'Documentation technique',
      'screen': const SimpleFluxScreen(),
    },
    {
      'title': 'VMC Double Flux',
      'subtitle': 'Documentation technique',
      'screen': const DoubleFluxScreen(),
    },
    {
      'title': 'Calculateur de débits',
      'subtitle': 'Calcul des débits réglementaires',
      'screen': const CalculatorScreen(),
    },
  ];

  List<Map<String, dynamic>> get _filteredSections {
    if (_searchQuery.isEmpty) {
      return _sections;
    }
    return _sections.where((section) =>
        section['title'].toLowerCase().contains(_searchQuery.toLowerCase()) ||
        section['subtitle'].toLowerCase().contains(_searchQuery.toLowerCase())).toList();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mémo Technique VMC'),
        actions: [
          IconButton(
            icon: Icon(
              Provider.of<ThemeProvider>(context).isDarkMode
                  ? Icons.light_mode
                  : Icons.dark_mode,
            ),
            onPressed: () {
              Provider.of<ThemeProvider>(context, listen: false).toggleTheme();
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Bienvenue sur le Mémo Technique VMC',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              const Text(
                'Accédez à la documentation technique et au calculateur de débits réglementaires pour la ventilation mécanique contrôlée.',
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 32),
              GridView.count(
                crossAxisCount: MediaQuery.of(context).size.width > 768 ? 3 : 1,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                children: _sections.map((section) {
                  return Card(
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => section['screen']),
                        );
                      },
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              section['title'],
                              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                              textAlign: TextAlign.center,
                            ),
                            const SizedBox(height: 8),
                            Text(
                              section['subtitle'],
                              style: const TextStyle(fontSize: 14, color: Colors.grey),
                              textAlign: TextAlign.center,
                            ),
                            const SizedBox(height: 16),
                            ElevatedButton(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (context) => section['screen']),
                                );
                              },
                              child: const Text('Voir'),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}