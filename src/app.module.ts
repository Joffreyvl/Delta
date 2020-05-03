import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SearchEntriesController } from './Delta.Api/Controllers/search-entries/search-entries.controller';
import { LogSearchEntryCommandHandler } from './Delta.Domain/CommandHandlers/SearchEntries/log-search-entry-command-handler';
import { GetSearchHistoryForCustomerQueryHandler } from './Delta.Infrastructure/QueryHandlers/SearchEntries/get-search-history-for-customer-query-handler';
import { GetTrendingCoinsQueryHandler } from './Delta.Infrastructure/QueryHandlers/SearchEntries/get-trending-coins-query-handler';

export const CommandHandlers = [LogSearchEntryCommandHandler];
export const QueryHandlers = [GetSearchHistoryForCustomerQueryHandler, GetTrendingCoinsQueryHandler];

@Module({
  imports: [CqrsModule],
  controllers: [SearchEntriesController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class AppModule {}
