import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Station } from './station';

@Entity("metrics")
export class Metric extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('double')
    value: number;

    @Column('timestamp', {default: () => 'CURRENT_TIMESTAMP'})
    time: Date;

    @ManyToOne(() => Station, station => station.metrics, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'station_id' })
    station: Station;

}