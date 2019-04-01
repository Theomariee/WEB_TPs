const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const {app} = require('../app')
const usersModel = require('../model/users')


const expect = chai.expect
const assert = chai.assert
const should = chai.should()


describe('Users tests', () => {
    beforeEach((done) => {
        usersModel.reset()
        done()
    })

    // GET /v1/users
    it('should list ALL users on /v1/users GET', (done) => {
        chai.request(app)
            .get('/v1/users')
            .end((err, res) => {
                expect(err).to.be.null
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
              done()
            })
    })

    // GET /v1/users/:id
    it('should get a SINGLE user by the given id on /v1/users/:id GET', (done) => {
        chai.request(app)
            .get('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
            .end((err, res) => {
                expect(err).to.be.null
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('id').eql('45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
                done()
            })
    })

    // POST /v1/users
    it('should add a SINGLE user on /v1/users POST', (done) => {

        // New user to insert
        const user = {
            name: 'Sanchez El Pueblo',
            login: 'sanchezpueb',
            age: 43
        }

        chai.request(app)
            .post('/v1/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('name')
                res.body.should.have.property('login')
                res.body.should.have.property('age')
                usersModel.getAll().length.should.be.eql(2)
              done()
            })
    })

    // PATCH /v1/users/id
    it('should update a SINGLE user on /v1/users/<id> PATCH', (done) => {
        chai.request(app)
            .patch('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
            .send({name: "Pedro Blanco", login: "pedro", age: 43})
            .end((err, res) => {
                const updatedUser = usersModel.get('45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')

                res.should.have.status(200)
                updatedUser.should.have.property('name').eql('Pedro Blanco')
                updatedUser.should.have.property('login').eql('pedro')
                updatedUser.should.have.property('age').eql(43)
                usersModel.getAll().length.should.be.eql(1)
              done()
            })
    })

    // DELETE /v1/users/id
    it('should delete a SINGLE user on /v1/users/<id> DELETE', (done) => {
        chai.request(app)
            .delete('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
            .end((err, res) => {
                res.should.have.status(200)
                usersModel.getAll().length.should.be.eql(0)
              done()
            })
    })
})