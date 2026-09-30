import { Locator, Page } from '@playwright/test';

export class LoginPage {

  readonly page: Page;

  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly orangeHRMLogo: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly requiredMessage: Locator;

  constructor(page: Page) {

    this.page = page;

    // Stable locators - not dependent on English/Spanish text
    this.username = page.locator('input[name="username"]');

    this.password = page.locator('input[name="password"]');

    this.loginButton = page.locator('button[type="submit"]');

    this.orangeHRMLogo = page.locator('.orangehrm-login-branding img');

    // Messages can vary by language, so use broader locators
    this.invalidCredentialsMessage =
      page.locator('.oxd-alert-content-text');

    this.requiredMessage =
      page.locator('.oxd-input-field-error-message');
  }

  async goToLoginPage(): Promise<void> {

    await this.page.goto('/web/index.php/auth/login');
  }

  async doLogin(
    username: string,
    password: string
  ): Promise<void> {

    await this.username.fill(username);

    await this.password.fill(password);

    await this.loginButton.click();
  }
}