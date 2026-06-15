// Realistic crop monitoring and yield data

export const farmOverview = {
  totalArea: 48.5,
  unit: 'hectares',
  activeCrops: 4,
  currentSeason: 'Kharif 2026',
  farmName: 'Green Valley Agricultural Estate',
  location: 'Mandya District, Karnataka',
  irrigationType: 'Drip + Canal',
};

export const cropFields = [
  {
    id: 'F001',
    name: 'Block A — North Field',
    crop: 'Paddy (Rice)',
    variety: 'KRH-4 Hybrid',
    area: 18.2,
    plantingDate: '2026-05-10',
    growthStage: 'Tillering',
    daysAfterPlanting: 23,
    totalDays: 135,
    plantDensity: '33 hills/m²',
    healthScore: 87,
    ndvi: 0.72,
    status: 'healthy',
  },
  {
    id: 'F002',
    name: 'Block B — East Field',
    crop: 'Finger Millet (Ragi)',
    variety: 'GPU-28',
    area: 12.8,
    plantingDate: '2026-05-05',
    growthStage: 'Vegetative',
    daysAfterPlanting: 28,
    totalDays: 120,
    plantDensity: '44 plants/m²',
    healthScore: 92,
    ndvi: 0.78,
    status: 'excellent',
  },
  {
    id: 'F003',
    name: 'Block C — South Field',
    crop: 'Tomato',
    variety: 'Arka Rakshak',
    area: 8.5,
    plantingDate: '2026-04-20',
    growthStage: 'Flowering',
    daysAfterPlanting: 43,
    totalDays: 110,
    plantDensity: '2.5 plants/m²',
    healthScore: 71,
    ndvi: 0.61,
    status: 'stress',
  },
  {
    id: 'F004',
    name: 'Block D — West Field',
    crop: 'Groundnut',
    variety: 'TMV-2',
    area: 9.0,
    plantingDate: '2026-05-15',
    growthStage: 'Seedling',
    daysAfterPlanting: 18,
    totalDays: 110,
    plantDensity: '33 plants/m²',
    healthScore: 95,
    ndvi: 0.45,
    status: 'excellent',
  },
];

export const growthTrendData = [
  { week: 'W1', paddy: 0.15, ragi: 0.18, tomato: 0.42, groundnut: 0.10 },
  { week: 'W2', paddy: 0.28, ragi: 0.32, tomato: 0.51, groundnut: 0.22 },
  { week: 'W3', paddy: 0.45, ragi: 0.52, tomato: 0.58, groundnut: 0.35 },
  { week: 'W4', paddy: 0.58, ragi: 0.65, tomato: 0.61, groundnut: 0.45 },
  { week: 'W5', paddy: 0.65, ragi: 0.72, tomato: 0.64, groundnut: null },
  { week: 'W6', paddy: 0.72, ragi: 0.78, tomato: 0.61, groundnut: null },
];

export const yieldForecastData = {
  paddy: {
    predicted: 5.8,
    unit: 't/ha',
    confidence: { low: 5.2, high: 6.4 },
    historical: [
      { year: '2022', yield: 5.1 },
      { year: '2023', yield: 5.4 },
      { year: '2024', yield: 5.6 },
      { year: '2025', yield: 5.5 },
      { year: '2026 (Est.)', yield: 5.8 },
    ],
    factors: [
      { factor: 'Soil Health', impact: 'positive', score: 78 },
      { factor: 'Weather Pattern', impact: 'positive', score: 82 },
      { factor: 'Nutrient Supply', impact: 'neutral', score: 65 },
      { factor: 'Pest Pressure', impact: 'neutral', score: 70 },
      { factor: 'Water Availability', impact: 'positive', score: 85 },
    ],
  },
  ragi: {
    predicted: 3.2,
    unit: 't/ha',
    confidence: { low: 2.8, high: 3.5 },
    historical: [
      { year: '2022', yield: 2.6 },
      { year: '2023', yield: 2.9 },
      { year: '2024', yield: 3.0 },
      { year: '2025', yield: 3.1 },
      { year: '2026 (Est.)', yield: 3.2 },
    ],
  },
};

export const seasonalReportData = {
  season: 'Kharif 2026',
  period: 'May – October 2026',
  totalRevenue: '₹34,52,000',
  totalExpenses: '₹18,75,000',
  netProfit: '₹15,77,000',
  cropPerformance: [
    { crop: 'Paddy', area: 18.2, yield: '5.8 t/ha', revenue: '₹18,40,000', status: 'Above Average' },
    { crop: 'Ragi', area: 12.8, yield: '3.2 t/ha', revenue: '₹8,20,000', status: 'Average' },
    { crop: 'Tomato', area: 8.5, yield: '28 t/ha', revenue: '₹5,60,000', status: 'Below Average' },
    { crop: 'Groundnut', area: 9.0, yield: '2.1 t/ha', revenue: '₹2,32,000', status: 'Projected' },
  ],
};
