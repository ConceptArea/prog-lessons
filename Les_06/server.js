const express = require('express');
const fs = require('fs.promises');
const bp = require('body-parser');

const app = express();

app.use(bp.json());

app.get('/stations', (req, res) => {
    fs.readFile('./database.json').then(data => {
        res.send(JSON.parse(data));
    }).catch(err => console.error(err));
});

app.get('/stations/:id', (req, res) => {
    fs.readFile('./database.json').then(data => {
        for (const station of JSON.parse(data)) {
            if (station.id == req.params.id) {
                res.send(station);
                return;
            }
        }
        res.sendStatus(404);
    }).catch(err => console.error(err));
});

app.post('/stations', (req, res) => {
    const station = req.body;
    fs.readFile('./database.json').then(data => {
        let stations = JSON.parse(data);
        for (const station of stations) {
            if (station.id == req.body.id) {
                res.sendStatus(409);
                return;
            }
        }
        stations.push(station);
        return fs.writeFile('./database.json', JSON.stringify(stations)).then(() => {
            res.send(station);
        });
    }).catch(err => console.error(err));
});

app.delete('/stations/:id', (req, res) => {
    fs.readFile('./database.json').then(data => {
        let stations = JSON.parse(data);
        for (let index = 0; index < stations.length; index++) {
            if (stations[index].id == req.params.id) {
                stations.splice(index, 1);
                return fs.writeFile('./database.json', JSON.stringify(stations)).then(() => {
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
