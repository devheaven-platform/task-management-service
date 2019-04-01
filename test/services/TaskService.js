const { expect } = require( "chai" );
const mongoUnit = require( "mongo-unit" );

const testMongoUrl = process.env.MONGO_URI;
const testMongoDB = process.env.MONGO_DB;
const chai = require( "chai" );

const should = chai.should();
const boardService = require( "../../src/services/BoardService" );
const columnService = require( "../../src/services/ColumnService" );
const service = require( "../../src/services/TaskService" );

describe( "TaskService", () => {
    const testData = {};
    beforeEach( () => mongoUnit.initDb( testMongoUrl + testMongoDB, {} ) );
    afterEach( () => mongoUnit.drop() );
    beforeEach( async () => {
        const boardName = "Board 1";
        const projectId = 1;
        const board = await boardService.createBoard( projectId, boardName );
        testData.boardId = board.id;
        const columnName = "Test column";
        const { boardId } = testData;
        const column = await columnService.createColumn( boardId, columnName );
        testData.columnId = column.id;
    } );

    describe( "/create", () => {
        it( "should create a task", async () => {
            const taskName = "Test task";
            const { columnId } = testData;
            const task = await service.createTask( columnId, taskName );
            expect( task.name ).to.equal( taskName );
            should.exist( task.id );
        } );

        it( "should not create a task without a valid columnId", async () => {
            const taskName = "Test name";
            const columnId = "";
            const task = await service.createTask( columnId, taskName );
            should.not.exist( task );
        } );

        it( "should not create a task without a valid name", async () => {
            const taskName = "";
            const { columnId } = testData;
            const task = await service.createTask( columnId, taskName );
            should.not.exist( task );
        } );

        it( "should get all tasks of a column", async () => {
            const { columnId } = testData;
            await service.createTask( columnId, "Column 1" );
            await service.createTask( columnId, "Column 2" );

            const tasks = await service.getTasksForColumn( columnId );
            should.exist( tasks );
            expect( tasks.length ).to.equal( 2 );
            tasks.forEach( ( task ) => {
                should.exist( task.id );
                expect( task.columnId.toString() ).to.equal( columnId );
            } );
        } );
    } );

    describe( "/delete", () => {
        it( "should delete a task", async () => {
            const { columnId } = testData;
            const board = await service.createTask( columnId, "Test task" );
            expect( board ).to.not.equal( null );
            const result = await service.deleteTask( board.id );
            expect( result ).to.equal( true );
        } );

        it( "should return false", async () => {
            const result = await service.deleteTask( "badId" );
            expect( result ).to.equal( false );
        } );
    } );
} );
