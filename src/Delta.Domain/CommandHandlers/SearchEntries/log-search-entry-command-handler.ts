import { CommandHandler } from "@nestjs/cqrs/dist/decorators/command-handler.decorator";
import { LogSearchEntryCommand } from "src/Delta.Domain/Commands/SearchEntries/log-search-entry-command";
import { ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { SearchEntry } from "src/Delta.Domain/Models/search-entry";
import { Repository } from "typeorm";


@CommandHandler(LogSearchEntryCommand)
export class LogSearchEntryCommandHandler implements ICommandHandler<LogSearchEntryCommand>{

    constructor(
        @InjectRepository(SearchEntry)
        private searchEntryRepo: Repository<SearchEntry>
    ) { }

    async execute(command: LogSearchEntryCommand): Promise<SearchEntry> {

        let searchEntry = await this.searchEntryRepo.findOne({ where: { customerId: command.customerId, coinId: command.coinId } });

        if (searchEntry == undefined) {
            searchEntry = new SearchEntry(command.coinId, command.customerId, command.searchDate);
        }

        if(searchEntry.searchDate < command.searchDate){
            searchEntry.searchDate = command.searchDate;
        }

        return this.searchEntryRepo.save(searchEntry);
    }
}
