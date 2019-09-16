const express = require('express');
const app = express();
const port = 3000;
const PlayerStore = require('./PlayerStore');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

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
    console.log('Server listening on port %s', port)
});