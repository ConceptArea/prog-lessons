import * as express from 'express';
import { Request, Response } from 'express';
import {
    getRepository
} from 'typeorm';
import * as bp from 'body-parser';
import { Station, Metric, connection } from './entities';
import { errHandler } from './plugins/err-handler';
import { validate } from './validators';
import { routes } from './routes';
import { app as cfg } from './config.json';

const app = express();

app.use(bp.json());

routes(app);

app.post('/stations/:id/metrics', (req: Request, res: Response) => {
    Station.findOne(req.params.id).then(station => {
        if (station != null) {
            const metric = new Metric();
            Metric.merge(metric, req.body);
            metric.station = station;
            return metric.save().then(metric => {
                res.send(metric);
            })
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
        .leftJoinAndSelect('metric.station', 'station')
        .where('station.status = true')
        .getMany().then(metrics => {
            res.send(metrics);
    }).catch(errHandler(res));
});

app.get('/metrics/avg', (req: Request, res: Response) => {
    getRepository(Metric)
        .createQueryBuilder('metric')
        .leftJoinAndSelect('metric.station', 'station')
        .where('station.status = true')
        .getMany().then(metrics => {
        res.send(metrics);
    }).catch(errHandler(res));
});


connection.connect().then(() => {
    app.listen(cfg.port, () => {
        console.log('Server is listening at 8082');
    });
}).catch(err => {
    console.error(err);
});

