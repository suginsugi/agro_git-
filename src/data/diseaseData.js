// Realistic plant disease data for agricultural diagnostics

export const diseaseLibrary = [
  {
    id: 'BLB001',
    name: 'Bacterial Leaf Blight',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    crop: 'Rice (Paddy)',
    severity: 'moderate',
    confidence: 89,
    affectedArea: 15,
    symptoms: [
      'Water-soaked lesions on leaf margins',
      'Yellow to white lesions along veins',
      'Wilting and drying of leaves from tips',
      'Milky or opaque bacterial ooze on leaf surface',
    ],
    conditions: 'High humidity (>80%), temperatures 25-34°C, heavy rainfall, excessive nitrogen application',
    treatments: [
      {
        type: 'Chemical Control',
        actions: [
          'Spray Streptocycline 0.01% + Copper Oxychloride 0.25%',
          'Apply Bacterinol at 500 ppm at 15-day intervals',
          'Use seed treatment with Pseudomonas fluorescens at 10g/kg seed',
        ],
      },
      {
        type: 'Cultural Practices',
        actions: [
          'Reduce nitrogen fertilizer by 25% in affected areas',
          'Ensure proper field drainage to avoid water stagnation',
          'Remove and destroy infected plant debris',
          'Maintain balanced N:P:K ratio (avoid excess nitrogen)',
        ],
      },
      {
        type: 'Biological Control',
        actions: [
          'Apply Pseudomonas fluorescens at 2.5 kg/ha in standing water',
          'Use neem oil spray at 3% as preventive measure',
        ],
      },
    ],
    preventionMeasures: [
      'Use resistant varieties (e.g., Improved Samba Mahsuri)',
      'Avoid clipping of seedling tips during transplanting',
      'Practice balanced fertilization',
      'Maintain clean bunds and field periphery',
    ],
    monitoringSchedule: [
      { week: 1, action: 'Assess disease spread and spray coverage' },
      { week: 2, action: 'Second application if disease persists (>10% incidence)' },
      { week: 3, action: 'Evaluate treatment effectiveness, sample leaves for lab test' },
      { week: 4, action: 'Final assessment and adjust fertilization plan' },
    ],
  },
  {
    id: 'LB002',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    crop: 'Tomato',
    severity: 'high',
    confidence: 94,
    affectedArea: 22,
    symptoms: [
      'Dark brown water-soaked lesions on leaves',
      'White fungal growth on underside of leaves',
      'Brown firm lesions on fruits',
      'Rapid plant death in severe cases',
    ],
    conditions: 'Cool temperatures (15-22°C), high humidity, prolonged leaf wetness, foggy mornings',
  },
  {
    id: 'BL003',
    name: 'Blast Disease',
    scientificName: 'Magnaporthe oryzae',
    crop: 'Finger Millet (Ragi)',
    severity: 'low',
    confidence: 76,
    affectedArea: 5,
    symptoms: [
      'Diamond-shaped lesions with grey centers on leaves',
      'Neck blast causing panicle breakage',
      'Brown spots on nodes',
    ],
    conditions: 'High humidity, dense planting, excess nitrogen, temperatures 25-28°C',
  },
];

export const recentDetections = [
  { date: '2026-06-01', crop: 'Rice', disease: 'Bacterial Leaf Blight', severity: 'moderate', field: 'Block A' },
  { date: '2026-05-28', crop: 'Tomato', disease: 'Late Blight', severity: 'high', field: 'Block C' },
  { date: '2026-05-25', crop: 'Ragi', disease: 'Blast Disease', severity: 'low', field: 'Block B' },
  { date: '2026-05-20', crop: 'Tomato', disease: 'Leaf Curl Virus', severity: 'moderate', field: 'Block C' },
];
