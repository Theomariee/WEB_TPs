const chai = require ('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')

chai.should()
chai.use(chaiHttp)

var rightToken = "right-token"
var expiredToken = "expired-token"
var wrongToken = "wrong-token"

describe('Alerts tests', () => {
  describe('Tests with invalid token', () => {
    describe('POST /alerts requests', () => {})
    describe('GET /alerts/search requests', () => {})
    describe('GET /alerts/{alertId} requests', () => {})
    describe('PUT /alerts/{alertId} requests', () => {})
    describe('DELETE /alerts/{alertId} requests', () => {})
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
    it('should have an UNAUTHORIZED message on GET /v1/alerts/search with an invalid token', done => {
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
  })

  // Valid token tests below

  describe('Tests with valid token', () => {
    describe('POST /alerts requests', () => {
      it('should create a new Alert', done => {
        const myAlert = {
          type: "sea",
          label: "My own Alert",
          status: "warning",
          from: Date.now(),
          to: Date.now() 
        };
        chai
          .request(app)
          .post('/v1/alerts')
          .set('Authorization', 'Bearer ' + rightToken)
          .send(myAlert)
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
            res.body.message.should.equal('Successful operation')
            done()
          })
      })
    })
    describe('GET /alerts/search requests', () => {
      it('should get an array of Alerts with a list of status', done => {
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
      it('should get an error with an incorrect status', done => {
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
    describe('GET /alerts/{alertId} requests', () => {
      it('should return the corresponding alert to the ID', done =>{
        chai.request(app)
          .get('/v1/alerts/d57433bd-3a27-45a0-bf9f-720b8cf3f855')
          .set('Authorization', 'Bearer' + rightToken)
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
      it('should return an error 404 if the ID doesn\'t exist', done =>{
        chai.request(app)
          .get('/v1/alerts/d57433bd-3a27-45a0-bf9f-720b8cf3f845')
          .set('Authorization', 'Bearer' + rightToken)
          .end((err, res) => {
            res.should.have.status(404)
            res.should.be.json
            res.body.should.be.a('object')
            res.body.should.have.property('code')
            res.body.should.have.property('type')
            res.body.should.have.property('message')
            res.body.message.should.equal('Alert not found')
            done()
          })
      })
      it('should return an error 400 if there is no ID given', done =>{
        chai.request(app)
          .get('/v1/alerts/')
          .set('Authorization', 'Bearer' + rightToken)
          .end((err, res) => {
            res.should.have.status(400)
            res.should.be.json
            res.body.should.be.a('object')
            res.body.should.have.property('code')
            res.body.should.have.property('type')
            res.body.should.have.property('message')
            res.body.message.should.equal('Invalid ID supplied')
            done()
          })
      })
    })
    describe('PUT /alerts/{alertId} requests', () => {

    })
    describe('DELETE /alerts/{alertId} requests', () => {})

    
  })
})