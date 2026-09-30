import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = baseTest.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  }
});

export { expect };
