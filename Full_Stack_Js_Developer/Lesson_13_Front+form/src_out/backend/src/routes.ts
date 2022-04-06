import {
    createStation,
    deleteStation,
    findOneStation,
    findStations,
    updateStation
} from "./services/station";
import {validateMetric, validateStation} from "./validators";
import { Request, Response, Express } from 'express';
import {
    createMetric,
    findActiveMetrics,
    findLatestMetrics,
    findStationMetric,
    findAverageMetrics
} from "./services/metric";



export function routes(app: Express) {
    app.get('/stations', (req: Request, res: Response) =>
        findStations(res));
    app.get('/stations/:id', (req: Request, res: Response) =>
        findOneStation(parseInt(req.params.id), res));
    app.post('/stations', validateStation, (req: Request, res: Response) =>
          createStation(req.body, res));
    app.put('/stations/:id', validateStation, (req: Request, res: Response) =>
        updateStation(parseInt(req.params.id), req.body, res));
    app.delete('/stations/:id', (req: Request, res: Response) =>
        deleteStation(parseInt(req.params.id), res));
    app.post('/stations/:id/metrics', validateMetric, (req: Request, res: Response) =>
        createMetric(parseInt(req.params.id), req.body,  res));
    app.get('/stations/:id/metrics', (req: Request, res: Response) =>
        findStationMetric(parseInt(req.params.id), res));
    app.get('/metrics', (req: Request, res: Response) =>
        findActiveMetrics(res));
    app.get('/metrics/avg', (req: Request, res: Response) =>
        findAverageMetrics(res));
    app.get('/metrics/latest', (req: Request, res: Response) =>
        findLatestMetrics(res));
}
