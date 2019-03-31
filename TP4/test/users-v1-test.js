const chai = require('chai')
const chaiHttp = require('chai-http')
const {app} = require('../app')
chai.use(chaiHttp)

describe('Users tests', () => {
  it('should list ALL users on /v1/users GET', (done) => {
    // TODO
  })
})