const express = require('express');
const app = express();
const port = 3000;
const PlayerStore = require('./PlayerStore');


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/players/', (req, res) => {
    res.send(PlayerStore.getPlayers());
})

app.listen(port, () => {
    console.log('Server listening on port %s', port)
});