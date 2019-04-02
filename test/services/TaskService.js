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

        it( "should get all tasks of a column", async () => {
            const columnId = "5c9a6b81c5325f3df029066d";
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
    describe( "/update", () => {
        let task;
        beforeEach( async () => {
            const taskName = "Test task";
            const columnId = "5c9a6b81c5325f3df029066d";
            task = await service.createTask( columnId, taskName );
        } );

        it( "Should update a task", async () => {
            expect( task ).to.not.equal( null );
            const newValues = { name: "New name", description: "desc" };
            const result = await service.updateTask( task.id, newValues );
            should.exist( result );
            expect( result.name ).to.equal( newValues.name );
            expect( result.description ).to.equal( newValues.description );
        } );
        it( "Should update a task name only", async () => {
            expect( task ).to.not.equal( null );
            const newValues = { name: "New" };
            const result = await service.updateTask( task.id, newValues );
            should.exist( result );
            expect( result.name ).to.equal( newValues.name );
        } );
        it( "Should update a task description only", async () => {
            expect( task ).to.not.equal( null );
            const newValues = { description: "New" };
            const result = await service.updateTask( task.id, newValues );
            should.exist( result );
            expect( result.description ).to.equal( newValues.description );
        } );
    } );
} );
