const prepare = require( "mocha-prepare" );
const mongoUnit = require( "mongo-unit" );

prepare( done => mongoUnit.start()
    .then( ( testMongoUrl ) => {
        const split = testMongoUrl.split( "/" );
        const mongoDB = split[ split.length - 1 ];
        process.env.MONGO_URI = testMongoUrl.replace( mongoDB, "" );
        process.env.MONGO_DB = mongoDB;
        done();
    } ) );
