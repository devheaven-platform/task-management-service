const chai = require( "chai" );
const chaiHttp = require( "chai-http" );
const mongoUnit = require( "mongo-unit" );
const app = require( "../../src/index" );

const testMongoUrl = process.env.MONGO_URI;
const testMongoDB = process.env.MONGO_DB;

chai.use( chaiHttp );
const should = chai.should();

describe( "TaskController", () => {
    beforeEach( () => mongoUnit.initDb( testMongoUrl + testMongoDB, {} ) );
    afterEach( () => mongoUnit.drop() );

    describe( "/create", () => {
        it( "should create a task with the name and description", ( done ) => {
            chai.request( app )
                .post( "/board/create" ).send( { projectId: "1", name: "boardName" } )
                .end( ( err, res ) => {
                    chai.request( app )
                        .post( "/column/create" ).send( { boardId: res.body.board.id, name: "testBoard" } )
                        .end( ( createErr, createRes ) => {
                            const req = { columnId: createRes.body.column.id, name: "taskName", description: "taskDescription" };
                            chai.request( app )
                                .post( "/task/create" ).send( req )
                                .end( ( _err, _res ) => {
                                    _res.should.have.status( 201 );
                                    should.exist( _res.body.message );
                                    _res.body.message.should.be.equal( "Created the task!" );
                                    _res.body.task.name.should.be.equal( "taskName" );
                                    _res.body.task.description.should.be.equal( "taskDescription" );
                                    done();
                                } );
                        } );
                } );
        } );

        it( "should have status 400 if nothing was specified", ( done ) => {
            const req = { };
            chai.request( app )
                .post( "/task/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    done();
                } );
        } );

        it( "should have status 400 if no columnId was specified", ( done ) => {
            const req = { name: "taskName", description: "taskDescription" };
            chai.request( app )
                .post( "/task/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    done();
                } );
        } );

        it( "should have status 400 if no name was specified", ( done ) => {
            const req = { columnId: "5c921b99bf81ef15fc6eb29a", description: "taskDescription" };
            chai.request( app )
                .post( "/task/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    done();
                } );
        } );
    } );

    describe( "/delete", () => {
        it( "should return status 204 if a task was deleted", ( done ) => {
            chai.request( app )
                .post( "/board/create" ).send( { projectId: "1", name: "boardName" } )
                .end( ( err, res ) => {
                    chai.request( app )
                        .post( "/column/create" ).send( { boardId: res.body.board.id, name: "testBoard" } )
                        .end( ( createErr, createRes ) => {
                            const req = { columnId: createRes.body.column.id, name: "taskName", description: "taskDescription" };
                            chai.request( app )
                                .post( "/task/create" ).send( req )
                                .end( ( _err, _res ) => {
                                    chai.request( app )
                                        .delete( `/task/delete/${ _res.body.task.id }` ).send()
                                        .end( ( deleteErr, deleteRes ) => {
                                            deleteRes.should.have.status( 204 );
                                            done();
                                        } );
                                } );
                        } );
                } );
        } );

        it( "should return status 500 if the id was not specified", ( done ) => {
            chai.request( app )
                .delete( "/task/delete/-1" ).send( {} )
                .end( ( deleteErr, deleteRes ) => {
                    deleteRes.should.have.status( 500 );
                    done();
                } );
        } );
    } );
} );
