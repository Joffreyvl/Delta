import { AggregateEntity } from "src/Shared/Entity"
import { Entity, Column } from "typeorm"

@Entity()
export class SearchEntry extends AggregateEntity {
    constructor(
        customerId: number,
        coinId: number,
        searchDate: Date,
    ){
        super()
        this.customerId = customerId;
        this.coinId = coinId;
        this.searchDate = searchDate;
    };

    @Column()
    customerId: number;

    @Column()
    coinId:Number;

    @Column()
    searchDate : Date;
}
