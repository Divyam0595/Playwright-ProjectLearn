// @ts-nocheck
import { test, expect, request } from '@playwright/test';
const { APiUtils } = require('../utils/APiUtils')


const loginPayload = { userEmail: "testuser001@mail.com", userPassword: "Learn@123" }
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "68a961719320a140fe1ca57c" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;


test.beforeAll(async () => {

    //Login Request
    const requestQuery = await request.newContext();
    const apiUtils = new APiUtils(requestQuery, loginPayload);
    response = await apiUtils.createOrder(orderPayLoad)

})

test('API and Browser Automation', async ({ page }) => {


    console.log("Token = ", response.loginToken);
    page.ge

    await page.addInitScript((token) => {
        window.localStorage.setItem('token', token);
    }, response.loginToken);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("button[routerlink*='/myorders']").click();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        async route => {
            route.continue({
                url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'
            })
        }
    )
    await page.locator("button:has-text('View')").first().click()
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});
