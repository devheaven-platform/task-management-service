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
        it( "should return status 204 if a board was deleted", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( cerr, cres ) => {
                    const deleteReq = { id: cres.body.board.id };
                    chai.request( app )
                        .delete( "/board/delete" ).send( deleteReq )
                        .end( ( err, res ) => {
                            res.should.have.status( 204 );
                            done();
                        } );
                } );
        } );

        it( "should return status 401 if no board could be deleted.", ( done ) => {
            const req = { id: "" };
            chai.request( app )
                .delete( "/board/delete" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 401 );
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
                        id: res.body.board.id, name: "NewName", status: "Closed", columns: [ "Column1", "Column2" ],
                    };
                    chai.request( app )
                        .put( "/board/update" ).send( updateReq )
                        .end( ( upErr, upRes ) => {
                            upRes.should.have.status( 200 );
                            upRes.body.board.name.should.be.equal( updateReq.name );
                            upRes.body.board.status.should.be.equal( updateReq.status );
                            upRes.body.board.columns.length.should.be.equal( 2 );
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

        it( "should return status 200 if the board columns were updated", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( ( err, res ) => {
                    const updateReq = {
                        id: res.body.board.id, columns: [ "Column1", "Column2" ],
                    };
                    chai.request( app )
                        .put( "/board/update" ).send( updateReq )
                        .end( ( upErr, upRes ) => {
                            upRes.should.have.status( 200 );
                            upRes.body.board.columns.length.should.be.equal( 2 );
                            done();
                        } );
                } );
        } );

        it( "should return status 500 if the update request did not have an id", ( done ) => {
            const req = { projectId: "1", name: "boardName" };
            chai.request( app )
                .post( "/board/create" ).send( req )
                .end( () => {
                    const updateReq = {
                        name: "NewName", status: "Closed", columns: [ "Column1", "Column2" ],
                    };
                    chai.request( app )
                        .put( "/board/update" ).send( updateReq )
                        .end( ( upErr, upRes ) => {
                            upRes.should.have.status( 500 );
                            should.exist( upRes.body.errors.id );
                            done();
                        } );
                } );
        } );

        it( "should return status 500 if the update request did not have an body", ( done ) => {
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
                            upRes.should.have.status( 500 );
                            should.exist( upRes.body.errors.name );
                            should.exist( upRes.body.errors.columns );
                            should.exist( upRes.body.errors.status );
                            done();
                        } );
                } );
        } );
    } );
} );

    it("should return status 401 if no projectId is specified", (done) => {
        const req = { };
        chai.request(app)
            .post("/board/create").send(req)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});
