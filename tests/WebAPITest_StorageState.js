import { test, expect, request } from '@playwright/test';


test.beforeAll(async ({browser})=>{
    const context= await browser.newContext();
    const UserEmail = "testuser001@mail.com";
    const page= await context.newPage();
    const signIn = page.locator("#login")
    const userName = page.locator("#userEmail")
    const password = page.locator("#userPassword")

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userName.fill(UserEmail)
    await password.fill("Learn@123");
    context.storageState({path: 'state.json'});


})


test('Login to shopping Simple application', async ( {}) => {

    const signIn = page.locator("#login")
    const titleCards = page.locator(".card-body b")
  
    const productList = page.locator(".card-body")
    const ProductName = "ADIDAS ORIGINAL"
    const coupon = page.locator(".small input").last()

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userName.fill(UserEmail)
    await password.fill("Learn@123");

    await signIn.click();
    await titleCards.first().waitFor();
    await page.waitForLoadState('networkidle');

    console.log(await titleCards.allTextContents());
})