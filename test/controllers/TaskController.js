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
            const req = { columnId: "5c921b99bf81ef15fc6eb29a", name: "taskName", description: "taskDescription" };
            chai.request( app )
                .post( "/task/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 201 );
                    should.exist( res.body.message );
                    res.body.message.should.be.equal( "Created the task!" );
                    res.body.task.name.should.be.equal( "taskName" );
                    res.body.task.description.should.be.equal( "taskDescription" );
                    done();
                } );
        } );

        it( "should create a task with the name", ( done ) => {
            const req = { columnId: "5c921b99bf81ef15fc6eb29a", name: "taskName" };
            chai.request( app )
                .post( "/task/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 201 );
                    should.exist( res.body.message );
                    res.body.message.should.be.equal( "Created the task!" );
                    res.body.task.name.should.be.equal( "taskName" );
                    res.body.task.description.should.be.equal( "" );
                    done();
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
            const req = { columnId: "5c921b99bf81ef15fc6eb29a", name: "taskName", description: "taskDescription" };
            chai.request( app )
                .post( "/task/create" ).send( req )
                .end( ( err, res ) => {
                    chai.request( app )
                        .delete( `/task/delete${ res.body.task.id }` ).send()
                        .end( ( deleteErr, deleteRes ) => {
                            deleteRes.should.have.status( 204 );
                            done();
                        } );
                } );
        } );

        it( "should return status 400 if the id was not specified", ( done ) => {
            const req = { columnId: "5c921b99bf81ef15fc6eb29a", name: "taskName", description: "taskDescription" };
            chai.request( app )
                .post( "/task/create" ).send( req )
                .end( () => {
                    chai.request( app )
                        .delete( "/task/delete/" ).send( {} )
                        .end( ( deleteErr, deleteRes ) => {
                            deleteRes.should.have.status( 400 );
                            done();
                        } );
                } );
        } );
    } );
} );
