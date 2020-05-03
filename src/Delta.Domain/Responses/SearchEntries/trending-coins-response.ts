export class TrendingCoinsResponse {
    constructor(trendingSearches: TrendingSearchEntries[]) { };
}

export class TrendingSearchEntries {
    constructor(
        public coinId: number,
        public searchDate: Date,
        public numberOfSearches: number
    ) { }
}
