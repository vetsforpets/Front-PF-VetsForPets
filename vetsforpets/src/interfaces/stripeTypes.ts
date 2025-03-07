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
export interface IDTOStripeMetricsTransactionResponse {
    data:[{
            id: string,
            amount: string,
            net: string
        }
    ]
}

export interface IStripeMetricsUserActiveResponse {
    name: string,
    lastName: string,
    email: string,
    dateOrder: Date ,
}
export interface IDTOStripeMetricsUserActiveResponse {
    name: string,
    lastName: string,
    email: string,
}