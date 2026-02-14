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
  String _selectedLogo = 'lib/assets/icons/logo_memo_vmc_square.png';
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset(
              _selectedLogo,
              height: 40,
            ),
            const SizedBox(width: 12),
            const Text('Mémo Technique VMC'),
          ],
        ),
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
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Color(0xFF007BFF),
              ),
              child: Text(
                'Navigation',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            ..._sections.map((section) => ListTile(
              title: Text(section['title']),
              subtitle: Text(section['subtitle']),
              onTap: () {
                Navigator.pop(context); // Close drawer
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => section['screen']),
                );
              },
            )),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Sélecteur de logo
              Row(
                children: [
                  const Text('Logo : '),
                  DropdownButton<String>(
                    value: _selectedLogo,
                    items: [
                      DropdownMenuItem(
                        value: 'lib/assets/icons/logo_memo_vmc_square.png',
                        child: const Text('Carré'),
                      ),
                      DropdownMenuItem(
                        value: 'lib/assets/icons/logo_memo_vmc_round.png',
                        child: const Text('Rond'),
                      ),
                      DropdownMenuItem(
                        value: 'lib/assets/icons/logo_memo_vmc_transparent.png',
                        child: const Text('Transparent'),
                      ),
                    ],
                    onChanged: (value) {
                      setState(() {
                        _selectedLogo = value!;
                      });
                    },
                  ),
                ],
              ),
              const SizedBox(height: 24),
              TextField(
                decoration: const InputDecoration(
                  labelText: 'Rechercher...',
                  prefixIcon: Icon(Icons.search),
                  border: OutlineInputBorder(),
                ),
                onChanged: (value) => setState(() => _searchQuery = value),
              ),
              const SizedBox(height: 24),
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
              ..._sections.where((section) =>
                section['title'].toLowerCase().contains(_searchQuery.toLowerCase()) ||
                section['subtitle'].toLowerCase().contains(_searchQuery.toLowerCase())
              ).map((section) => Card(
                child: ListTile(
                  title: Text(section['title']),
                  subtitle: Text(section['subtitle']),
                  trailing: const Icon(Icons.arrow_forward_ios),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => section['screen']),
                    );
                  },
                ),
              )),
            ],
          ),
        ),
      ),
    );
  }
}