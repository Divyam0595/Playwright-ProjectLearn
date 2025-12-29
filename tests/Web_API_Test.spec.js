// @ts-nocheck
import { test, expect, request } from '@playwright/test';
const {APiUtils} = require('../utils/APiUtils')


const loginPayload = { userEmail: "testuser001@mail.com", userPassword: "Learn@123" }
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "68a961719320a140fe1ca57c" }] }

let response;


test.beforeAll(async () => {

  //Login Request
  const requestQuery = await request.newContext();
  const apiUtils = new APiUtils(requestQuery, loginPayload);
  response = await apiUtils.createOrder(orderPayLoad)
  
})





test('API and Browser Automation', async ({ page }) => {


  console.log("Token = ", response.loginToken);


  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, response.loginToken);

  await page.goto("https://rahulshettyacademy.com/client");

  console.log("orderID: ", response.orderId)

  await page.locator("button[routerlink*='/myorders']").click();
  await page.locator("tbody").waitFor();
  const row = await page.locator("tbody tr")

  for (let i = 0; i < await row.count(); i++) {
    const rowOrderID = await row.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderID)) {
      await row.nth(i).locator("button").first().click();
      break;
    }

  }

  const orderDetailsID = await page.locator(".col-text").textContent();

  expect(response.orderId.includes(orderDetailsID)).toBeTruthy();



});
