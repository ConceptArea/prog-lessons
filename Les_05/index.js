express = require('express');
fs = require('fs');

const app = express()

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/stations', (req, res) => {
    fs.readFile('./database.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Oh shit!');
        } else {
            res.send(JSON.parse(data));
        }
    });
    console.log('Hello, stations!');
    
});

app.listen(8082, () => {
    console.log('Server is listening at 8082');
});
