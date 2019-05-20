const express = require('express')
const bodyParser = require('body-parser');
const helmet = require('helmet')

const usersRouter = require('./routes/users-v1')
const authRouter = require('./routes/auth-v1')

const usersModel = require('./model/users')
const authModel = require('./model/idp')

const app = express()

app.use(bodyParser.json())

// Activation de Helmet
app.use(helmet({noSniff: true}))

app.use((req, res, next) => { 
  if(!req.url.includes('/v1/auth/login') && !req.method == 'POST') {
    let token = null
    try {
      token = req.headers.authorization.split(' ')[1]
      authModel.verifyAuth(token).then(() => {
        next()
      }).catch(() => {
        res
        .status(401)
        .json({
          code: 0,
          type: "ACCESS_DENIED",
          message: "No valid JWT token given"
        })
      })
    }
    catch(err) {
      res
      .status(401)
      .json({
        code: 0,
        type: "ACCESS_DENIED",
        message: "No JWT token given"
      })
    }
  } else next()
})

// On injecte le model dans le router. Ceci permet de supprimer la dépendance
// directe entre le router et le modele
app.use('/v1/users', usersRouter(usersModel))

app.use('/v1/auth', authRouter(authModel))

// For unit tests
exports.app = app