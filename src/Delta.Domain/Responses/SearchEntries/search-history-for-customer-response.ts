export class SearchHistoryForCustomerResponse {
    constructor(searches: SearchEntryDto[]) { };
}

export class SearchEntryDto {
    constructor(
        public coinId: number,
        public searchDate: Date,
    ) { }
}
