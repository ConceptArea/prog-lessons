import * as express from 'express';
import { Express } from 'express';
import { connection } from './entities';
import { routes } from './routes';
import * as bp from 'body-parser';
import { app as cfg } from 'config.json';
import {stationConsumer} from "./kafka/consumer";
import {stationProducer} from "./kafka/producer";

const cors = require('cors')

const app: Express = express();

app.use(bp.json());

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes(app);

connection.connect().then(() => {
    stationConsumer.start();
    stationProducer.start();
    app.listen(8085, () => {
        console.log('Server is listening at 8089');
    });
}).catch(err => {
    console.error(err);
});