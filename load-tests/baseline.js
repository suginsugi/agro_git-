import http from 'k6/http';
import { check, sleep } from 'k6';

// Baseline Load Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 20 },  // ramp up to 20 users
    { duration: '1m', target: 20 },   // stay at 20 for 1 minute
    { duration: '30s', target: 0 },   // ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // http errors should be less than 1%
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:8000';

export default function () {
  // Test root endpoint
  const res = http.get(`${BASE_URL}/`);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has message': (r) => r.body.includes('Welcome'),
  });

  // Short pause to simulate user think-time
  sleep(1);
}
