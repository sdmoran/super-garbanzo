// This file is for testing server responses.

import { expect } from 'chai'
const axios = require('axios')

const url = 'http://localhost:3000/'

// Tests response of GET request
describe('serverGet', () => {
    it('responds with hello world when get request is made', (done) => {
        axios.get(url).then((res) => {
            expect(res.data).to.include('Hello World!');
        }).then(done, done);
    })
  })

// Test valid addition of a player to database
describe('test valid add player', () => {
    it('should add the given player to the array of players in playerstore', (done) => {
        console.log(url + 'players/');
        axios.post(url + 'players/', {'name': 'Joffremere'}).then((res) => {
            expect(res.data).to.include('Added player!');
        }).then(done, done);
    })
})

// Test invalid addition of a player to database
describe('test invalid add player', () => {
    it('should reject adding the player', (done) => {
        const player = {'name':'Jimbo'};
        axios.post(url + 'players/', player)
        .then(
            axios.post(url + 'players/', player)
            .catch((err) => {
                expect(err).to.be.an('error');
            }).then(done, done, done)
        );
    })
})