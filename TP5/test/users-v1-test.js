const chai = require("chai")
const chaiHttp = require("chai-http")
const { app } = require("../app")

chai.should()
chai.use(chaiHttp)

// Manually generated valid JWT token
var rightToken = "token"
// Manually generated expired JWT token
var expiredToken = "etoken"
// Manually generated wrong JWT token
var wrongToken = "wtoken"

describe("Users tests", () => {
  it("should list ALL users on GET /v1/users when logged in", done => {
    chai
      .request(app)
      .get("/v1/users")
      .set('Authorization','Bearer ' + rightToken)
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a("array")
        done()
      })
  })
  it("should get UNAUTHORIZED message on GET /v1/users when not logged in", done => {
    chai
      .request(app)
      .get("/v1/users")
      .set('Authorization','Bearer ' + wrongToken)
      .end((err, res) => {
        res.should.have.status(401)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("code")
        res.body.should.have.property("type")
        res.body.should.have.property("message")
        res.body.code.should.equal(0)
        done()
      })
  })
  it("should list a SINGLE user on GET /v1/users/<id> when logged in", done => {
    chai
      .request(app)
      .get("/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
      .set('Authorization','Bearer '+ rightToken)
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("id")
        res.body.id.should.equal("45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
        done()
      })
  })
  it("should add a SINGLE user on POST /v1/users when logged in", done => {
    chai
      .request(app)
      .post("/v1/users")
      .set('Authorization','Bearer '+ rightToken)
      .send({ name: "Robert", login: "roro", password: "pwdroro", age: 24 })
      .end((err, res) => {
        res.should.have.status(201)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("id")
        res.body.should.have.property("name")
        res.body.should.have.property("password")
        res.body.name.should.equal("Robert")
        res.body.login.should.equal("roro")
        res.body.password.should.equal("pwdroro")
        res.body.age.should.equal(24)
        done()
      })
  })
  it("should update a SINGLE user on PATCH /v1/users/<id> when logged in", done => {
    chai
      .request(app)
      .patch("/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
      .set('Authorization','Bearer '+ rightToken)
      .send({ name: "Robertinio", password: "pwdroronew", age: 45 })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("id")
        res.body.id.should.equal("45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
        res.body.name.should.equal("Robertinio")
        res.body.login.should.equal("pedro")
        res.body.password.should.equal("pwdroronew")
        res.body.age.should.equal(45)
        done()
      })
  })
  it("should delete a SINGLE user on DELETE /v1/users/<id> when logged in", done => {
    chai
      .request(app)
      .delete("/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
      .set('Authorization','Bearer '+ rightToken)
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
  it("should login with SUCCESS on POST /v1/auth/login", done => {
    chai
      .request(app)
      .post("/v1/auth/login")
      .send({login: "roro", password: "pwdroronew"})
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("access_token")
        res.body.should.have.property("expirity")
      })
  })
  it("should login with FAILURE on POST /v1/auth/login", done => {
    chai
      .request(app)
      .post("/v1/auth/login")
      .send({login: "roro", password: "wrongpwd"})
      .end((err, res) => {
        res.should.have.status(401)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("code")
        res.body.should.have.property("type")
        res.body.should.have.property("message")
        res.body.code.should.equal(0)
      })
  })
  it("should return OK with correct authorization token on GET /v1/auth/verifyaccess", done => {
    chai
      .request(app)
      .get("/v1/auth/verifyaccess")
      .set('Authorization','Bearer '+ rightToken )
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("message")
      })
  })
  it("should return UNAUTHORIZED with incorrect authorization token on GET /v1/auth/verifyaccess", done => {
    chai
      .request(app)
      .get("/v1/auth/verifyaccess")
      .set('Authorization','Bearer '+ wrongToken)
      .end((err, res) => {
        res.should.have.status(401)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("code")
        res.body.should.have.property("type")
        res.body.should.have.property("message")
        res.body.code.should.equal(0)
    })
  })
})
