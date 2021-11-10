import { Request, Response } from 'express';
import {
    findStations,
    findOneStation, createStation, updateStation, deleteStation
} from './services/stations';
import {validate} from "./validators";


function routes(app) {
    app.get('/stations', (req: Request, res: Response) =>
        findStations(res));
    app.get('/stations/:id', (req: Request, res: Response) =>
        findOneStation(parseInt(req.params.id), res));
    app.post('/stations', validate, (req: Request, res: Response) =>
        createStation(req.body, res));
    app.put('/stations/:id', validate, (req: Request, res: Response) =>
        updateStation(parseInt(req.params.id), req.body, res));
    app.delete('/stations/:id', (req: Request, res: Response) =>
        deleteStation(parseInt(req.params.id), res));
}

export {
    routes
}
