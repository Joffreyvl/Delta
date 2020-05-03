import { LogSearchEntryRequest } from "src/Delta.Api/Requests/SearchEntries/log-search-entry-request";
import { Injectable } from "@nestjs/common";
import { LogSearchEntryCommand } from "src/Delta.Domain/Commands/SearchEntries/log-search-entry-command";

@Injectable()
export class SearchEntrieMapper {
    public requestToCommand(request: LogSearchEntryRequest) : LogSearchEntryCommand{
        let cmd = new LogSearchEntryCommand();
        cmd.coinId = request.coinId;
        cmd.searchDate = request.searchDate;

        return cmd;
    }
}
