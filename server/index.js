const express = require('express')
const app = express()
require ('dotenv').config()
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then ( db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log( `Server AND DB on ${SERVER_PORT}` ))
    
} )

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)
