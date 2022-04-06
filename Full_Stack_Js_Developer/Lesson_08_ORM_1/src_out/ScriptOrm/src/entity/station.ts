import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Metric } from "./metric";

@Entity('stations')
export class Station extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 255 })
    address: string;

    @Column('boolean')
    status: boolean;

    @OneToMany(() => Metric, metric => metric.station, {
        onDelete: 'CASCADE'
    })
    metrics: Metric[];

}
