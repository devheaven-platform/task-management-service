const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/index");

chai.use(chaiHttp);
const should = chai.should();

describe("/create", () => {
    it("should create a board", (done) => {
        const req = { projectId: "1", name: "boardName" };
        chai.request(app)
            .post("/board/create").send(req)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.be.equal("Created board!");
                res.body.board.name.should.be.equal("boardName");
                done();
            });
    });
    it("should create a board with a default name", (done) => {
        const req = { projectId: "1" };
        chai.request(app)
            .post("/board/create").send(req)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.be.equal("Created board!");
                should.exist(res.body.board.name);
                should.exist(res.body.board._id);
                done();
            });
    });

    it("should return status 400 if no projectId is specified", (done) => {
        const req = { };
        chai.request(app)
            .post("/board/create").send(req)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
