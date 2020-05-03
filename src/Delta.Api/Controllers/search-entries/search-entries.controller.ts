import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetSearchHistoryForCustomerQuery } from 'src/Delta.Domain/Queries/SearchEntries/get-search-history-for-customer-query';
import { GetTrendingCoinsQuery } from 'src/Delta.Domain/Queries/SearchEntries/get-trending-coins-query';
import { LogSearchEntryRequest } from 'src/Delta.Api/Requests/SearchEntries/log-search-entry-request';
import { SearchEntrieMapper } from 'src/Delta.Api/Mappers/SearchEntries/search-entrie-mapper';
import { TrendingCoinsResponse } from 'src/Delta.Domain/Responses/SearchEntries/trending-coins-response';
import { SearchHistoryForCustomerResponse } from 'src/Delta.Domain/Responses/SearchEntries/search-history-for-customer-response';
import { SearchEntry } from 'src/Delta.Domain/Models/search-entry';

@Controller('search-entries')
export class SearchEntriesController {

    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus,
        private mapper: SearchEntrieMapper
    ) { }

    @Get("trending")
    async getTopNTrendingCoins(): Promise<TrendingCoinsResponse> {
        let query = new GetTrendingCoinsQuery(100)

        return await this.queryBus.execute(query);
    }

    @Get(":id")
    async getTopNLastSearchedCoinsForCustomer(@Param("id") id: number): Promise<SearchHistoryForCustomerResponse> {
        let query = new GetSearchHistoryForCustomerQuery(id, 100)

        return await this.queryBus.execute(query);
    }

    @Post(":id")
    async upsertLogEntry(@Param("id") id, @Body() request: LogSearchEntryRequest): Promise<SearchEntry> {
        let cmd = this.mapper.requestToCommand(request);
        cmd.customerId = id;

        return await this.commandBus.execute(cmd);
    }
}
