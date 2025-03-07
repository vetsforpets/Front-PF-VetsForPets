export interface IStripeMetricsFinancialResponse {
    objetc : string,
    available : [
        {
            amount : number,
            currency : string,
            source_types: {
                card: number
            }
        }
    ],
    connect_reserved : [
        {
            amount: number,
            currency: string
        }
    ],
    livemode: boolean ,
    pending : [
        {
            amount : number,
            currency : string,
            source_types: {
                card: number
            }
        }
    ] 
}

export interface IStripeMetricsTransactionResponse {
        id: string
        amount: string,
        net: string,
        currency: string,
}

export interface IStripeMetricsUserActiveResponse {
    name: string,
    email: string,
}