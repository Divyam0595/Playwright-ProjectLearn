const {LoginPage}=require('./LoginPage')
const {DashboardPage}=require('./DashboardPage')
const {PaymentDetailsPage}=require('./PaymentDetailsPage')
const {OrderListPage}= require('./OrderListPage')

class POManager{
    constructor(page){
        this.page =page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage= new DashboardPage(this.page)
        this.paymentPage= new PaymentDetailsPage(this.page)
        this.orderListPage= new OrderListPage(this.page)
    }
    getLoginPage(){
        return this.loginPage
    }
    getDashboardPage(){
        return this.dashboardPage
    }
    getPaymentDetailsPage(){
        return this.paymentPage
    }
    getOrderListPage(){
        return this.orderListPage
    }
}

module.exports ={POManager}