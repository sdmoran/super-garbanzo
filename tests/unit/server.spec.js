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