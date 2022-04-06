import { Station } from './station';
import { Metric } from './metric';
import { Connection, getConnectionManager } from 'typeorm';
import { db } from '../config.json';

const connection: Connection = getConnectionManager().create({
    type: 'mysql',
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.password,
    database: db.database,
    logging: true,
    synchronize: true,
    entities: [ Station, Metric ]
});

export {
    Station,
    Metric,
    connection
}