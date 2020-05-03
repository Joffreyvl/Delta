import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetSearchHistoryForCustomerQuery } from 'src/Delta.Domain/Queries/SearchEntries/get-search-history-for-customer-query';
import { GetTrendingCoinsQuery } from 'src/Delta.Domain/Queries/SearchEntries/get-trending-coins-query';
import { LogSearchEntryRequest } from 'src/Delta.Api/Requests/SearchEntries/log-search-entry-request';
import { SearchEntrieMapper } from 'src/Delta.Api/Mappers/SearchEntries/search-entrie-mapper';
import { TrendingCoinsResponse } from 'src/Delta.Domain/Responses/SearchEntries/trending-coins-response';
import { SearchHistoryForCustomerResponse } from 'src/Delta.Domain/Responses/SearchEntries/search-history-for-customer-response';

@Controller('search-entries')
export class SearchEntriesController {

    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus,
        private mapper: SearchEntrieMapper,
    ) { }

    @Get(":id")
    getTopNLastSearchedCoinsForCustomer(@Param() params, range: number): SearchHistoryForCustomerResponse {
        let query = new GetSearchHistoryForCustomerQuery(params.id, range)

        return this.queryBus.execute(query);
    }

    @Get()
    getTopNTrendingCoins(range: number): TrendingCoinsResponse {
        let query = new GetTrendingCoinsQuery(range)

        return this.queryBus.execute(query);
    }

    @Post(":id")
    upsertLogEntry(@Param() params, @Body() request: LogSearchEntryRequest) {
        let cmd = this.mapper.requestToCommand(request);

        return this.commandBus.execute(cmd);
    }
}
