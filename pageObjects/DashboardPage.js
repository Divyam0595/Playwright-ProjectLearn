const { expect } = require('@playwright/test');
class DashboardPage {
    constructor(page) {
        this.page = page
        this.titleCards = this.page.locator(".card-body b")
        this.productList = this.page.locator(".card-body")
        this.cart = this.page.locator("[routerlink*='/cart']")
        this.checkOutBtn = this.page.locator("text=Checkout")
        this.checkOutReviewList = this.page.locator("div li")
    }

    async searchProductAddtoCart(ProductName) {
        await this.titleCards.first().waitFor();
        const titles = await this.titleCards.allTextContents();
        console.log(titles);

        const ProductCount = await this.titleCards.count();
        for (let i = 0; i < ProductCount; i++) {
            if (await this.productList.nth(i).locator("b").textContent() === ProductName) {
                await this.productList.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }
    async navigateToCart() {
        await this.cart.click();

    }
    async proceedCheckout(ProductName){
        await this.checkOutReviewList.first().waitFor();
        expect(await this.page.locator(`h3:has-text("${ProductName}")`).isVisible()).toBeTruthy();
        await this.checkOutBtn.click();
    }
   
}
module.exports = { DashboardPage }


