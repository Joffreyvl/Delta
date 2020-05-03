import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogSearchEntryCommandHandler } from 'src/Delta.Domain/CommandHandlers/SearchEntries/log-search-entry-command-handler';
import { GetSearchHistoryForCustomerQueryHandler } from 'src/Delta.Infrastructure/QueryHandlers/SearchEntries/get-search-history-for-customer-query-handler';
import { GetTrendingCoinsQueryHandler } from 'src/Delta.Infrastructure/QueryHandlers/SearchEntries/get-trending-coins-query-handler';
import { SearchEntry } from 'src/Delta.Domain/Models/search-entry';

export const SearchEntryCommandHandlers = [LogSearchEntryCommandHandler];
export const SearchEntryQueryHandlers = [GetSearchHistoryForCustomerQueryHandler, GetTrendingCoinsQueryHandler];

@Module({
    imports: [TypeOrmModule.forFeature([SearchEntry])],
    providers: [
        ...SearchEntryCommandHandlers,
        ...SearchEntryQueryHandlers
    ],
    exports: [SearchEntryModule],
})

export class SearchEntryModule { }
