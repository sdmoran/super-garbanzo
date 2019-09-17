// If we're in test mode, don't start the server - it will be started when the server test files run.
if(process.env.NODE_ENV !== "test") {
    const server = require('./server/server')
}