import { SearchEntry } from "src/Delta.Domain/Models/search-entry";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchEntryRepository  extends Repository<SearchEntry>{}