import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SearchEntriesController } from './Delta.Api/Controllers/search-entries/search-entries.controller';
import { LogSearchEntryCommandHandler } from './Delta.Domain/CommandHandlers/SearchEntries/log-search-entry-command-handler';
import { GetSearchHistoryForCustomerQueryHandler } from './Delta.Infrastructure/QueryHandlers/SearchEntries/get-search-history-for-customer-query-handler';
import { GetTrendingCoinsQueryHandler } from './Delta.Infrastructure/QueryHandlers/SearchEntries/get-trending-coins-query-handler';
import { SearchEntrieMapper } from './Delta.Api/Mappers/SearchEntries/search-entrie-mapper';
import { SearchEntry } from './Delta.Domain/Models/search-entry';
import { SearchEntryModule } from './Shared/Modules/search-entry-module/search-entry.module';
import { SearchEntryRepository } from './Shared/SearchEntryRepository';

export const CommandHandlers = [LogSearchEntryCommandHandler];
export const QueryHandlers = [GetSearchHistoryForCustomerQueryHandler, GetTrendingCoinsQueryHandler];
export const Mappers = [SearchEntrieMapper];

export const Modules = [CqrsModule, SearchEntryModule]

export const TypeOrmSettings: TypeOrmModuleOptions = {
  "type": "mysql",
  "host": "127.0.0.1",
  "port": 3306,
  "username": "root",
  "password": "test123",
  "database": "delta",
  "logging": true,
  "entities": [SearchEntry],
  "synchronize": true
}

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmSettings), ...Modules],
  controllers: [SearchEntriesController],
  providers:
    [
      ...CommandHandlers,
      ...QueryHandlers,
      ...Mappers, SearchEntryRepository
    ],
})
export class AppModule { }