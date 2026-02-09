import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:site_m_mo_vmc/main.dart';
import 'package:site_m_mo_vmc/providers/theme_provider.dart';

void main() {
  testWidgets('Home screen displays title and sections', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      ChangeNotifierProvider(
        create: (context) => ThemeProvider(),
        child: const MyApp(),
      ),
    );

    // Verify that the title is displayed.
    expect(find.text('Mémo Technique VMC'), findsOneWidget);

    // Verify that the sections are displayed.
    expect(find.text('VMC Simple Flux'), findsOneWidget);
    expect(find.text('VMC Double Flux'), findsOneWidget);
    expect(find.text('Calculateur de débits'), findsOneWidget);

    // Verify search field is present.
    expect(find.byType(TextField), findsOneWidget);
  });
}