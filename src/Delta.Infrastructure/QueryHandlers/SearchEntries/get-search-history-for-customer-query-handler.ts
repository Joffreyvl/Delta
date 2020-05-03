import { GetSearchHistoryForCustomerQuery } from "src/Delta.Domain/Queries/SearchEntries/get-search-history-for-customer-query";
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchHistoryForCustomerResponse, SearchEntryDto } from "src/Delta.Domain/Responses/SearchEntries/search-history-for-customer-response";
import { InjectRepository } from "@nestjs/typeorm/dist";
import { SearchEntry } from "src/Delta.Domain/Models/search-entry";
import { Repository } from "typeorm";
import * as moment from 'moment';

@QueryHandler(GetSearchHistoryForCustomerQuery)
export class GetSearchHistoryForCustomerQueryHandler implements IQueryHandler<GetSearchHistoryForCustomerQuery, SearchHistoryForCustomerResponse> {

    constructor(
        @InjectRepository(SearchEntry)
        private repo: Repository<SearchEntry>
    ) { }

    async execute(query: GetSearchHistoryForCustomerQuery): Promise<SearchHistoryForCustomerResponse> {

        let searchHistory = await this.repo
            .createQueryBuilder("searchEntrie")
            .select("coinId")
            .where("searchEntrie.customerId = :customerId", { customerId: query.customerId })
            .andWhere("searchEntrie.searchDate >= :yesterday", { yesterday: moment().subtract(1,"days").format() })
            .limit(query.range)
            .orderBy("searchEntrie.searchDate", "DESC")
            .getRawMany<SearchEntryDto>();

        return new SearchHistoryForCustomerResponse(searchHistory);
    }
}
