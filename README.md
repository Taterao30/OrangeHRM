# OrangeHRM Playwright UI Automation

Simple Playwright + TypeScript POM project with 10 OrangeHRM UI test cases for GitHub Actions and Jenkins practice.

## Application
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## Demo credentials
- Username: Admin
- Password: admin123

## Setup
```bash
npm install
npx playwright install chromium
```

## Run all tests
```bash
npx playwright test
```

## Run by tag
```bash
npm run test:smoke
npm run test:sanity
npm run test:regression
```

## Open HTML report
```bash
npm run report
```

## Test tags
- @smoke
- @sanity
- @regression

No API tests are included.
