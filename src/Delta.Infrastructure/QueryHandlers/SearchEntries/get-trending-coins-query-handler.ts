import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTrendingCoinsQuery } from 'src/Delta.Domain/Queries/SearchEntries/get-trending-coins-query';
import { TrendingCoinsResponse } from 'src/Delta.Domain/Responses/SearchEntries/trending-coins-response';

QueryHandler(GetTrendingCoinsQuery)
export class GetTrendingCoinsQueryHandler implements IQueryHandler<GetTrendingCoinsQuery, TrendingCoinsResponse>{

    constructor() { }

    execute(query: GetTrendingCoinsQuery): Promise<TrendingCoinsResponse> {
        throw new Error("Method not implemented.");
    }
}
