// server.js or app.js
import * as express from 'express';
import { Request, Response } from 'express';
import * as bp from 'body-parser';
import * as mysql from 'mysql';


const app = express();

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "newradalarm",
    password: "1111",
    database: "newradalarm"
});

connection.connect(function (error) {
    if (error) {
        console.error(error);
    } else {
        console.log('Successfully connected to DB');
    }
});

function validate(req: Request, res: Response, next) {
    const station = req.body;
    if (station.hasOwnProperty('address') && station.hasOwnProperty('status')) {
        next();
    } else {
        res.sendStatus(400);
    }
}

app.use(bp.json());

app.get('/station', (req: Request, res: Response) => {
    connection.query('SELECT * FROM station', (err, data) =>{
        if (err) {
            console.error(err);
        }
        res.send(data);
    });
});


app.get('/station/:id', (req: Request, res: Response) => {
    connection.query('SELECT * FROM station WHERE id = ?', [req.params.id], (err, data) =>{
        if (err) {
            console.error(err);
        }
        res.send(data);
    });
});

app.post('/station', validate, (req: Request, res: Response) => {
    connection.query('INSERT INTO station (address, status) values (?, ?)',
        [req.body.address, req.body.status], (err, data) => {
            if (err) {
                console.error(err);
            }
            connection.query('SELECT * FROM station WHERE id = ?',
                [data.insertId], (err, data) => {
                    if (err) {
                        console.error(err);
                    }
                    res.send(data);
                });
        });
});

app.put('/station/:id', validate, (req: Request, res: Response) => {
    const station = req.body;
    connection.query('UPDATE station SET address = ?, status = ? WHERE id = ?',
        [station.address, station.status, req.params.id], (err, data) => {
            if (err) {
                console.error(err);
            }
            if (data.affectedRows > 0) {
                connection.query('SELECT * FROM station WHERE id = ?',
                    [req.params.id], (err, data) => {
                        res.send(data);
                    });
            } else {
                res.sendStatus(404);
            }
        });
});

app.delete('/station/:id', (req: Request, res: Response) => {
    connection.query('DELETE FROM station WHERE id = ?', [req.params.id], (err, data) =>{
        if (err) {
            console.error(err);
        } else {
            const stationIsDeleted = data.affectedRows > 0;
            if (stationIsDeleted) {
                connection.query('DELETE FROM `metric`  WHERE station_id = ?' [req.params.id],
                    (err, data) => {
                        if (err) {
                            console.error(err);
                        }
                        res.sendStatus(stationIsDeleted ? 204 : 404);
                    });
            } else {
                res.sendStatus(404);
            }
        }

    });
});

app.post('/station/:id/metric', (req: Request, res: Response) => {
    const metric = req.body;
    connection.query('INSERT INTO metric (value, station_id) values (?,?)',
        [metric.value, req.params.id], (err, data) => {
            if (err) {
                console.error(err);
            }
            res.sendStatus(200);
        });
});

app.get('/station/:id/metric', (req: Request, res: Response) => {
    connection.query('SELECT id, date, value FROM metric WHERE  ' +
    'station_id = ? ORDER BY date', [req.params.id],
        (err, data) => {
            if (err) {
                console.error(err);
            }
            res.send(data);
        });
});

app.get('/metric', (req: Request, res: Response) => {
    connection.query('SELECT metric.* FROM metric JOIN station ' +
        'ON metric.station_id = station.id WHERE status = 1 ORDER BY date',
        (err, data) => {
            if (err) {
                console.error(err);
            }
            res.send(data);
        });
});

app.listen(8082, () => {
    console.log('Server is listening at 8082');
});
