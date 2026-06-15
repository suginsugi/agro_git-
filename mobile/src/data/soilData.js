// Realistic soil analysis data based on typical Indian agricultural soil testing

export const soilSampleData = {
  sampleId: 'SL-2026-04892',
  collectionDate: '2026-05-18',
  location: 'Block A3, Green Valley Farm',
  coordinates: { lat: 12.9716, lng: 77.5946 },
  depth: '0-30 cm',
  soilType: 'Red Laterite Soil',
  textureClass: 'Sandy Clay Loam',
};

export const soilParameters = [
  { parameter: 'pH', value: 6.4, unit: '', optimal: '6.0-7.0', status: 'optimal', category: 'Basic' },
  { parameter: 'Electrical Conductivity', value: 0.38, unit: 'dS/m', optimal: '<1.0', status: 'optimal', category: 'Basic' },
  { parameter: 'Organic Carbon', value: 0.52, unit: '%', optimal: '>0.75', status: 'low', category: 'Basic' },
  { parameter: 'Available Nitrogen', value: 185, unit: 'kg/ha', optimal: '280-560', status: 'low', category: 'Primary Nutrients' },
  { parameter: 'Available Phosphorus', value: 22.4, unit: 'kg/ha', optimal: '23-56', status: 'medium', category: 'Primary Nutrients' },
  { parameter: 'Available Potassium', value: 312, unit: 'kg/ha', optimal: '280-560', status: 'optimal', category: 'Primary Nutrients' },
  { parameter: 'Calcium', value: 4.8, unit: 'meq/100g', optimal: '5-10', status: 'medium', category: 'Secondary Nutrients' },
  { parameter: 'Magnesium', value: 2.1, unit: 'meq/100g', optimal: '1.5-3.0', status: 'optimal', category: 'Secondary Nutrients' },
  { parameter: 'Sulphur', value: 14.2, unit: 'mg/kg', optimal: '>10', status: 'optimal', category: 'Secondary Nutrients' },
  { parameter: 'Zinc', value: 0.48, unit: 'mg/kg', optimal: '>0.6', status: 'low', category: 'Micronutrients' },
  { parameter: 'Iron', value: 8.6, unit: 'mg/kg', optimal: '>4.5', status: 'optimal', category: 'Micronutrients' },
  { parameter: 'Manganese', value: 3.2, unit: 'mg/kg', optimal: '>2.0', status: 'optimal', category: 'Micronutrients' },
  { parameter: 'Copper', value: 0.32, unit: 'mg/kg', optimal: '>0.2', status: 'optimal', category: 'Micronutrients' },
  { parameter: 'Boron', value: 0.38, unit: 'mg/kg', optimal: '>0.5', status: 'low', category: 'Micronutrients' },
  { parameter: 'Soil Moisture', value: 18.5, unit: '%', optimal: '20-30', status: 'medium', category: 'Physical' },
  { parameter: 'Bulk Density', value: 1.42, unit: 'g/cm³', optimal: '1.1-1.4', status: 'medium', category: 'Physical' },
];

export const soilHealthScore = {
  overall: 64,
  nutrientBalance: 58,
  biologicalActivity: 71,
  physicalStructure: 66,
  waterRetention: 62,
};

export const nutrientRadarData = [
  { nutrient: 'Nitrogen', value: 42, fullMark: 100 },
  { nutrient: 'Phosphorus', value: 68, fullMark: 100 },
  { nutrient: 'Potassium', value: 85, fullMark: 100 },
  { nutrient: 'Calcium', value: 72, fullMark: 100 },
  { nutrient: 'Magnesium', value: 78, fullMark: 100 },
  { nutrient: 'Sulphur', value: 82, fullMark: 100 },
  { nutrient: 'Zinc', value: 38, fullMark: 100 },
  { nutrient: 'Boron', value: 45, fullMark: 100 },
];

export const cropRecommendations = [
  {
    crop: 'Finger Millet (Ragi)',
    suitability: 92,
    expectedYield: '2.8-3.4 t/ha',
    waterReq: 'Low (350-500 mm)',
    growthPeriod: '110-130 days',
    season: 'Kharif',
    nutrients: 'Low N demand, tolerates acidic soil',
  },
  {
    crop: 'Groundnut',
    suitability: 85,
    expectedYield: '1.8-2.4 t/ha',
    waterReq: 'Moderate (500-700 mm)',
    growthPeriod: '100-120 days',
    season: 'Kharif/Rabi',
    nutrients: 'N-fixing, needs Ca and S',
  },
  {
    crop: 'Tomato',
    suitability: 78,
    expectedYield: '25-35 t/ha',
    waterReq: 'Moderate (600-800 mm)',
    growthPeriod: '90-120 days',
    season: 'Rabi',
    nutrients: 'High K demand, moderate N and P',
  },
  {
    crop: 'Maize',
    suitability: 74,
    expectedYield: '5.5-7.0 t/ha',
    waterReq: 'Moderate (500-800 mm)',
    growthPeriod: '90-110 days',
    season: 'Kharif',
    nutrients: 'High N demand — needs supplementation',
  },
  {
    crop: 'Red Gram (Tur)',
    suitability: 88,
    expectedYield: '1.2-1.8 t/ha',
    waterReq: 'Low (350-500 mm)',
    growthPeriod: '150-180 days',
    season: 'Kharif',
    nutrients: 'N-fixing, drought tolerant',
  },
];

export const fertilityPlan = [
  {
    category: 'Nitrogen Management',
    icon: 'Leaf',
    priority: 'high',
    recommendations: [
      'Apply 120 kg/ha Urea in 3 split doses (basal, 30 DAP, 60 DAP)',
      'Incorporate Dhaincha/Sesbania as green manure before sowing',
      'Apply 5 t/ha well-decomposed farmyard manure (FYM)',
      'Consider Azospirillum biofertilizer at 2 kg/ha with seed treatment',
    ],
  },
  {
    category: 'Micronutrient Correction',
    icon: 'Droplets',
    priority: 'high',
    recommendations: [
      'Apply Zinc Sulphate (ZnSO₄) at 25 kg/ha as basal application',
      'Foliar spray of Borax at 0.2% at flowering stage',
      'Apply multi-micronutrient mixture (Grade IV) at 5 kg/ha',
    ],
  },
  {
    category: 'Organic Matter Building',
    icon: 'Trees',
    priority: 'medium',
    recommendations: [
      'Apply vermicompost at 2.5 t/ha annually',
      'Practice crop residue incorporation post-harvest',
      'Mulching with organic material to build soil carbon',
      'Rotate with leguminous crops every alternate season',
    ],
  },
  {
    category: 'Soil Physical Improvement',
    icon: 'Layers',
    priority: 'medium',
    recommendations: [
      'Deep ploughing once in 3 years to break compaction',
      'Apply gypsum at 500 kg/ha to improve soil structure',
      'Maintain soil moisture with drip irrigation to reduce crusting',
      'Avoid excessive tillage to preserve soil aggregates',
    ],
  },
];
