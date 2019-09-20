const express = require('express');
const app = express();
// Run backend server on VUE_APP_PORT if specified, default 8000.
const port = process.env.VUE_APP_PORT || 8000;
const PlayerStore = require('./PlayerStore');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Any origin OK
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/players/', (req, res) => {
    res.send(PlayerStore.getPlayers());
})

app.post('/players/', (req, res) => {
    const name = req.body.name;
    if(PlayerStore.addPlayer(name)) {
        console.log(PlayerStore.getPlayers());
        res.send("Added player!");
    }
    else {
        res.status(409);
        res.send("Failed to add player!");
    }
})

app.listen(port, () => {
    console.log('NODE_ENV: ' + process.env.NODE_ENV)
    console.log('Server listening on port %s', port)
});

exports.app = app;