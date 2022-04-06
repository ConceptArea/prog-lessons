// server.js or app.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
const fs = require('fs.promises');
import * as mysql from 'mysql';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const connection = mysql.createConnection({
    host: process.env.DBHOST || "127.0.0.1",
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

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/stations-hardcoded', (req, res) => {
    res.send(JSON.parse('[{"id":"0","address":"690 Collins Avenue. Worthington","status":"1"},{"id":"1","address":"2681 Doctors Drive. Santa Monica","status":"1"},{"id":"2","address":"2582 Kidd Avenue. Huslia","status":"1"},{"id":"3","address":"2199 Lake Road. Absecon","status":"0"},{"id":"4","address":"874 Philli Lane. Van Buren","status":"1"},{"id":"5","address":"2401 Ingram Street. Dayton","status":"0"},{"id":"6","address":"1481 Pinewood Avenue. Marquette","status":"1"},{"id":"7","address":"1218 Cabell Avenue. Reston","status":"1"},{"id":"8","address":"3971 Romano Street. Needham","status":"0"}]'));
});

app.get('/stations-from-file', (req, res) => {
    fs.readFile('./database.json').then(data => {
        res.send(JSON.parse(data));
    }).catch(err => console.error(err));
});

app.post('/stations', (req, res) =>{
    fs.readFile('./database.json').then(data => {
        const stationArray = JSON.parse(data)
        const newStation = req.body;
        stationArray.push(newStation);
        fs.writeFile('./database.json', JSON.stringify(stationArray)).then(() =>{
            res.sendStatus(200);
        })
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

app.listen(8083, () => {
    console.log('Server is listening at 8083');
});
