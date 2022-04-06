import * as express from 'express';
import { Request, Response, Express } from 'express';
import { connection } from './entities';
import { routes } from './routes';
import * as bp from 'body-parser';


const cors = require('cors')


const app: Express = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(bp.json());

routes(app);

connection.connect().then(() => {
    app.listen(8087, () => {
        console.log('Server is listening at 8087');
    });
}).catch(err => {
    console.error(err);
});