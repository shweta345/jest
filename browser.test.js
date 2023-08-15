const puppeteer = require('puppeteer');

// Test number 1: Log in to a site
describe('Puppeteer Test: bstackdemo.com/signin', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('should open bstackdemo.com/signin and verify login button', async () => {
    const signInPageUrl = 'https://bstackdemo.com/signin';

    await page.goto(signInPageUrl);

    // Wait for the login button to appear in the page
    const loginButton = await page.waitForSelector('#login-btn', { timeout: 5000 });

    // Take a screenshot
    await page.screenshot({ path: `./site.jpg` });

    // Expect the login button to exist
    expect(loginButton).toBeTruthy();
  });

  afterAll(async () => {
    await browser.close();
  });
});

// Test number 2: Sign in and sign out
describe('Puppeteer Test: bstackdemo.com/signin and sign out', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });


  it('should open bstackdemo.com/signin, sign in, and verify logout selector', async () => {
    const signInPageUrl = 'https://the-internet.herokuapp.com/login';

    await page.goto(signInPageUrl);

    // Fill in the username and password fields
    await page.type('#username', 'tomsmith');
    await page.type('#password', 'SuperSecretPassword!');

    // Click the login button
    await page.click('#login > button > i');

    // Wait for the logout selector to appear or the timeout to be reached
    const timeout = 10000; // 10 seconds
    const logoutSelector = await page.waitForSelector('#content > div > a > i', { timeout }).catch(() => null);

    // Take a screenshot
    await page.screenshot({ path: `./login.jpg` });

    // Expect the logout selector to exist
    expect(logoutSelector).toBeTruthy();
  }, 15000); // Set a higher timeout for the test
});

