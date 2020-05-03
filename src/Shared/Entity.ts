import { PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";

export abstract class AggregateEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createDateTime: Date;
}