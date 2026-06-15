// Realistic weather data for agricultural region (Bangalore/Karnataka context)

export const currentWeather = {
  location: 'Green Valley Farm, Karnataka',
  temperature: 28,
  feelsLike: 31,
  humidity: 72,
  windSpeed: 12,
  windDirection: 'SW',
  pressure: 1012,
  uvIndex: 7,
  visibility: 8.5,
  dewPoint: 22,
  cloudCover: 45,
  condition: 'Partly Cloudy',
  sunrise: '06:02',
  sunset: '18:42',
  lastUpdated: '14:30 IST',
};

export const hourlyForecast = [
  { time: '15:00', temp: 29, humidity: 70, precipitation: 0, condition: 'Partly Cloudy', wind: 14 },
  { time: '16:00', temp: 28, humidity: 73, precipitation: 0, condition: 'Partly Cloudy', wind: 12 },
  { time: '17:00', temp: 27, humidity: 76, precipitation: 10, condition: 'Light Rain', wind: 10 },
  { time: '18:00', temp: 25, humidity: 80, precipitation: 30, condition: 'Rain', wind: 8 },
  { time: '19:00', temp: 24, humidity: 83, precipitation: 20, condition: 'Light Rain', wind: 6 },
  { time: '20:00', temp: 23, humidity: 85, precipitation: 5, condition: 'Cloudy', wind: 5 },
  { time: '21:00', temp: 22, humidity: 87, precipitation: 0, condition: 'Cloudy', wind: 4 },
  { time: '22:00', temp: 21, humidity: 88, precipitation: 0, condition: 'Clear', wind: 3 },
];

export const weeklyForecast = [
  { day: 'Mon', date: 'Jun 2', high: 29, low: 21, condition: 'Partly Cloudy', precipitation: 20, humidity: 72, wind: 12, icon: 'CloudSun' },
  { day: 'Tue', date: 'Jun 3', high: 30, low: 22, condition: 'Sunny', precipitation: 5, humidity: 65, wind: 10, icon: 'Sun' },
  { day: 'Wed', date: 'Jun 4', high: 31, low: 22, condition: 'Sunny', precipitation: 0, humidity: 60, wind: 8, icon: 'Sun' },
  { day: 'Thu', date: 'Jun 5', high: 28, low: 21, condition: 'Thunderstorm', precipitation: 75, humidity: 82, wind: 18, icon: 'CloudLightning' },
  { day: 'Fri', date: 'Jun 6', high: 26, low: 20, condition: 'Rain', precipitation: 85, humidity: 88, wind: 15, icon: 'CloudRain' },
  { day: 'Sat', date: 'Jun 7', high: 27, low: 20, condition: 'Cloudy', precipitation: 40, humidity: 78, wind: 11, icon: 'Cloud' },
  { day: 'Sun', date: 'Jun 8', high: 29, low: 21, condition: 'Partly Cloudy', precipitation: 15, humidity: 70, wind: 9, icon: 'CloudSun' },
];

export const monthlyRainfallData = [
  { month: 'Jan', rainfall: 2, avgTemp: 22, year2025: 3, year2026: 2 },
  { month: 'Feb', rainfall: 5, avgTemp: 24, year2025: 8, year2026: 5 },
  { month: 'Mar', rainfall: 12, avgTemp: 27, year2025: 15, year2026: 12 },
  { month: 'Apr', rainfall: 45, avgTemp: 30, year2025: 52, year2026: 45 },
  { month: 'May', rainfall: 118, avgTemp: 28, year2025: 105, year2026: 118 },
  { month: 'Jun', rainfall: 85, avgTemp: 26, year2025: 130, year2026: 85 },
  { month: 'Jul', rainfall: 110, avgTemp: 24, year2025: 145, year2026: null },
  { month: 'Aug', rainfall: 135, avgTemp: 24, year2025: 160, year2026: null },
  { month: 'Sep', rainfall: 195, avgTemp: 25, year2025: 210, year2026: null },
  { month: 'Oct', rainfall: 165, avgTemp: 25, year2025: 180, year2026: null },
  { month: 'Nov', rainfall: 55, avgTemp: 23, year2025: 65, year2026: null },
  { month: 'Dec', rainfall: 10, avgTemp: 21, year2025: 12, year2026: null },
];

export const temperatureTrend = [
  { date: 'May 27', high: 31, low: 22, avg: 26 },
  { date: 'May 28', high: 30, low: 21, avg: 25 },
  { date: 'May 29', high: 29, low: 21, avg: 25 },
  { date: 'May 30', high: 32, low: 23, avg: 27 },
  { date: 'May 31', high: 30, low: 22, avg: 26 },
  { date: 'Jun 1', high: 28, low: 21, avg: 24 },
  { date: 'Jun 2', high: 29, low: 21, avg: 25 },
];

export const agricultureWeatherInsights = [
  {
    type: 'irrigation',
    severity: 'info',
    title: 'Irrigation Advisory',
    message: 'Skip irrigation for the next 48 hours. Rainfall of 25-40mm expected Thursday–Friday. Resume drip irrigation on Saturday at 60% capacity.',
    timeframe: 'Next 48 hours',
  },
  {
    type: 'disease',
    severity: 'warning',
    title: 'Fungal Disease Risk — High',
    message: 'High humidity (>80%) and warm temperatures create favorable conditions for Late Blight in tomato and Blast in rice. Apply preventive fungicide spray before Thursday rain.',
    timeframe: 'Thu–Sat',
  },
  {
    type: 'harvest',
    severity: 'success',
    title: 'Harvest Window — Optimal',
    message: 'Dry conditions on Tuesday–Wednesday ideal for harvesting mature crops. Wind speeds favorable for winnowing operations.',
    timeframe: 'Tue–Wed',
  },
  {
    type: 'frost',
    severity: 'neutral',
    title: 'Frost Risk — None',
    message: 'Minimum temperatures well above frost threshold. No protective measures needed for the next 7 days.',
    timeframe: 'Next 7 days',
  },
];
