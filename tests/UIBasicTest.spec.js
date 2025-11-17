const { test, expect } = require('@playwright/test');
const { setTimeout } = require('timers');



test('First Test', async ({ browser }) => {
    //for injecting new instance with cookies and plugingsx
    const driver = await browser.newContext();
    const page = await driver.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");


});

test('Sucess Login to Rahul Shetty Academy', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("input#username").fill("rahulshettyacademy");
    await page.locator("input#password").fill("learning");
    await page.locator("input#terms").check();
    await page.locator("#signInBtn").click();

    await expect(page).toHaveTitle("ProtoCommerce");

});

test('Invalid Username to valid user name Rahul Shetty Academy', async ({ page }) => {
    let signIn = page.locator("#signInBtn")
    const userName = page.locator("input#username")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshetty");
    await page.locator("input#password").fill("learning");
    await page.locator("input#terms").check();

    signIn.click();
    let errorMsg = await page.locator("[style*=block]").textContent();

    expect(errorMsg).toEqual("Incorrect username/password.");
    await userName.clear();
    await userName.fill("rahulshettyacademy")
    await signIn.click();

    console.log(await page.locator(".card-body").nth(0).textContent());

});

test('Verify titles Rahul Shetty Academy', async ({ page }) => {
    const signIn = page.locator("#signInBtn")
    const userName = page.locator("input#username")
    const titleCards = page.locator(".card-body")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy")
    await page.locator("input#password").fill("learning");


    await signIn.click();

    await page.waitForSelector('.card-body');

    console.log(await titleCards.allTextContents());
});

test('Verify UI controls Rahul Shetty Academy', async ({ page }) => {
    const signIn = page.locator("#signInBtn")
    const userName = page.locator("input#username")
    const dropdown = page.locator("select.form-control")
    const radioBtn = page.locator(".radiotextsty").last()
    const docLink = page.locator("[href*='documents']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await dropdown.selectOption('consult');
    //await radioBtn.click();
    await radioBtn.check();
    await expect(radioBtn).toBeChecked();


    await page.locator("#okayBtn").click();

    await expect(docLink).toHaveAttribute('class', 'blinkingText');

    await page.pause();



});

test('Verify Window Handles Rahul Shetty Academy', async ({ browser }) => {

    const driver = await browser.newContext();
    const page = await driver.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const docLink = page.locator("[href*='documents']");

    const [childPage] = await Promise.all([
        driver.waitForEvent('page'),
        docLink.click(),

    ]);

    const arrayName= ((await childPage.locator(".red").textContent()).split("@"))[1].split(" ")[0];
    const userName = page.locator("input#username")
    await userName.fill(arrayName);
    await page.pause()
    console.log(await userName.inputValue());





});

