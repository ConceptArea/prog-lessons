import * as express from 'express';
import * as bp from 'body-parser';
import { Request, Response, Express } from 'express';
import { connection } from './entities';
import { routes } from './routes';
import { app as cfg } from './config.json';

const app: Express = express();

app.use(bp.json());

routes(app);

connection.connect().then(() => {
    app.listen(cfg.port, () => {
        console.log('Server is listening at ' + cfg.port);
    });
}).catch(err => {
    console.error(err);
});

