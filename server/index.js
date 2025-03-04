const express = require('express')
const app = express()
require ('dotenv').config()
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const authCtrl = require('./controllers/authController')
const treasureCtr = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')
app.use(express.json())



//auth controllers

app.post('/auth/register', authCtrl.register)
app.post ('/auth/login',authCtrl.login)
app.get('/auth/logout',authCtrl.logout)

//treasure controllers 

app.get('/api/treasure/dragon', treasureCtr.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly ,treasureCtr.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtr.addUserTreasure)
app.get('/api/treasure/all',auth.usersOnly, auth.adminsOnly,  treasureCtr.getAllTreasures)



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
