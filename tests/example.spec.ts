import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('has title', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Tootltip handle', async ({ browser }) =>{

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.browserstack.com/guide/handling-dropdown-in-selenium-without-select-class');
  await page.waitForTimeout(500);
  
  const usingAltText = await page.locator('div.container>div>div>div>a').allInnerTexts();
  console.log("Using InnerText: " + usingAltText);

  const usingGetAttribute = await page.locator('header>div.container>div>div>div>a').getAttribute('title');//getAttribute('title');
  console.log("Using GetAttribute: " + usingGetAttribute);

  const usingGetAttributeImg = await page.locator('header>div.container>div>div>div>a>img').getAttribute('alt');//getAttribute('alt');
  console.log("Using GetAttribute IMG Tag: " + usingGetAttributeImg);

  const innerText = await page.locator('div.page-header-2>h1').innerText();
  console.log("InnerText: " + innerText.trim());

  const textContent = await page.textContent('div.page-header-2>h1');
  console.log("TextContent: " + textContent);

  //div.page-header-2>h1

  page.close();

});