import * as express from 'express';
import { Request, Response } from 'express';
import * as bp from 'body-parser';
import * as mysql from 'mysql';

const app = express();

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "radalarm",
    password: "1111",
    database: "radalarm"
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

app.get('/stations', (req: Request, res: Response) => {
    connection.query('SELECT * FROM stations', (err, data) =>{
        if (err) {
            console.error(err);
        }
        res.send(data);
    });
});


app.get('/stations/:id', (req: Request, res: Response) => {
    connection.query('SELECT * FROM stations WHERE id = ?', [req.params.id], (err, data) =>{
        if (err) {
            console.error(err);
        }
        res.send(data);
    });
});

app.post('/stations', validate, (req: Request, res: Response) => {
    const station = req.body;
    connection.query('INSERT INTO stations (address, status) values (?, ?)',
        [station.address, station.status], (err, data) => {
            if (err) {
                console.error(err);
            }
            connection.query('SELECT * FROM stations WHERE id = ?',
                [data.insertId], (err, data) => {
                if (err) {
                    console.error(err);
                }
                res.send(data);
            });
        });
});

app.put('/stations/:id', validate, (req: Request, res: Response) => {
    const station = req.body;
    connection.query('UPDATE stations SET address = ?, status = ? WHERE id = ?',
        [station.address, station.status, req.params.id], (err, data) => {
            if (err) {
                console.error(err);
            }
            if (data.affectedRows > 0) {
                connection.query('SELECT * FROM stations WHERE id = ?',
                    [req.params.id], (err, data) => {
                        res.send(data);
                    });
            } else {
                res.sendStatus(404);
            }
        });
});

app.delete('/stations/:id', (req: Request, res: Response) => {
    connection.query('DELETE FROM stations WHERE id = ?', [req.params.id], (err, data) =>{
        if (err) {
            console.error(err);
        }
        res.sendStatus(data.affectedRows > 0 ? 204 : 404);
    });
});


app.listen(8082, () => {
    console.log('Server is listening at 8082');
});
