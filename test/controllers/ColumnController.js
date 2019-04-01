const chai = require( "chai" );
const chaiHttp = require( "chai-http" );
const mongoUnit = require( "mongo-unit" );
const app = require( "../../src/index" );

const testMongoUrl = process.env.MONGO_URI;
const testMongoDB = process.env.MONGO_DB;

chai.use( chaiHttp );
const should = chai.should();

describe( "ColumnController", () => {
    beforeEach( () => mongoUnit.initDb( testMongoUrl + testMongoDB, {} ) );
    afterEach( () => mongoUnit.drop() );

    describe( "/create", () => {
        it( "should create a column", ( done ) => {
            const req = { boardId: "5c921b99bf81ef15fc6eb29a", name: "columnName" };
            chai.request( app )
                .post( "/column/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 201 );
                    should.exist( res.body.message );
                    res.body.message.should.be.equal( "Created the column!" );
                    res.body.column.name.should.be.equal( "columnName" );
                    done();
                } );
        } );

        it( "should return 400 if no boardId was specified", ( done ) => {
            const req = { name: "columnName" };
            chai.request( app )
                .post( "/column/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    done();
                } );
        } );

        it( "should return 400 if no name was specified", ( done ) => {
            const req = { boardId: "5c921b99bf81ef15fc6eb29a" };
            chai.request( app )
                .post( "/column/create" ).send( req )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    done();
                } );
        } );
    } );

    describe( "/delete", () => {
        it( "should return status 204 if a column was deleted", ( done ) => {
            const req = { boardId: "5c921b99bf81ef15fc6eb29a", name: "columnName" };
            chai.request( app )
                .post( "/column/create" ).send( req )
                .end( ( err, res ) => {
                    chai.request( app )
                        .delete( `/column/delete${ res.body.column.id }` ).send()
                        .end( ( deleteErr, deleteRes ) => {
                            deleteRes.should.have.status( 204 );
                            done();
                        } );
                } );
        } );

        it( "should return status 400 if the id was not specified", ( done ) => {
            const req = { boardId: "5c921b99bf81ef15fc6eb29a", name: "columnName" };
            chai.request( app )
                .post( "/column/create" ).send( req )
                .end( () => {
                    chai.request( app )
                        .delete( "/column/delete/" ).send()
                        .end( ( deleteErr, deleteRes ) => {
                            deleteRes.should.have.status( 400 );
                            done();
                        } );
                } );
        } );
    } );
} );
