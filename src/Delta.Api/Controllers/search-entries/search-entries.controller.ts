import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetSearchHistoryForCustomerQuery } from 'src/Delta.Domain/Queries/SearchEntries/get-search-history-for-customer-query';
import { GetTrendingCoinsQuery } from 'src/Delta.Domain/Queries/SearchEntries/get-trending-coins-query';
import { LogSearchEntryRequest } from 'src/Delta.Api/Requests/SearchEntries/log-search-entry-request';
import { LogSearchEntryCommand } from 'src/Delta.Domain/Commands/SearchEntries/log-search-entry-command';
import{} from '@'

@Controller('search-entries')
export class SearchEntriesController {

    constructor(
        private queryBus: QueryBus,
         private commandBus: CommandBus
         ){}

    @Get(":id")
    getTopNLastSearchedCoinsForCustomer(@Param() params, range: number){
        return this.queryBus.execute(new GetSearchHistoryForCustomerQuery(params.id, range));
    }

    @Get()
    getTopNTrendingCoins(range: number){
        return this.queryBus.execute(new GetTrendingCoinsQuery(range));
    }

    @Post(":id")
    upsertLogEntry(@Param() params, @Body() body : LogSearchEntryRequest){
        return this.commandBus.execute(new LogSearchEntryCommand());
    }
}
