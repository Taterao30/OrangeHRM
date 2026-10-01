import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const ENV = (process.env.ENV || 'qa').toLowerCase();

// Load local .env files only when running locally
if (!process.env.CI) {
  dotenv.config({
    path: path.resolve(
      process.cwd(),
      `config/.env.${ENV}`
    ),
    override: true
  });
}

console.log(`Running tests on environment: ${ENV}`);
console.log(`Base URL: ${process.env.ORANGE_BASE_URL}`);

export default defineConfig({

  testDir: './tests',

  timeout: 60000,

  expect: {
    timeout: 10000
  },

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 1 : 0,

  workers: 1,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: false
      }
    ]
  ],

  use: {
    baseURL: process.env.ORANGE_BASE_URL,

    actionTimeout: 15000,

    navigationTimeout: 60000,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});