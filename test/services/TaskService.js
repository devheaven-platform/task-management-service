const { expect } = require( "chai" );
const mongoUnit = require( "mongo-unit" );

const testMongoUrl = process.env.MONGO_URI;
const testMongoDB = process.env.MONGO_DB;
const chai = require( "chai" );

const should = chai.should();
const service = require( "../../src/services/TaskService" );

describe( "TaskService", () => {
    beforeEach( () => mongoUnit.initDb( testMongoUrl + testMongoDB, {} ) );
    afterEach( () => mongoUnit.drop() );

    describe( "/create", () => {
        it( "should create a task", async () => {
            const taskName = "Test task";
            const columnId = "5c9a6b81c5325f3df029066d";
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
            const columnId = "5c9a6b81c5325f3df029066d";
            const task = await service.createTask( columnId, taskName );
            should.not.exist( task );
        } );
    } );

    describe( "/delete", () => {
        it( "should delete a task", async () => {
            const columnId = "5c9a6b81c5325f3df029066d";
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
