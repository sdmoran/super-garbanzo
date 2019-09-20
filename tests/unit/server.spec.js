// This file is for testing server responses.

var server = require('../../server/server');

describe('server', function () {
  before(function () {
    server.listen(process.env.PORT);
  });

  after(function() {
    server.close();
  });
});

import { expect } from 'chai'
const API = require('../../server/api')

const url = 'http://localhost:8000/'

// Tests response of GET request
describe('serverGet', () => {
    it('responds with hello world when get request is made', (done) => {
        API.get(url).then((res) => {
            expect(res.data).to.include('Hello World!');
        }).then(done, done);
    })
  })

// Test getting players from API
describe('test API getPlayers', () => {
    it('responds with the current list of players on the server', (done) => {
        API.getPlayers().then((res) => {
            expect(res.data).to.be.an('array');
        }).then(done, done);
    })
})

// Test valid addition of a player to database through API
describe('test valid add player', () => {
    it('should add the given player to the array of players in playerstore', (done) => {
        API.addPlayer("Jemberson").then((res) => {
            expect(res.data).to.include('Added player!');
        }).then(done, done);
    })
})

// Test invalid addition of a player to database through API
describe('test invalid add player', () => {
    it('should reject adding the player', (done) => {
        const name = "Jigjaloo";
        API.addPlayer(name)
        .then(
            API.addPlayer(name)
            .catch((err) => {
                expect(err).to.be.an('error');
            }).then(done, done, done)
        );
    })
})