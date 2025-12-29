class APiUtils {
    constructor(requestQuery, loginPayload) {
        this.requestQuery = requestQuery;
        this.loginPayload = loginPayload;

    }
    async getToken() {
        const responseBody = await this.requestQuery.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        );
        const responseJson = await responseBody.json();
        const loginToken = responseJson.token;
        console.log(loginToken);
        return loginToken
    }

    async createOrder(orderPayLoad) {
        let response={};
        
        response.loginToken =  await this.getToken();
        const orderResponse = await this.requestQuery.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.loginToken,
                    'Content-Type': 'application/json'
                },
            })
        const orderResponseJson = await orderResponse.json();
        response.orderId = orderResponseJson.orders[0];
        console.log(response.orderId);
         return response
    }
}
module.exports={APiUtils};