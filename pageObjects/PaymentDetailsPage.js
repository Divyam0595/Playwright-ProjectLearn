const { expect } = require('@playwright/test');

class PaymentDetailsPage {
    constructor(page) {
        this.page = page
        this.coupon = this.page.locator(".small input").last()
        this.cardDetails = this.page.locator(".small input").first()
        this.cardName = this.page.locator('.field').filter({ hasText: 'Name on Card' })
        this.couponSuccessMsg = this.page.locator("p[class*='mt-1']")
        this.userNamePaymentPage = this.page.locator(".user__name [type='text']")
        this.submitBtn = this.page.locator("[type=submit]")
        this.country = this.page.locator("[placeholder*='Country']")
        this.dropdown = this.page.locator(".ta-results");
        this.submission = this.page.locator(".action__submit")
        this.orderSuccessMsg = this.page.locator(".hero-primary")
        this.orderId = this.page.locator(".em-spacer-1 .ng-star-inserted")
        this.myOders = this.page.locator("button[routerlink*='/myorders']")
        this.orderList = this.page.locator("tbody")
    }

    async enterCardDetails(cardNumber, cardName,) {
        await this.cardDetails.fill(cardNumber);
        await this.cardName.locator('input').fill(cardName);
    }
    async enterCouponDetails(coupon) {
        await this.coupon.fill(coupon);
        await this.submitBtn.click();
        await expect(this.couponSuccessMsg).toHaveText("* Coupon Applied");
    }
    async verifyUsername(UserEmail) {
        await expect(this.userNamePaymentPage.first()).toHaveText(UserEmail);
    }
    async enterCoutry(input, selection) {
        await this.country.pressSequentially(input, 150);
        await this.dropdown.waitFor();
        const drpdownCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < drpdownCount; i++) {
            const country = await this.dropdown.locator("button").nth(i).textContent();
            console.log(country)
            if (country === selection) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
        await this.submission.click();
    }

    async verifyOrderSubmission(SuccessMsg) {
        await expect(this.orderSuccessMsg).toHaveText(SuccessMsg);
        const orderId = await this.orderId.textContent();
        return orderId
    }

    async navigateToOrderListPage() {
        await this.myOders.click();
        await this.orderList.waitFor();
    }
}
module.exports = { PaymentDetailsPage }