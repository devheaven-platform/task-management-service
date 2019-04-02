const chai = require( "chai" );
const chaiHttp = require( "chai-http" );
const mongoUnit = require( "mongo-unit" );
const app = require( "../../src/index" );

const testMongoUrl = process.env.MONGO_URI;
const testMongoDB = process.env.MONGO_DB;

chai.use( chaiHttp );
const should = chai.should();
describe( "BoardController", () => {
    beforeEach( () => mongoUnit.initDb( testMongoUrl + testMongoDB, {} ) );
    afterEach( () => mongoUnit.drop() );

    describe( "/create", () => {
        it( "should return status 400 if no projectId is specified", ( done ) => {
            const req = { };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    done();
                } );
        } );

        it( "should create a board", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 201 );
                    res.body.message.should.be.equal( "Created board!" );
                    res.body.board.name.should.be.equal( "boardName" );
                    done();
                } );
        } );

        it( "should create a board with a default name", ( done ) => {
            const req = { projectId: "1" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 201 );
                    res.body.message.should.be.equal( "Created board!" );
                    should.exist( res.body.board.name );
                    should.exist( res.body.board.id );
                    done();
                } );
        } );

        it( "should return status 400 if no projectId is specified", ( done ) => {
            const req = { };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    done();
                } );
        } );
    } );

    describe( "/delete", () => {
        it( "should return status 204 if a board was deleted", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( createErr, createRes ) => {
                    const deleteReq = { id: createRes.body.board.id };
                    chai.request( app )
                        .delete( `/board/delete/${ deleteReq.id }` )
                        .end( ( err, res ) => {
                            res.should.have.status( 204 );
                            done();
                        } );
                } );
        } );

        it( "should return status 400 if no board could be deleted.", ( done ) => {
            chai.request( app )
                .delete( "/board/delete/" )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    done();
                } );
        } );
    } );

    describe( "/update", () => {
        it( "should return status 200 if the board was updated", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    const updateReq = {
                        id: res.body.board.id, name: "NewName", status: "Closed",
                    };
                    chai.request( app )
                        .put( "/board/update" ).send( updateReq )
                        .end( ( upErr, upRes ) => {
                            upRes.should.have.status( 200 );
                            upRes.body.board.name.should.be.equal( updateReq.name );
                            upRes.body.board.status.should.be.equal( updateReq.status );
                            done();
                        } );
                } );
        } );

        it( "should return status 200 if the board name was updated", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    const updateReq = {
                        id: res.body.board.id, name: "NewName",
                    };
                    chai.request( app )
                        .put( "/board/update" ).send( updateReq )
                        .end( ( upErr, upRes ) => {
                            upRes.should.have.status( 200 );
                            upRes.body.board.name.should.be.equal( updateReq.name );
                            done();
                        } );
                } );
        } );

        it( "should return status 200 if the board status was updated", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    const updateReq = {
                        id: res.body.board.id, status: "Closed",
                    };
                    chai.request( app )
                        .put( "/board/update" ).send( updateReq )
                        .end( ( upErr, upRes ) => {
                            upRes.should.have.status( 200 );
                            upRes.body.board.status.should.be.equal( updateReq.status );
                            done();
                        } );
                } );
        } );
        it( "should return status 200 if the board was archived", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    const updateReq = {
                        id: res.body.board.id, archived: true,
                    };
                    chai.request( app )
                        .put( "/board/update" ).send( updateReq )
                        .end( ( upErr, upRes ) => {
                            upRes.should.have.status( 200 );
                            upRes.body.board.archived.should.be.equal( true );
                            done();
                        } );
                } );
        } );
        it( "should return status 400 if the update request did not have an id", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( () => {
                    const updateReq = {
                        name: "NewName", status: "Closed",
                    };
                    chai.request( app )
                        .put( "/board/update" ).send( updateReq )
                        .end( ( upErr, upRes ) => {
                            upRes.should.have.status( 400 );
                            done();
                        } );
                } );
        } );

        it( "should return status 400 if the update request did not have any values", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    const updateReq = {
                        id: res.body.board.id,
                    };
                    chai.request( app )
                        .put( "/board/update" ).send( updateReq )
                        .end( ( upErr, upRes ) => {
                            upRes.should.have.status( 400 );
                            done();
                        } );
                } );
        } );
    } );
} );
