import { LogSearchEntryCommand } from "src/Delta.Domain/Commands/SearchEntries/log-search-entry-command";
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { SearchEntry } from "src/Delta.Domain/Models/search-entry";

@CommandHandler(LogSearchEntryCommand)
export class LogSearchEntryCommandHandler implements ICommandHandler<LogSearchEntryCommand>{

    async execute(command: LogSearchEntryCommand): Promise<SearchEntry> {
        let searchEntry = new SearchEntry(command.coinId, command.customerId, command.searchDate);

        //update in db

        return await searchEntry;
    }
}
