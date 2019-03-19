const expect = require('chai').expect;
const mongoUnit = require('mongo-unit');
const testMongoUrl = process.env.MONGO_URI;
const testMongoDB = process.env.MONGO_DB;
const chai = require("chai");
const should = chai.should();
const service = require("../../src/services/BoardService");

describe('BoardService', () => {

    beforeEach(() => mongoUnit.initDb(testMongoUrl + testMongoDB, {}))
    afterEach(() => mongoUnit.drop())

    it('should create a board', async () => {
        const boardName = "Board 1";
        const projectId = 1;
        const board = await service.createBoard(projectId, boardName);
        expect(board.name).to.equal(boardName);
        should.exist(board._id);
    });

    it('should create a default board', async () => {
        const projectId = 1;
        const board = await service.createBoard(projectId)
        should.exist(board.name);
        should.exist(board._id);
    });

    it('should get all of a project', async () => {
        const projectId = 1;
        await service.createBoard(projectId, "Board 1");
        await service.createBoard(projectId, "Board 2");

        const boards = await service.getAll(projectId)
        boards.forEach(board => {
            should.exist(board._id);
            expect(board.projectId).to.equal("1");
        });
    })

})