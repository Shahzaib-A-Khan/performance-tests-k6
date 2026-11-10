import http from 'k6/http';
import { check, group, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';
const QUOTES_PATH = __ENV.QUOTES_PATH || '/api/quotes';

export const options = {
  stages: [
    { duration: '15s', target: 5 },
    { duration: '30s', target: 5 },
    { duration: '15s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{name:GET_home}': ['p(95)<500'],
    'http_req_duration{name:GET_quotes}': ['p(95)<500'],
    checks: ['rate>0.99'],
  },
};

export default function () {
  group('home', () => {
    const res = http.get(`${BASE_URL}/`, { tags: { name: 'GET_home' } });
    check(res, { 'home status is 200': (r) => r.status === 200 });
  });

  group('quotes api', () => {
    const res = http.get(`${BASE_URL}${QUOTES_PATH}`, { tags: { name: 'GET_quotes' } });
    check(res, {
      'quotes status is 200': (r) => r.status === 200,
      'quotes returns a body': (r) => r.body && r.body.length > 0,
    });
  });

  sleep(1);
}