// server.js or app.js
import * as express from 'express';
import { Request, Response } from 'express';
import * as bp from 'body-parser';
import * as mysql from 'mysql';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    OneToMany,
    JoinColumn,
    ConnectionManager,
    Connection,
    getConnectionManager,
    getRepository
} from 'typeorm';

@Entity("stations")
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

@Entity("metrics")
export class Metric extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('double')
    value: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    time: Date;

    @ManyToOne(() => Station, station => station.metrics, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'station_id' })
    station: Station;

}

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

const app = express();

function validate(req: Request, res: Response, next) {
    const station = req.body;
    if (station.hasOwnProperty('address') && station.hasOwnProperty('status')) {
        next();
    } else {
        res.sendStatus(400);
    }
}

function errHandler(res) {
    return function(err) {
        console.error(err);
        res.sendStatus(404);
    }
}

app.use(bp.json());


app.get('/stations', (req: Request, res: Response) => {
    Station.find().then(stations => {
        res.send(stations);
    }).catch(errHandler(res));
});


app.get('/stations/:id', (req: Request, res: Response) => {
    Station.findOne(req.params.id).then(station => {
        if (station != null)
            res.send(station);
        else
            res.sendStatus(404);
    }).catch(errHandler(res));
});

app.post('/stations', validate, (req: Request, res: Response) => {
    const station = Station.create(req.body);
    Station.save(station).then(station => {
        res.send(station);
    }).catch(errHandler(res));
});

app.put('/stations/:id', validate, (req: Request, res: Response) => {
    Station.findOne(req.params.id).then(station => {
        if (station != null) {
            Station.merge(station, req.body)
            return station.save().then(station => {
                res.send(station);
            });
        }
        res.sendStatus(404);
    }).catch(errHandler(res));
});

app.delete('/stations/:id', (req: Request, res: Response) => {
    Station.findOne(req.params.id).then(station => {
        if (station != null)
            return station.remove().then(() => {
                res.sendStatus(204);
            });
        res.sendStatus(404);
    }).catch(errHandler(res));
});

app.post('/stations/:id/metrics', (req: Request, res: Response) => {
    Station.findOne(req.params.id).then(station => {
        if (station != null) {
            const metric = Metric.merge(new Metric(), req.body);
            metric.station = station;
            return metric.save().then(metric => {
                res.send(metric);
            });
        } else
            res.sendStatus(404);
    }).catch(errHandler(res));
});

app.get('/stations/:id/metrics', (req: Request, res: Response) => {
    Metric.find({ station: { id: parseInt(req.params.id) } }).then(metrics => {
        res.send(metrics);
    }).catch(errHandler(res));
});

app.get('/metrics', (req: Request, res: Response) => {
    getRepository(Metric)
        .createQueryBuilder('metric')
        .leftJoinAndSelect('metric.station', 'st')
        .where('st.status = true')
        .getMany().then(metric => {
        console.log(metric);
        res.send(metric);
    }).catch(errHandler(res));
});

app.get('/metrics/avg', (req: Request, res: Response) => {
    getRepository(Metric)
        .createQueryBuilder('metric')
        .select('avg(metric.value)')
        .leftJoinAndSelect('metric.station', 'station')
        .where('station.status = true')
        .groupBy('station.id')
        .getRawMany().then(metrics => {
        console.log(metrics);
        res.send(metrics);
    }).catch(errHandler(res));
});

connection.connect().then(() => {
    app.listen(8086, () => {
        console.log('Server is listening at 8082');
    });
}).catch(err => {
    console.error(err);
});;

