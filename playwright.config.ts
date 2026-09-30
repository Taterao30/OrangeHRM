import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const ENV = (process.env.ENV || 'qa').trim();

const envFile = path.resolve(
  process.cwd(),
  `config/.env.${ENV}`
);

const result = dotenv.config({
  path: envFile,
  override: true
});

console.log('Environment:', ENV);
console.log('Env File:', envFile);
console.log('Loaded values:', result.parsed);
console.log('Base URL:', process.env.ORANGE_BASE_URL);

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 1 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  use: {
    baseURL: process.env.ORANGE_BASE_URL,

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