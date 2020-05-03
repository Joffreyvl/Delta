import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTrendingCoinsQuery } from 'src/Delta.Domain/Queries/SearchEntries/get-trending-coins-query';
import { TrendingCoinsResponse, TrendingCoin } from 'src/Delta.Domain/Responses/SearchEntries/trending-coins-response';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchEntry } from 'src/Delta.Domain/Models/search-entry';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@QueryHandler(GetTrendingCoinsQuery)
export class GetTrendingCoinsQueryHandler implements IQueryHandler<GetTrendingCoinsQuery, TrendingCoinsResponse>{

    constructor(
        @InjectRepository(SearchEntry)
        private repo: Repository<SearchEntry>
    ) { }

    async execute(query: GetTrendingCoinsQuery): Promise<TrendingCoinsResponse> {

        let trendingCoins = await this.repo
            .createQueryBuilder("searchEntrie")
            .select("DISTINCT searchEntrie.coinId, COUNT(searchEntrie.coinId) As numberOfSearches")
            .andWhere("searchEntrie.searchDate >= :yesterday", { yesterday: moment().subtract(1,"days").format()})
            .limit(query.range)
            .orderBy("searchEntrie.searchDate", "DESC")
            .getRawMany<TrendingCoin>();

        return new TrendingCoinsResponse(trendingCoins);

    }
}
