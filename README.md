# Performance Tests with k6

![k6 Performance Tests](https://github.com/Shahzaib-A-Khan/performance-tests-k6/actions/workflows/k6.yml/badge.svg)

k6 performance tests for Grafana's public QuickPizza demo app, run locally and in GitHub Actions with pass/fail thresholds.

## Tests
- `smoke-test.js`: 5 users for 30 seconds against the home page
- `load-test.js`: ramps to 10 users, holds, then ramps down (run locally only)
- `api-test.js`: 5 users against the home page and `/api/quotes`, with a separate threshold for each route

## Thresholds
- Fewer than 1% of requests may fail
- 95% of requests must finish in under 500 ms, per route
- At least 99% of checks must pass

## Results
| Where it ran | Test | p(95) home | p(95) quotes | Failed requests |
| --- | --- | --- | --- | --- |
| My computer (mobile hotspot) | api-test.js | ? ms | ? ms | ?% |
| GitHub Actions | api-test.js | ? ms | ? ms | ?% |

## Proving the gate works
Running `api-test.js` against a deliberately slow endpoint (`k6 run -e QUOTES_PATH=/api/delay/1 api-test.js`) crosses the 500 ms threshold, and k6 exits with a failure code, which is what would block a slow release in CI.

## Notes
- QuickPizza is a shared public demo, so load is kept small (5 to 10 users).
- Results from my computer depend on my network. CI numbers come from GitHub's servers and are more stable.
- The workflow runs on pushes, on pull requests, and nightly at 06:00 UTC.

## Run it
k6 run smoke-test.js
k6 run api-test.js