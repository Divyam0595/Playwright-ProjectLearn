const { test, expect } = require('@playwright/test');


test.only('Login to shopping Simple application', async ({ page }) => {
    const signIn = page.locator("#login")
    const userName = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const titleCards = page.locator(".card-body b")
    const UserEmail = "testuser001@mail.com";
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

    const ProductCount = await titleCards.count();

    for (let i = 0; i < ProductCount; i++) {
        if (await productList.nth(i).locator("b").textContent() === ProductName) {
            await productList.nth(i).locator("text= Add To Cart").click();
        }
    }

    await page.locator("[routerlink*='/cart']").click();
    await page.locator("div li").first().waitFor();
    expect(await page.locator(`h3:has-text("${ProductName}")`).isVisible()).toBeTruthy();

    await page.locator("text=Checkout").click();

    

    await page.locator(".small input").first().fill("667");
    await coupon.fill("rahulshettyacademy");
    await page.locator('.field').filter({ hasText: 'Name on Card' }).locator('input').fill("Thara");
    await page.locator("[type=submit]").click();
    await expect(page.locator("p[class*='mt-1']")).toHaveText("* Coupon Applied");
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(UserEmail);

    await page.locator("[placeholder*='Country']").pressSequentially("ind", 150);
    const dropdown= page.locator(".ta-results");
    await dropdown.waitFor();
    const drpdownCount = await dropdown.locator("button").count();

    for (let i = 0; i < drpdownCount; i++) {
        const country =await dropdown.locator("button").nth(i).textContent();
        console.log(country)
        if ( country === ' India') {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderId)

    await page.locator("button[routerlink*='/myorders']").click();
    await page.locator("tbody").waitFor();
    const row = await page.locator("tbody tr")


   



    for (let i = 0; i < await row.count(); i++) {
        const rowOrderID = await row.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderID)) {
            await row.nth(i).locator("button").first().click();
            break;
        }

    }

    const orderDetailsID = await page.locator(".col-text").textContent();

    expect(orderId.includes(orderDetailsID)).toBeTruthy();

    await page.pause();

});
