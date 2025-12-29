const { expect } = require('@playwright/test');
class OrderListPage {
    constructor(page) {
        this.page = page
        this.orderRow = this.page.locator("tbody tr")
        this.orderDetailsID = this.page.locator(".col-text")

    }

    async VerifyOrderID(orderID) {

        for (let i = 0; i < await this.orderRow.count(); i++) {
            const rowOrderID = await this.orderRow.nth(i).locator("th").textContent();
            if (orderID.includes(rowOrderID)) {
                await this.orderRow.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderListID = await this.orderDetailsID.first().textContent();
        expect(orderID.includes(orderListID)).toBeTruthy();
    }



}
module.exports = { OrderListPage }