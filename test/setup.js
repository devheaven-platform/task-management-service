const mongoose = require( "mongoose" );
const { MongoMemoryServer } = require( "mongodb-memory-server" );

let mongoServer;

before( ( done ) => {
    mongoServer = new MongoMemoryServer();
    mongoServer.getConnectionString()
        .then( mongoUri => mongoose.connect( mongoUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        } )
            .then( done() )
            .catch( error => done( error ) ) );
} );

after( () => {
    mongoose.disconnect();
    mongoServer.stop();
} );

afterEach( async () => {
    await mongoose.connection.dropDatabase();
} );
