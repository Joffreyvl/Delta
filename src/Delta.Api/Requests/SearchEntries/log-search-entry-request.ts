import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class LogSearchEntryRequest {
  @IsNotEmpty()
  coinId: number;
  
  @IsNotEmpty()
  searchDate: Date = new Date();
}
