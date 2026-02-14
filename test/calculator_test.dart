import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:site_m_mo_vmc/main.dart';
import 'package:site_m_mo_vmc/providers/theme_provider.dart';
import 'package:site_m_mo_vmc/providers/calculation_provider.dart';

void main() {
  testWidgets('Calculator screen basic functionality', (WidgetTester tester) async {
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => ThemeProvider()),
          ChangeNotifierProvider(create: (_) => CalculationProvider()),
        ],
        child: const MyApp(),
      ),
    );

    // Navigate to calculator
    await tester.tap(find.text('Calculateur de débits'));
    await tester.pumpAndSettle();

    // Verify calculator screen is displayed
    expect(find.text('Calculateur de débits réglementaires'), findsOneWidget);

    // Select VMC type
    await tester.tap(find.byType(DropdownButtonFormField<String>).first);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Simple Flux').last);
    await tester.pumpAndSettle();

    // Select housing type
    await tester.tap(find.byType(DropdownButtonFormField<String>).last);
    await tester.pumpAndSettle();
    await tester.tap(find.text('T2').last);
    await tester.pumpAndSettle();

    // Enter room count
    await tester.enterText(find.byType(TextFormField).first, '1');
    await tester.pump();

    // Tap calculate
    await tester.tap(find.text('Calculer'));
    await tester.pump();

    // Verify results are shown
    expect(find.text('Résultats:'), findsOneWidget);
  });
}