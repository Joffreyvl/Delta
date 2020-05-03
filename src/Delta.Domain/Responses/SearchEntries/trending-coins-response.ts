export class TrendingCoinsResponse {
    constructor(trendingSearches: Array<TrendingCoin>) { };
}

export class TrendingCoin {
    public coinId: number;
    public numberOfSearches: number;
}
