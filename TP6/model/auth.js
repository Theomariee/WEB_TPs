const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const SECRET = 'secret'

const checkToken = (req, res, next) => {
  if(req.url === "/v1/auth/login") {
    next()
  } 
  else {
    let token = req.headers['authorization'];

    if(token === undefined){
      return res.status(401).json({
          code : 0,
          type : "AUTH_ERROR", 
          message : "Auth token is not supplied"
      })
    }

    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    } 
    else {
      return res.status(401).json({
        code : 0,
        type : "AUTH_ERROR", 
        message : "Auth token is not supplied"
      })
    }

    if (token) {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            code : 0,
            type : "AUTH_ERROR", 
            message : "Auth token is not valid"
          })
        } 
        else {
          req.decoded = decoded;
          next()
        }
      })
    } 
    else {
      return res.status(401).json({
        code : 0,
        type : "AUTH_ERROR",
        message : "Auth token is not supplied"
      })
    }
  }
}

exports.checkToken = checkToken