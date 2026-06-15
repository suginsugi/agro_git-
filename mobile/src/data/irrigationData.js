// Realistic smart irrigation data

export const irrigationZones = [
  {
    id: 'Z1',
    name: 'Zone 1 — Paddy North',
    crop: 'Paddy',
    type: 'Flood + Canal',
    soilMoisture: 78,
    targetMoisture: 80,
    status: 'active',
    lastIrrigated: '2026-06-01 06:00',
    nextScheduled: '2026-06-03 06:00',
    waterUsed: 4200, // liters per hour
    area: 9.1,
  },
  {
    id: 'Z2',
    name: 'Zone 2 — Paddy South',
    crop: 'Paddy',
    type: 'Flood + Canal',
    soilMoisture: 72,
    targetMoisture: 80,
    status: 'scheduled',
    lastIrrigated: '2026-05-31 06:00',
    nextScheduled: '2026-06-02 18:00',
    waterUsed: 3800,
    area: 9.1,
  },
  {
    id: 'Z3',
    name: 'Zone 3 — Ragi Field',
    crop: 'Ragi',
    type: 'Sprinkler',
    soilMoisture: 45,
    targetMoisture: 50,
    status: 'idle',
    lastIrrigated: '2026-05-30 07:00',
    nextScheduled: '2026-06-04 07:00',
    waterUsed: 1800,
    area: 12.8,
  },
  {
    id: 'Z4',
    name: 'Zone 4 — Tomato Block',
    crop: 'Tomato',
    type: 'Drip',
    soilMoisture: 55,
    targetMoisture: 65,
    status: 'active',
    lastIrrigated: '2026-06-02 05:30',
    nextScheduled: '2026-06-02 17:30',
    waterUsed: 1200,
    area: 8.5,
  },
  {
    id: 'Z5',
    name: 'Zone 5 — Groundnut',
    crop: 'Groundnut',
    type: 'Drip',
    soilMoisture: 38,
    targetMoisture: 45,
    status: 'needs-attention',
    lastIrrigated: '2026-06-01 06:30',
    nextScheduled: '2026-06-02 15:00',
    waterUsed: 900,
    area: 9.0,
  },
];

export const waterUsageHistory = [
  { date: 'May 27', usage: 42500, target: 45000, rainfall: 0 },
  { date: 'May 28', usage: 44200, target: 45000, rainfall: 0 },
  { date: 'May 29', usage: 38000, target: 45000, rainfall: 12 },
  { date: 'May 30', usage: 35500, target: 45000, rainfall: 18 },
  { date: 'May 31', usage: 41000, target: 45000, rainfall: 2 },
  { date: 'Jun 1', usage: 43800, target: 45000, rainfall: 0 },
  { date: 'Jun 2', usage: 39500, target: 45000, rainfall: 5 },
];

export const irrigationSchedule = [
  { time: '05:30', zone: 'Zone 4 — Tomato', duration: '45 min', type: 'Drip', status: 'completed' },
  { time: '06:00', zone: 'Zone 1 — Paddy N', duration: '120 min', type: 'Flood', status: 'completed' },
  { time: '15:00', zone: 'Zone 5 — Groundnut', duration: '30 min', type: 'Drip', status: 'upcoming' },
  { time: '17:30', zone: 'Zone 4 — Tomato', duration: '45 min', type: 'Drip', status: 'upcoming' },
  { time: '18:00', zone: 'Zone 2 — Paddy S', duration: '120 min', type: 'Flood', status: 'upcoming' },
];

export const waterEfficiencyMetrics = {
  overallEfficiency: 82,
  waterSaved: 18500, // liters this week vs last week
  waterSavedPercent: 12,
  costSavings: '₹2,450',
  recommendations: [
    'Shift Tomato drip timing to early morning (5:00 AM) to reduce evaporation loss by 15%',
    'Groundnut Zone 5 moisture is below threshold — increase drip duration by 10 minutes',
    'Skip Zone 3 (Ragi) irrigation until Thursday due to expected rainfall',
    'Consider mulching Zone 4 to improve moisture retention and reduce irrigation frequency',
  ],
};
