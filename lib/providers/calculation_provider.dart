import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class Calculation {
  final String vmcType;
  final String housingType;
  final Map<String, int> inputs;
  final Map<String, int> results;
  final int totalFlow;
  final int minimumFlow;
  final DateTime timestamp;

  Calculation({
    required this.vmcType,
    required this.housingType,
    required this.inputs,
    required this.results,
    required this.totalFlow,
    required this.minimumFlow,
    required this.timestamp,
  });

  Map<String, dynamic> toJson() => {
    'vmcType': vmcType,
    'housingType': housingType,
    'inputs': inputs,
    'results': results,
    'totalFlow': totalFlow,
    'minimumFlow': minimumFlow,
    'timestamp': timestamp.toIso8601String(),
  };

  factory Calculation.fromJson(Map<String, dynamic> json) => Calculation(
    vmcType: json['vmcType'],
    housingType: json['housingType'],
    inputs: Map<String, int>.from(json['inputs']),
    results: Map<String, int>.from(json['results']),
    totalFlow: json['totalFlow'],
    minimumFlow: json['minimumFlow'],
    timestamp: DateTime.parse(json['timestamp']),
  );
}

class CalculationProvider with ChangeNotifier {
  List<Calculation> _calculations = [];

  List<Calculation> get calculations => _calculations;

  CalculationProvider() {
    _loadCalculations();
  }

  void addCalculation(Calculation calculation) {
    _calculations.insert(0, calculation);
    if (_calculations.length > 10) {
      _calculations = _calculations.sublist(0, 10);
    }
    _saveCalculations();
    notifyListeners();
  }

  void clearHistory() {
    _calculations.clear();
    _saveCalculations();
    notifyListeners();
  }

  Future<void> _loadCalculations() async {
    final prefs = await SharedPreferences.getInstance();
    final calculationsJson = prefs.getStringList('calculations') ?? [];
    _calculations = calculationsJson
        .map((json) => Calculation.fromJson(jsonDecode(json)))
        .toList();
    notifyListeners();
  }

  Future<void> _saveCalculations() async {
    final prefs = await SharedPreferences.getInstance();
    final calculationsJson = _calculations
        .map((calc) => jsonEncode(calc.toJson()))
        .toList();
    await prefs.setStringList('calculations', calculationsJson);
  }
}