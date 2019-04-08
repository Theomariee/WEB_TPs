const jwt = require('jsonwebtoken')
const userModel = require('./users')

const SECRET = 'secret'

const auth = (login, password) => {
  const userList = userModel.getAll
  const usersFound = users.filter((user) => user.login === login)
  let resultTemplate = 
  {
    isAuthorized: undefined,
    successObject:
    {
      "access_token": undefined,
      "expirity": undefined
    },
    failureObject:
    {
      "code": undefined,
      "type": undefined,
      "message": undefined
    }
  }

  if(usersFound[0]) {
    const hash = usersFound[0].password
    const isAuthorized = undefined
    
    bcrypt.compare(password, hash).then(function(res) {
      isAuthorized = res
    })

    if(isAuthorized) {
      resultTemplate.isAuthorized = true
      const token = 
      jwt.sign(
        {
          data: usersFound[0].login
        }, 
        SECRET, 
        { 
          expiresIn: '1h'
        }
        ) // End of jwt.sign
        
      resultTemplate.successObject.access_token = token 
      resultTemplate.successObject.expirity = jwt.decode(token).exp
    }
    else {
      resultTemplate.isAuthorized = false
      resultTemplate.failureObject.code = 0
      resultTemplate.failureObject.type = "Log ins"
      resultTemplate.failureObject.message = "Bad login."
    }
  }

  return resultTemplate
}

const verifyAuth = (token) => {
  let resultTemplate = 
  {
    isValid: undefined,
    successObject:
    {
      "message": undefined
    },
    failureObject:
    {
      "code": undefined,
      "type": undefined,
      "message": undefined
    }
  }

  try {
    jwt.verify(token, SECRET)
    resultTemplate.isValid = true
    resultTemplate.message = "Access is verified."
  } catch(err) {
    resultTemplate.isValid = false
    resultTemplate.failureObject.code = 0
    resultTemplate.failureObject.type = "Verify Access"
    resultTemplate.failureObject.message = "Bad token."
  }

  return resultTemplate
}

exports.auth = auth
exports.verifyAuth = verifyAuth