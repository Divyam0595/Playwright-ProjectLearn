class LoginPage {
    constructor(page) {
        this.page =page
        this.signInBtn = this.page.locator("#login")
        this.userName = this.page.locator("#userEmail")
        this.password = this.page.locator("#userPassword")
    }

    async signIn(UserEmail,password) {
        await this.userName.fill(UserEmail)
        await this.password.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
    async launchApplication(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
}
module.exports={LoginPage}

