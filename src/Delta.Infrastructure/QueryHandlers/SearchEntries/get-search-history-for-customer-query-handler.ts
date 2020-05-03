import { GetSearchHistoryForCustomerQuery } from "src/Delta.Domain/Queries/SearchEntries/get-search-history-for-customer-query";
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchHistoryForCustomerResponse, SearchEntryDto } from "src/Delta.Domain/Responses/SearchEntries/search-history-for-customer-response";

@QueryHandler(GetSearchHistoryForCustomerQuery)
export class GetSearchHistoryForCustomerQueryHandler implements IQueryHandler<GetSearchHistoryForCustomerQuery, SearchHistoryForCustomerResponse> {

    constructor(){}

    async execute(query: GetSearchHistoryForCustomerQuery): Promise<SearchHistoryForCustomerResponse> {
        return await new SearchHistoryForCustomerResponse([new SearchEntryDto(123456789 , new Date())]);
    }
}
