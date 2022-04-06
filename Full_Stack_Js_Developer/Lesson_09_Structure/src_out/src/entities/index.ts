import { Station } from './station';
import { Metric } from './metric';
import { Connection, getConnectionManager } from 'typeorm';
import { db } from 'config.json';

const connection: Connection = getConnectionManager().create({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'newradalarm',
    password: '1111',
    database: 'newradalarm',
    logging: true,
    synchronize: true,
    entities: [ Station, Metric ]
});

export {
    Station,
    Metric,
    connection
}