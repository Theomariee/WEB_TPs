const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const {app} = require('../app')
const usersModel = require('../model/users')


const expect = chai.expect
const assert = chai.assert
const should = chai.should
const requester = chai.request(app).keepOpen()


describe('Users tests', () => {
  // GET /v1/users
  it('should list ALL users on /v1/users GET', (done) => {
    requester
      .get('/v1/users')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
      })
  })

  // POST /v1/users
  it('should add a SINGLE user on /v1/users POST'), (done) => {
    let user = {
        name: 'Sanchez El Pueblo',
        login: 'sanchezpueb',
        age: 43
    }

    requester
      .post('/v1/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        // TODO
      })
  }

  // PATCH /v1/users/id
  it('should update a SINGLE user on /v1/users/<id> PATCH'), (done) => {

  }

  // DELETE /v1/users/id
  it('should delete a SINGLE user on /v1/users/<id> DELETE'), (done) => {
    
  }
})