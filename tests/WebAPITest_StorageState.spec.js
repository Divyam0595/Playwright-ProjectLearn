import { test, expect, request } from '@playwright/test';

let webContext
test.beforeAll(async ({browser})=>{
    const context= await browser.newContext();
    const UserEmail = "testuser001@mail.com";
    const page= await context.newPage();
    const signIn = page.locator("#login")
    const titleCards = page.locator(".card-body b")
    const userName = page.locator("#userEmail")
    const password = page.locator("#userPassword")

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userName.fill(UserEmail)
    await password.fill("Learn@123");
    await signIn.click();
    await titleCards.first().waitFor();
    await page.waitForLoadState('networkidle');
    context.storageState({path: 'state.json'});
    webContext= await browser.newContext({storageState:'state.json'})

})


test('Login to shopping Simple application', async ( ) => {
    const page= await webContext.newPage()

    
    const titleCards = page.locator(".card-body b")
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   
    await titleCards.first().waitFor();
    await page.waitForLoadState('networkidle');

    console.log(await titleCards.allTextContents());
})