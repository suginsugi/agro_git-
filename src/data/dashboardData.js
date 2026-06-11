// Enterprise dashboard aggregated data

export const dashboardSummary = {
  totalFarms: 3,
  totalArea: 48.5,
  activeCrops: 4,
  soilHealthAvg: 64,
  weatherAlert: 'Thunderstorm Thursday',
  diseaseAlerts: 2,
  irrigationStatus: '4/5 zones optimal',
  yieldForecast: '+8.2% vs last year',
};

export const farmPerformanceData = [
  { month: 'Jan', revenue: 245000, expenses: 180000 },
  { month: 'Feb', revenue: 198000, expenses: 165000 },
  { month: 'Mar', revenue: 312000, expenses: 195000 },
  { month: 'Apr', revenue: 280000, expenses: 210000 },
  { month: 'May', revenue: 425000, expenses: 245000 },
  { month: 'Jun', revenue: 380000, expenses: 220000 },
];

export const activeAlerts = [
  {
    id: 'A001',
    type: 'disease',
    severity: 'high',
    title: 'Late Blight detected in Block C (Tomato)',
    time: '2 hours ago',
    action: 'Apply fungicide spray immediately',
  },
  {
    id: 'A002',
    type: 'weather',
    severity: 'warning',
    title: 'Thunderstorm expected Thursday — 75% precipitation',
    time: '6 hours ago',
    action: 'Secure field equipment, pause spraying operations',
  },
  {
    id: 'A003',
    type: 'irrigation',
    severity: 'medium',
    title: 'Zone 5 (Groundnut) soil moisture below threshold',
    time: '8 hours ago',
    action: 'Schedule immediate drip irrigation',
  },
  {
    id: 'A004',
    type: 'soil',
    severity: 'info',
    title: 'Zinc deficiency trending — Block A soil report',
    time: '1 day ago',
    action: 'Apply ZnSO₄ at next fertilizer schedule',
  },
];

export const quickActions = [
  { label: 'Upload Soil Report', icon: 'FileUp', href: '/soil-analysis' },
  { label: 'Check Weather', icon: 'CloudSun', href: '/weather' },
  { label: 'Scan Disease', icon: 'ScanSearch', href: '/disease-detection' },
  { label: 'View Crop Report', icon: 'BarChart3', href: '/crop-report' },
  { label: 'Irrigation Control', icon: 'Droplets', href: '/irrigation' },
  { label: 'Ask AI Assistant', icon: 'MessageSquare', href: '/assistant' },
];

export const cropStatusSummary = [
  { crop: 'Paddy', health: 87, stage: 'Tillering', trend: 'up', area: 18.2 },
  { crop: 'Ragi', health: 92, stage: 'Vegetative', trend: 'up', area: 12.8 },
  { crop: 'Tomato', health: 71, stage: 'Flowering', trend: 'down', area: 8.5 },
  { crop: 'Groundnut', health: 95, stage: 'Seedling', trend: 'stable', area: 9.0 },
];
