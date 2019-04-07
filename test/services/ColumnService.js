const { expect } = require( "chai" );
const mongoUnit = require( "mongo-unit" );

const testMongoUrl = process.env.MONGO_URI;
const testMongoDB = process.env.MONGO_DB;
const chai = require( "chai" );

const should = chai.should();
const service = require( "../../src/services/ColumnService" );
const boardService = require( "../../src/services/BoardService" );

describe( "ColumnService", () => {
    const testData = {};
    beforeEach( () => mongoUnit.initDb( testMongoUrl + testMongoDB, {} ) );
    afterEach( () => mongoUnit.drop() );
    before( async () => {
        const boardName = "Board 1";
        const projectId = 1;
        const board = await boardService.createBoard( projectId, boardName );
        expect( board.name ).to.equal( boardName );
        should.exist( board.id );
        testData.boardId = board.id;
    } );

    describe( "/create", () => {
        it( "should create a column", async () => {
            const columnName = "Test column";
            const { boardId } = testData;
            const column = await service.createColumn( boardId, columnName );
            expect( column.name ).to.equal( columnName );
            should.exist( column.id );
        } );

        it( "should not create a column without a valid boardId", async () => {
            const columnName = "Test name";
            const boardId = "";
            const column = await service.createColumn( boardId, columnName );
            should.not.exist( column );
        } );

        it( "should not create a column without a valid name", async () => {
            const columnName = "";
            const { boardId } = testData;
            const column = await service.createColumn( boardId, columnName );
            should.not.exist( column );
        } );

        it( "should get all columns of a board", async () => {
            const { boardId } = testData;
            await service.createColumn( boardId, "Column 1" );
            await service.createColumn( boardId, "Column 2" );

            const columns = await service.getcolumnsForBoardId( boardId );
            should.exist( columns );
            expect( columns.length ).to.equal( 2 );
            columns.forEach( ( column ) => {
                should.exist( column.id );
                expect( column.boardId.toString() ).to.equal( boardId );
            } );
        } );
    } );

    describe( "/delete", () => {
        it( "should delete a column", async () => {
            const boardName = "Board 1";
            const projectId = 1;
            const board = await boardService.createBoard( projectId, boardName );
            const boardId = board.id;
            const column = await service.createColumn( boardId, "Test column" );
            expect( column ).to.not.equal( null );
            const result = await service.deleteColumn( column.id );
            expect( result ).to.equal( true );
        } );

        it( "should return false", async () => {
            const result = await service.deleteColumn( "badId" );
            expect( result ).to.equal( false );
        } );
    } );
} );
