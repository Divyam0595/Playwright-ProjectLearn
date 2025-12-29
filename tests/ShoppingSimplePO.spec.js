const { test } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager')
const dataset =JSON.parse(JSON.stringify(require('../utils/testdata.json')))


test.only('Verify Order Submission in Shopping Simple Applicaiont - E2E Flow', async ({ page }) => {

    const poManager = new POManager(page)
    
    //LoginPage
    const loginPage = poManager.getLoginPage()
    await loginPage.launchApplication()
    await loginPage.signIn(dataset.UserEmail, dataset.password)

    //Dashboard Page
    const dashboardPage = poManager.getDashboardPage()
    await dashboardPage.searchProductAddtoCart(dataset.ProductName)
    await dashboardPage.navigateToCart()

    //Proceed Checkout
    await dashboardPage.proceedCheckout(dataset.ProductName)

    //Payment Details Page
    const paymentPage = poManager.getPaymentDetailsPage()
    await paymentPage.enterCouponDetails("rahulshettyacademy")
    await paymentPage.enterCardDetails("667", "Thara")
    await paymentPage.verifyUsername(dataset.UserEmail)
    await paymentPage.enterCoutry("ind", ' India')

    //Order Sumbmission
    const orderId = await paymentPage.verifyOrderSubmission(" Thankyou for the order. ")
    await paymentPage.navigateToOrderListPage()

    //Order List Page
    const orderListPage = poManager.getOrderListPage()
    await orderListPage.VerifyOrderID(orderId)

});
