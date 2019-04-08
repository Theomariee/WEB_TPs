const jwt = require('jsonwebtoken')
const userModel = require('./users')

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
      resultTemplate.successObject.access_token = 
      jwt.sign(
        {
          data: usersFound[0].login
        }, 
          'secret', 
        { 
          expiresIn: '1h'
        }
      ) // End of jwt.sign
      
      
    }
  }
}