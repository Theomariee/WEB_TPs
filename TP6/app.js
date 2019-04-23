const express = require('express')
const bodyParser = require('body-parser');
const helmet = require('helmet')

// const usersRouter = require('./routes/users-v1')

// const authModel = require('./model/idp')

const app = express()

app.use(bodyParser.json())

// Activation de Helmet
app.use(helmet({noSniff: true}))

// app.use('/v1/users', usersRouter(usersModel))

// For unit tests
exports.app = app