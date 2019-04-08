const chai = require("chai")
const chaiHttp = require("chai-http")
const { app } = require("../app")

chai.should()
chai.use(chaiHttp)

describe("Users tests", () => {
  it("should list ALL users on /v1/users GET", done => {
    chai
      .request(app)
      .get("/v1/users")
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a("array")
        done()
      })
  })
  it("should list a SINGLE user on /v1/users/<id> GET", done => {
    chai
      .request(app)
      .get("/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("id")
        res.body.id.should.equal("45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
        done()
      })
  })
  it("should add a SINGLE user on /v1/users POST", done => {
    chai
      .request(app)
      .post("/v1/users")
      .send({ name: "Robert", login: "roro", age: 24 })
      .end((err, res) => {
        res.should.have.status(201)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("id")
        res.body.should.have.property("name")
        res.body.name.should.equal("Robert")
        res.body.login.should.equal("roro")
        res.body.age.should.equal(24)
        done()
      })
  })
  it("should update a SINGLE user on /v1/users/<id> PATCH", done => {
    chai
      .request(app)
      .patch("/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
      .send({ name: "Robertinio", age: 45 })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a("object")
        res.body.should.have.property("id")
        res.body.id.should.equal("45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
        res.body.name.should.equal("Robertinio")
        res.body.login.should.equal("pedro")
        res.body.age.should.equal(45)
        done()
      })
  })
  it("should delete a SINGLE user on /v1/users/<id> DELETE", done => {
    chai
      .request(app)
      .delete("/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})
