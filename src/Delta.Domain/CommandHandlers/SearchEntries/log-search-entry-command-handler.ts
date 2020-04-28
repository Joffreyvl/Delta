import { LogSearchEntryCommand } from "src/Delta.Domain/Commands/SearchEntries/log-search-entry-command";
import { ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(LogSearchEntryCommand)
export class LogSearchEntryCommandHandler implements ICommandHandler<LogSearchEntryCommand, >{
    execute(command: LogSearchEntryCommand): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
