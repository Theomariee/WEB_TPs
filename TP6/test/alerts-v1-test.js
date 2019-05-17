const chai = require ('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')

chai.should()
chai.use(chaiHttp)

var rightToken = ""
var expiredToken = ""
var wrongToken = "wrong-token"

describe('Alerts tests', () => {
  it('should create a new Alert on POST /v1/alerts with a valid token', done => {
    chai
      .request(app)
      .post('/v1/alerts')
      .set('Authorization', 'Bearer ' + rightToken)
      .send({
        type: "sea",
        label: "My own Alert",
        status: "warning",
        from: Date.now(),
        to: Date.now() 
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('_id')
        res.body.should.have.property('type')
        res.body.should.have.property('label')
        res.body.should.have.property('status')
        res.body.should.have.property('from')
        res.body.should.have.property('to')
        done()
      })
  })

  it('should have an UNAUTHORIZED message on POST /v1/alerts with an invalid token', done => {
    chai
      .request(app)
      .post('/v1/alerts')
      .set('Authorization', 'Bearer ' + wrongToken)
      .send({
        type: "sea",
        label: "My own Alert",
        status: "warning",
        from: Date.now(),
        to: Date.now() 
      })
      .end((err, res) => {
        res.should.have.status(401)
        res.should.be.json
        done()
      })
  })

  it('should get an array of Alerts on GET /v1/alerts/search with a list of status', done => {
    chai
    .request(app)
    .get('/v1/alerts/search?status=sea')
    .set('Authorization', 'Bearer ' + rightToken)
    .end((err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('array')
      // TODO
      done()
    })
  })

  it('should get an error on GET /v1/alerts/search with an incorrect status', done => {
    chai
    .request(app)
    .get('/v1/alerts/search?status=warnings')
    .set('Authorization', 'Bearer ' + rightToken)
    .end((err, res) => {
      res.should.have.status(400)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('code')
      res.body.should.have.property('type')
      res.body.should.have.property('message')
      res.body.message.should.equal('Invalid tag value')
      done()
    })
  })
})