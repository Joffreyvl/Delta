export class GetSearchHistoryForCustomerQuery {
    constructor(
        public readonly customerId: number,
        public readonly range: number
    ) { }
}
