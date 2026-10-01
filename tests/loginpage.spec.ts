import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
});

test('@smoke OrangeHRM login page should be displayed', async ({ page }) => {
  await expect(page).toHaveURL(/auth\/login/);
});

test('@smoke OrangeHRM logo should be displayed', async ({ loginPage }) => {
  await expect(loginPage.orangeHRMLogo).toBeVisible();
});

test('@sanity Username field should be displayed', async ({ loginPage }) => {
  await expect(loginPage.username).toBeVisible();
});

test('@sanity Password field should be displayed', async ({ loginPage }) => {
  await expect(loginPage.password).toBeVisible();
});

test('@smoke Login button should be enabled', async ({ loginPage }) => {
  await expect(loginPage.loginButton).toBeEnabled();
});

test(
  '@smoke @sanity @regression user should login successfully with valid credentials',
  async ({ loginPage, page }) => {

    await loginPage.doLogin(
      process.env.ORANGE_USERNAME!,
      process.env.ORANGE_PASSWORD!
    );

    await expect(page).toHaveURL(/dashboard\/index/, {
      timeout: 15000
    });
  }
);

test('@regression login should fail with invalid password', async ({ loginPage }) => {

  await loginPage.doLogin(
    process.env.ORANGE_USERNAME!,
    'wrong123'
  );

  await expect(loginPage.invalidCredentialsMessage).toBeVisible({
    timeout: 10000
  });
});

test('@regression login should fail with invalid username', async ({ loginPage }) => {

  await loginPage.doLogin(
    'WrongAdmin',
    process.env.ORANGE_PASSWORD!
  );

  await expect(loginPage.invalidCredentialsMessage).toBeVisible({
    timeout: 10000
  });
});

test('@regression Required message should display for blank username', async ({ loginPage }) => {

  await loginPage.doLogin(
    '',
    process.env.ORANGE_PASSWORD!
  );

  await expect(loginPage.requiredMessage.first()).toBeVisible({
    timeout: 10000
  });
});

test('@regression Required message should display for blank password', async ({ loginPage }) => {

  await loginPage.doLogin(
    process.env.ORANGE_USERNAME!,
    ''
  );

  await expect(loginPage.requiredMessage.first()).toBeVisible({
    timeout: 10000
  });
});