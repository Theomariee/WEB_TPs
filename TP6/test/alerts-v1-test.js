const chai = require ('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')

const Alert = require('../model/alerts')

chai.should()
chai.use(chaiHttp)

var rightToken = "right-token"
var expiredToken = rightToken + "expired"
var wrongToken = rightToken + "wrong"

describe('Alerts tests', () => {
  describe('Tests with invalid token', () => {
    describe('POST /alerts requests', () => {
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
    })
    describe('GET /alerts/search requests', () => {
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
    describe('GET /alerts/{alertId} requests', () => {})
    describe('PUT /alerts/{alertId} requests', () => {})
    describe('DELETE /alerts/{alertId} requests', () => {})
  })

  // Valid token tests below

  describe('Tests with valid token', () => {
    describe('POST /alerts requests', () => {
      it('should create and add a new Alert to the DB', done => {
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
        it('should NOT create an Alert if the body is empty - Error code 405 - Invalid object supplied', done => {
          const myAlert = null;
          chai
            .request(app)
            .post('/v1/alerts')
            .set('Authorization', 'Bearer ' + rightToken)
            .send(myAlert)
            .end((err, res) => {
              res.should.have.status(405)
              res.should.be.json
              res.body.should.be.a('object')
              res.body.should.have.property('code')
              res.body.should.have.property('type')
              res.body.message.should.equal('Invalid object supplied')
              done()
            })
        })
        it('should NOT create an Alert if required properties are missing - Error code 405 - Invalid object supplied', done => {
          const myAlert = {
            type: "sea",
            from: Date.now(),
            to: Date.now() 
          };
          chai
            .request(app)
            .post('/v1/alerts')
            .set('Authorization', 'Bearer ' + rightToken)
            .send(myAlert)
            .end((err, res) => {
              res.should.have.status(405)
              res.should.be.json
              res.body.should.be.a('object')
              res.body.should.have.property('code')
              res.body.should.have.property('type')
              res.body.message.should.equal('Invalid object supplied')
              done()
            })
        })
    })
    describe('GET /alerts/search requests', () => {
      it('should get an array of Alerts with multiple status given in parameter', done => {
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
      it('should return the corresponding alert to the given ID', done =>{
        const myAlert = {
          type: "sea",
          label: "My own Alert",
          status: "warning",
          from: Date.now(),
          to: Date.now() 
        };
        const newInsertion = Alert.add(myAlert)
        const idOfObjectInserted = newInsertion._id
        chai.request(app)
          .get('/v1/alerts/' + idOfObjectInserted)
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
        const alertID = `/d57433bd-3a27-45a0-bf9f-720b8cf3f845`
        chai.request(app)
          .get('/v1/alerts' + alertID)
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
        
        const alertID = ""

        chai.request(app)
          .get('/v1/alerts' + alertID)
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
    describe('DELETE /alerts/{alertId} requests', () => {
     it('should remove the Alert from the DB', done => {
       chai
        .request(app)
        .delete('/v1/alerts/147248c9-ebd7-4f8a-9f4e-8d7aa7575418')
        .set('Authorization', 'Bearer ' + rightToken)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.a.json
          res.should.be.a('object')
          res.body.message.should.equal('Alert removed from DB')
          done()
        }) 
      })
    })
  })
})
