import * as express from 'express';
import { Request, Response } from 'express';
import { readFile, writeFile } from 'promise-fs';
import * as bp from 'body-parser';

const app = express();

function validate(req: Request, res: Response, next: any) {
    const station = req.body;
    if (station.hasOwnProperty('id') && station.hasOwnProperty('address') && station.hasOwnProperty('status')) {
        next();
    } else {
        res.sendStatus(400);
    }
}

app.use(bp.json());

app.get('/stations', (req: Request, res: Response) => {
    readFile('./database.json').then(data => {
        res.send(JSON.parse(data.toString()));
    }).catch(err => console.error(err));
});

app.get('/stations/:id', (req: Request, res: Response) => {
    readFile('./database.json').then(data => {
        for (const station of JSON.parse(data.toString())) {
            if (station.id == req.params.id) {
                res.send(station);
                return;
            }
        }
        res.sendStatus(404);
    }).catch(err => console.error(err));
});

app.post('/stations', validate, (req: Request, res: Response) => {
    const station = req.body;
    readFile('./database.json').then(data => {
        let stations = JSON.parse(data.toString());
        for (const station of stations) {
            if (station.id == req.body.id) {
                res.sendStatus(409);
                return;
            }
        }
        stations.push(station);
        return writeFile('./database.json', JSON.stringify(stations)).then(() => {
            res.send(station);
        });
    }).catch(err => console.error(err));
});

app.delete('/stations/:id', (req: Request, res: Response) => {
    readFile('./database.json').then(data => {
        let stations = JSON.parse(data.toString());
        for (let index = 0; index < stations.length; index++) {
            if (stations[index].id == req.params.id) {
                stations.splice(index, 1);
                return writeFile('./database.json', JSON.stringify(stations)).then(() => {
                    res.sendStatus(204);
                });
            }
        }
        res.sendStatus(404);
    }).catch(err => console.error(err));
});

app.listen(8082, () => {
    console.log('Server is listening at 8082');
});
