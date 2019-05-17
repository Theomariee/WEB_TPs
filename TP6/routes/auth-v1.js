const express = require('express')
const router = express.Router()

let authModel = undefined

router.use((req, res, next) => {
    if(!authModel) {
      res
        .status(500)
        .json({message: 'Model is not initialized'})
    }
    next()
})

router.post('/login', function (req, res, next) {
    login = req.body.login
    password = req.body.password

    if(login && password) {
      try {
        const jwt = authModel.login(login, password)
        if(jwt) {
            res
            .status(200)
            .json(jwt)
        }
        else {
          res.status(401).json({
            code : 0,
            type : "LOGIN_FAILED", 
            message : "Login failed, check credentials"
          })
        }
      } catch (exc) {
        res
          .status(400)
          .json({
            message: exc.message
          })
      }
    } else {
      res
        .status(400)
        .json({message: 'Wrong parameters'})
    }
})

router.get('/verifyaccess', function (req, res, next) {
  try {
    req
      .res
      .status(200)
      .send({
        message : "Authorized"
      })
  } catch (exc) {
    res
      .status(400)
      .json({
        message: exc.message
      })
  }
})

module.exports = (model) => {
  authModel = model
  return router
}