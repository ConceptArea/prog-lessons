import "reflect-metadata";
import {Connection, getConnectionManager} from "typeorm";
import {Station} from "./entity/station";
import {Metric} from "./entity/metric";

const connection: Connection = getConnectionManager().create({
    type: 'mysql',
    host: '127.0.0.1',
    username: 'newradalarm',
    password: '1111',
    database: 'newradalarm',
    logging: true,
    synchronize: true,
    entities: [Station, Metric]
});

export {
    Station,
    Metric,
    connection
}
