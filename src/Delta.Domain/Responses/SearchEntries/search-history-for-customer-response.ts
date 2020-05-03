export class SearchHistoryForCustomerResponse {

    constructor(public searches: Array<SearchEntryDto>) { }
}

export class SearchEntryDto {
    public coinId: number;
    public searchDate: Date;
}
