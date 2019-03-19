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
        it( "should create a board", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
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
                    res.should.have.status( 200 );
                    res.body.message.should.be.equal( "Created board!" );
                    should.exist( res.body.board.name );
                    should.exist( res.body.board.id );
                    done();
                } );
        } );

        it( "should return status 401 if no projectId is specified", ( done ) => {
            const req = { };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 401 );
                    done();
                } );
        } );
    } );

    describe( "/delete", () => {
        it( "should return status 500 if no board could be deleted.", ( done ) => {
            const req = { id: "" };
            chai.request( app )
                .delete( "/board/delete" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 500 );
                    done();
                } );
        } );

        it( "should return status 204 if a board was deleted", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    const deleteReq = { id: res.body.board.id };
                    chai.request( app )
                        .delete( "/board/delete" ).send( deleteReq )
                        .end( ( delErr, delRes ) => {
                            delRes.should.have.status( 204 );
                            done();
                        } );
                } );
            done();
        } );
    } );
} );
